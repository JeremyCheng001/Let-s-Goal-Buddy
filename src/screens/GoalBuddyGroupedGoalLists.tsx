import { Divider, Icon, List, ListItem, Text } from "@ui-kitten/components";
import moment from "moment";
import * as React from "react";
import { FunctionComponent } from "react";
import { View } from "react-native";
import { GoalList, User } from "../API";
import Column from "../components/Column";
interface GoalBuddyGroupedGoalListsProps {}

const GoalBuddyGroupedGoalLists: FunctionComponent<
  GoalBuddyGroupedGoalListsProps
> = (props: any) => {
  // getting params from the previous screen
  const params = props.route.params;
  const headerTitle: string = params.headerTitle;
  const listType: number = params.listType;
  const goalLists: GoalList[] = params.goalLists;
  const selectedGoalBuddy: User | null = params.selectedGoalBuddy;

  props.navigation.setOptions({ headerTitle: headerTitle });

  function renderEmptyState() {
    if (goalLists.length === 0) {
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
            Sorry, {selectedGoalBuddy?.name || ""} hasn't added you to any goal
            lists here
          </Text>
        </Column>
      );
    }
    return null;
  }

  function renderListItem({
    item,
    index,
  }: {
    item: {
      title: string;
      goalList: GoalList | null;
    };
    index: number;
  }) {
    return (
      <ListItem
        key={index}
        title={item.title}
        style={{ height: 48 }}
        onPress={() => {
          props.navigation.push("GoalBuddyGoalList", {
            selectedGoalBuddy: selectedGoalBuddy,
            goalList: item.goalList,
            headerTitle: `${selectedGoalBuddy?.name}'s Goal List`,
            subTitle: item.title,
          });
        }}
      />
    );
  }

  function renderList() {
    if (goalLists.length === 0) return null;
    let data = goalLists.map((goalList) => {
      let title = "";
      if (listType === 0) {
        const weekDay = moment(goalList.startDate).format("ddd");
        title = `${goalList.startDate} (${weekDay})`;
      } else {
        title = `${goalList.startDate} ~ ${goalList.endDate}`;
      }
      return {
        title: title,
        goalList: goalList,
      };
    });
    return (
      <List
        style={{ height: "100%" }}
        data={data}
        renderItem={renderListItem}
        ItemSeparatorComponent={Divider}
      ></List>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      {renderEmptyState()}
      {renderList()}
    </View>
  );
};

export default GoalBuddyGroupedGoalLists;
