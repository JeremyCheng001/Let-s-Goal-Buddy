import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  Button,
  Calendar,
  Icon,
  IndexPath,
  Input,
  Select,
  SelectItem,
  Text
} from "@ui-kitten/components";
import { API, graphqlOperation } from "aws-amplify";
import { trim } from "lodash";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateGoalInput,
  CreateGoalListInput,
  CreateGoalListMutation,
  CreateGoalMutation,
  GetGoalListQuery, Goal,
  GoalList,
  ListGoalListsQuery, User
} from "../API";
import { createGoal, createGoalList } from "../graphql/mutations";
import { getGoalList, listGoalLists } from "../graphql/queries";
import * as GoalListReducer from "../store/GoalListReducer";
import { RootState } from "../store/store";

const DateTypes = [
  "Daily Goals",
  "Weekly Goals",
  "Monthly Goals",
  "Yearly Goals",
];

export default function GoalListScreen() {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.userReducer);
  const selectedGoalList: GoalList | null = useSelector(
    (state: RootState) => state.goalListReducer.selectedGoalList
  );
  const [selectedDateTypeIndex, setSelectedDateTypeIndex] = useState<IndexPath>(
    new IndexPath(0)
  );

  const [date, setDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState("");
  const [startDateStr, setStartDateStr] = useState("");
  const [endDateStr, setEndDateStr] = useState("");
  const [selectingDate, setSelectingDate] = useState(false);

  const [checked, setChecked] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [addingNewGoal, setAddingNewGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const inputEl = useRef(null);

  function handleShowCalendar() {
    setSelectingDate((prevState) => !prevState);
  }

  // update date picker
  useEffect(() => {
    const selectedDateType = selectedDateTypeIndex.row; // 0,1,2,3
    let displayDate = "";
    let startDate_;
    let endDate_;

    switch (selectedDateType) {
      case 0:
        startDate_ = moment(date);
        endDate_ = moment(date);
        break;
      case 1:
        startDate_ = moment(date).startOf("week");
        endDate_ = moment(date).endOf("week");
        break;
      case 2:
        startDate_ = moment(date).startOf("month");
        endDate_ = moment(date).endOf("month");
        break;
      case 3:
        startDate_ = moment(date).startOf("year");
        endDate_ = moment(date).endOf("year");
        break;
    }

    if (startDate_ && endDate_) {
      setStartDateStr(startDate_.format("yyyy-MM-DD"));
      setEndDateStr(endDate_.format("yyyy-MM-DD"));
      displayDate = `${startDate_.format("yyyy-MM-DD")} - ${endDate_.format(
        "yyyy-MM-DD"
      )}`;
      setDisplayDate(displayDate);
    }
  }, [date, selectedDateTypeIndex.row]);

  useEffect(() => {
    fetchGoalList();
  }, [startDateStr, selectedDateTypeIndex.row, user.id]);


  const renderDates = () => {
    return (
      <View style={{ flexDirection: "column", width: "100%" }}>
        <Select
          style={{ width: 200 }}
          placeholder={"Default"}
          value={DateTypes[selectedDateTypeIndex.row]}
          selectedIndex={selectedDateTypeIndex}
          onSelect={(index) => setSelectedDateTypeIndex(index as IndexPath)}
        >
          <SelectItem title="Daily Goals" />
          <SelectItem title="Weekly Goals" />
          <SelectItem title="Monthly Goals" />
          <SelectItem title="Yearly Goals" />
        </Select>

        <View
          style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}
        >
          <Button
            accessoryLeft={<Icon name="calendar" />}
            onPress={handleShowCalendar}
          >
            {displayDate}
          </Button>
        </View>
        {selectingDate ? (
          <Calendar
            style={{ marginTop: 10, width: "100%" }}
            date={date}
            onSelect={(nextDate) => {
              handleShowCalendar();
              setDate(nextDate);
            }}
          />
        ) : null}
      </View>
    );
  };

  async function fetchGoalList() {
    const goalLists = (await API.graphql(
      graphqlOperation(listGoalLists, {
        filter: {
          userGoalListId: { eq: user.id },
          startDate: { eq: startDateStr },
          type: { eq: selectedDateTypeIndex.row },
        },
      })
    )) as GraphQLResult<ListGoalListsQuery>;

    if (goalLists.data?.listGoalLists) {
      const goalList = goalLists.data?.listGoalLists.items[0];
      if (goalList) {
        const goalListWithGoals = (await API.graphql(
          graphqlOperation(getGoalList, {
            id: goalList.id,
          })
        )) as GraphQLResult<GetGoalListQuery>;

        if (goalListWithGoals.data?.getGoalList) {
          dispatch(
            GoalListReducer.setSelectedGoalList(
              goalListWithGoals.data.getGoalList as GoalList
            )
          );
        }
      } else {
        dispatch(GoalListReducer.setSelectedGoalList(null));
      }
    }
  }

  async function addNewGoalList() {
    const newGoalListInput: CreateGoalListInput = {
      userGoalListId: user.id,
      type: selectedDateTypeIndex.row,
      startDate: startDateStr,
      endDate: endDateStr,
    };

    const newGoalList = (await API.graphql(
      graphqlOperation(createGoalList, { input: newGoalListInput })
    )) as GraphQLResult<CreateGoalListMutation>;

    if (newGoalList.data?.createGoalList) {
      return newGoalList.data.createGoalList;
    } else {
      return null;
    }
  }

  async function addNewGoal() {
    let selectedGoalListID: string = "-1";
    if (!selectedGoalList) {
      const goalList = await addNewGoalList();
      if (goalList) selectedGoalListID = goalList.id;
    } else {
      selectedGoalListID = selectedGoalList.id;
    }

    if (selectedGoalListID !== "-1") {
      if (trim(newGoalTitle)) {
        const newGoalInput: CreateGoalInput = {
          title: newGoalTitle,
          type: selectedDateTypeIndex.row,
          goalListGoalsId: selectedGoalListID,
        };

        const newGoal = (await API.graphql(
          graphqlOperation(createGoal, { input: newGoalInput })
        )) as GraphQLResult<CreateGoalMutation>;

        if (newGoal.data?.createGoal) {
          dispatch(
            GoalListReducer.addNewGoalToList(newGoal.data.createGoal as Goal)
          );
        }
      }
    }

    setAddingNewGoal(false);
    setNewGoalTitle("");
  }

  const renderGoalList = () => {
    if (!selectedGoalList) return null;

    if (selectedGoalList?.goals?.items.length === 0) return null;
    return (
      <ScrollView style={{ flex: 1 }}>
        {selectedGoalList.goals?.items.map((goal) => (
          <View
            key={goal?.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <View>
              <BouncyCheckbox
                size={32}
                fillColor="black"
                unfillColor="#FFFFFF"
                text={goal?.title}
                iconStyle={{ borderColor: "black", borderRadius: 5 }}
                onPress={(isChecked: boolean) => {}}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderEmptyState = () => {
    if (
      !selectedGoalList ||
      (selectedGoalList &&
        selectedGoalList.goals &&
        selectedGoalList.goals.items.length === 0)
    ) {
      return (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Icon
            style={{ width: 100, height: 100 }}
            name="color-palette-outline"
            fill="#8F9BB3"
          />
          <Text style={{ fontSize: 20, marginTop: 10 }}>
            Let's add some goals here !
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, height: "100%" }}>
      {renderDates()}
      <View
        style={{
          flex: 1,
          width: "100%",
          marginTop: 30,
          justifyContent: "space-between",
        }}
      >
        <Input
          ref={inputEl}
          style={{
            width: "100%",
            marginBottom: 40,
            display: addingNewGoal ? "flex" : "none",
          }}
          value={newGoalTitle}
          placeholder={"Enter your new Goal"}
          onChangeText={(text) => {
            setNewGoalTitle(text);
          }}
          onBlur={addNewGoal}
        />

        <View style={{ flex: 1 }}>
          {renderGoalList()}
          {renderEmptyState()}
        </View>

        <Button
          style={{ width: 200, alignSelf: "center", marginTop: 10 }}
          accessoryLeft={<Icon name="plus" />}
          onPress={() => {
            setAddingNewGoal(true);
            if (inputEl && inputEl.current) {
              (inputEl.current as any).focus();
            }
          }}
        >
          New Goal
        </Button>
      </View>
    </View>
  );
}
