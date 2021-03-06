import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Divider, Icon, Input, Text } from "@ui-kitten/components";
import { API, graphqlOperation } from "aws-amplify";
import { FunctionComponent, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteGoalMutation,
  Goal,
  UpdateGoalInput,
  UpdateGoalMutation,
} from "../API";
import Column from "../components/Column";
import Row from "../components/Row";
import { deleteGoal, updateGoal } from "../graphql/mutations";
import * as GoalListReducer from "../store/GoalListReducer";
import { RootState } from "../store/store";
import styled from "styled-components";
import Slider from "@ptomasroos/react-native-multi-slider";
import * as Progress from "react-native-progress";
interface GoalDetailsProps {}

// @ts-ignore
const GoalDetails: FunctionComponent<GoalDetailsProps> = (props: any) => {
  const dispatch = useDispatch();

  const params = props.route.params;
  const editable: boolean | undefined = params?.editable || undefined;

  const selectedGoal: Goal | null = useSelector(
    (state: RootState) => state.goalListReducer.selectedGoal
  );

  const [title, setTitle] = useState(selectedGoal?.title || "");
  const [description, setDescription] = useState(
    selectedGoal?.description || ""
  );
  const [progress, setProgress] = useState(selectedGoal?.progress || 0);

  async function handleSaveGoal() {
    if (!selectedGoal) return;
    const updateGoalInput: UpdateGoalInput = {
      id: selectedGoal?.id,
      title: title,
      description: description,
      progress: progress,
    };
    const updatedGoal = (await API.graphql(
      graphqlOperation(updateGoal, { input: updateGoalInput })
    )) as GraphQLResult<UpdateGoalMutation>;

    if (updatedGoal.data?.updateGoal) {
      dispatch(
        GoalListReducer.setUpdatedGoal(updatedGoal.data.updateGoal as Goal)
      );
    }
  }

  async function handleDeleteGoal() {
    if (!selectedGoal) return;

    Alert.alert("Delete Goal", "Are you sure you want to delete this goal", [
      { text: "Cancel" },
      {
        text: "Confirm",
        onPress: async () => {
          const deletedGoal = (await API.graphql(
            graphqlOperation(deleteGoal, { input: { id: selectedGoal.id } })
          )) as GraphQLResult<DeleteGoalMutation>;

          if (deletedGoal.data?.deleteGoal) {
            dispatch(
              GoalListReducer.setDeletedGoal(deletedGoal.data.deleteGoal.id)
            );
            props.navigation.goBack();
          }
        },
      },
    ]);
  }

  if (!selectedGoal) return null;

  return (
    <Column>
      <Row style={{ padding: 4 }}>
        <Label>Title:</Label>
        {editable ? (
          <Input
            value={title}
            style={{ marginLeft: 4, flex: 1 }}
            onChangeText={(text) => setTitle(text)}
            onBlur={handleSaveGoal}
          />
        ) : (
          <Text category={"s1"} style={{ marginLeft: 4 }}>
            {title}
          </Text>
        )}
      </Row>
      <Row style={{ padding: 4 }}>
        <Label>Description:</Label>
        {editable ? (
          <Input
            value={description}
            style={{ marginLeft: 4, flex: 1, maxHeight: 100 }}
            onChangeText={(text) => setDescription(text)}
            placeholder={description ? "" : "None"}
            multiline={true}
            blurOnSubmit
            onEndEditing={handleSaveGoal}
          />
        ) : (
          <Text
            category={"p1"}
            style={{ marginLeft: 4, marginRight: 80, marginVertical: 20 }}
          >
            {description || `(None)`}
          </Text>
        )}
      </Row>
      <Row
        style={{ padding: 4, paddingTop: 8, paddingBottom: 0, width: "100%" }}
      >
        <Label>Progress:</Label>
        {editable ? (
          <Row>
            <Row style={{ marginLeft: 10 }}>
              <Slider
                max={100}
                values={[progress]}
                onValuesChange={(values) => setProgress(values[0])}
                onValuesChangeFinish={handleSaveGoal}
              />
            </Row>
            <Label style={{ marginLeft: 16, fontSize: 18 }}>{progress}</Label>
          </Row>
        ) : (
          <Row>
            <Progress.Bar
              progress={(selectedGoal?.progress || 0) / 100}
              width={100}
              style={{ marginLeft: 8, marginRight: 4 }}
            />
            <Label>{`${selectedGoal?.progress || 0}%`}</Label>
          </Row>
        )}
      </Row>
      <Row
        style={{
          marginRight: 12,
          marginBottom: 12,
          justifyContent: "flex-end",
        }}
      >
        {editable && (
          <Pressable onPress={handleDeleteGoal}>
            <Icon
              style={{ width: 32, height: 32 }}
              name="trash-2-outline"
              fill="#d7353d"
            />
          </Pressable>
        )}
      </Row>
      <Row style={{ padding: 4 }}>
        <Divider
          style={{ width: "100%", height: 2, backgroundColor: "#9f9f9f" }}
        />
      </Row>
    </Column>
  );
};

const Label = styled(Text)`
  font-size: 12px;
`;

export default GoalDetails;
