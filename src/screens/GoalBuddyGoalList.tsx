import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Icon, Text } from "@ui-kitten/components";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";
import * as React from "react";
import { FunctionComponent } from "react";
import { Pressable, ScrollView, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { GetGoalListQuery, Goal, GoalList, User } from "../API";
import Column from "../components/Column";
import Row from "../components/Row";
import * as Progress from "react-native-progress";
import styled from "styled-components";
import { getGoalList } from "../graphql/queries";

interface GoalBuddyGoalListProps {}

const GoalBuddyGoalList: FunctionComponent<GoalBuddyGoalListProps> = (
  props: any
) => {
  const params = props.route.params;
  const headerTitle: string = params.headerTitle;
  const subTitle: string = params.subTitle;
  props.navigation.setOptions({ headerTitle: headerTitle });

  const goalList_param: GoalList | null = params.goalList;
  const selectedGoalBuddy: User | null = params.selectedGoalBuddy;

  const [goalList, setGoalList] = React.useState<GoalList | null>(null);

  const getBuddyGoalList = async () => {
    if (goalList_param) {
      const getGoalListQuery = (await API.graphql(
        graphqlOperation(getGoalList, { id: goalList_param.id })
      )) as GraphQLResult<GetGoalListQuery>;

      if (getGoalListQuery.data?.getGoalList) {
        setGoalList(getGoalListQuery.data.getGoalList as GoalList);
      }
    }
  };

  const renderGoalList = () => {
    if (!goalList) return null;

    if (goalList?.goals?.items.length === 0) return null;

    let goals = [...(goalList?.goals?.items || [])];
    // sort goals that they are listed based on the order when it is created
    goals.sort((a: Goal | null, b: Goal | null) => {
      if (a && b) {
        return moment(b.createdAt).unix() - moment(a.createdAt).unix();
      }
      return -1;
    });

    return (
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center" }}>
        <Text category={"h6"} style={{ marginBottom: 20 }}>
          {subTitle}
        </Text>
        {goals.map((goal) => (
          <View
            key={goal?.id}
            style={{
              paddingLeft: 4,
              paddingRight: 10,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Row>
              <BouncyCheckbox
                disabled={true}
                isChecked={goal?.completed || false}
                size={32}
                fillColor="black"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "black", borderRadius: 5 }}
                // onPress={(isChecked: boolean) =>
                //   handleCompleteGoal(goal, isChecked)
                // }
              />
              <Pressable
                style={{ flex: 1 }}
                // onPress={() => handleNavigateToGoalDetailsScreen(goal)}
              >
                <Row style={{ justifyContent: "space-between" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      textDecorationLine: `${
                        goal?.completed ? "line-through" : "none"
                      }`,
                      flexShrink: 100,
                    }}
                  >
                    {goal?.title}
                  </Text>
                  <Row style={{ width: 90, right: 2, flexShrink: 1 }}>
                    <Progress.Bar
                      progress={(goal?.progress || 0) / 100}
                      width={50}
                      style={{ marginLeft: 8, marginRight: 4 }}
                    />
                    <Label>{`${goal?.progress || 0}%`}</Label>
                  </Row>
                </Row>
              </Pressable>
            </Row>
          </View>
        ))}
      </ScrollView>
    );
  };

  React.useEffect(() => {
    if (goalList_param) {
      getBuddyGoalList();
    }
  }, [goalList_param]);

  function renderEmptyState() {
    if (!goalList_param || !goalList || goalList.goals?.items.length === 0) {
      return (
        <Column
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Icon
            style={{ width: 100, height: 100 }}
            name="color-palette-outline"
            fill="#8F9BB3"
          />
          <Text
            style={{ fontSize: 20, marginTop: 10, marginHorizontal: 40 }}
            category="label"
          >
            {goalList?.goals?.items.length === 0
              ? `${
                  selectedGoalBuddy?.name || ""
                } hasn't added any goals in this list`
              : `Sorry, ${
                  selectedGoalBuddy?.name || ""
                } hasn't added you to this goal list here`}
          </Text>
        </Column>
      );
    }
    return null;
  }
  return (
    <View style={{ padding: 20, flex: 1, height: "100%" }}>
      {renderEmptyState()}
      {/* <View style={{ flex: 1 }}> */}
      {renderGoalList()}
      {/* </View> */}
    </View>
  );
};

export default GoalBuddyGoalList;

const Label = styled(Text)`
  font-size: 12px;
`;
