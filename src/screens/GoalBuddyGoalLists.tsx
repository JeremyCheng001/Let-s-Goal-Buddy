import {
  Avatar,
  Divider,
  Icon,
  List,
  ListItem,
  Menu,
  MenuItem,
  Text,
} from "@ui-kitten/components";
import moment from "moment";
import * as React from "react";
import { FunctionComponent } from "react";
import { LogBox, View } from "react-native";
import { useSelector } from "react-redux";
import { GoalList } from "../API";
import CustomDivider from "../components/CustomDivider";
import { useGoalBuddyGoalLists } from "../hooks/GoalBuddyHooks";
import { useUserAvatar } from "../hooks/UserHooks";
import { RootState } from "../store/store";
import { UserState } from "../store/UserReducer";

interface GoalBuddyGoalListsProps {}

const GoalBuddyGoalLists: FunctionComponent<GoalBuddyGoalListsProps> = (
  //@ts-ignore
  { navigation }
) => {
  const selectedGoalBuddy = useSelector(
    (state: RootState) => state.goalBuddiesReducer.selectedGoalBuddy
  );

  navigation.setOptions({
    headerTitle: `${selectedGoalBuddy?.name}'s Goal Lists`,
  });

  const {
    todayGoalList,
    thisWeekGoalList,
    thisMonthGoalList,
    thisYearGoalList,
    dailyGoalLists,
    weeklyGoalLists,
    monthlyGoalLists,
    yearlyGoalLists,
  } = useGoalBuddyGoalLists();
  const user: UserState = useSelector((state: RootState) => state.userReducer);

  const { userAvatar } = useUserAvatar(selectedGoalBuddy?.id);

  const ForwardIcon = (props: any) => (
    <Icon {...props} name="arrow-ios-forward" />
  );

  const handleGroupPress = (
    title: string,
    listType: number,
    goalLists: GoalList[]
  ) => {
    navigation.push("GoalBuddyGroupedGoalLists", {
      headerTitle: `${selectedGoalBuddy?.name}'s ${title} Goal Lists`,
      listType: listType,
      goalLists: goalLists,
      selectedGoalBuddy: selectedGoalBuddy,
    });
  };

  function renderListGroups() {
    return (
      <Menu
        selectedIndex={undefined}
        // onSelect={(index) => setSelectedIndex(index)}
      >
        <MenuItem
          title="Daily Goal Lists"
          accessoryRight={ForwardIcon}
          onPress={() => handleGroupPress("Daily", 0, dailyGoalLists)}
          style={{ height: 54 }}
        />
        <MenuItem
          title="Weekly Goal Lists"
          accessoryRight={ForwardIcon}
          onPress={() => handleGroupPress("Weekly", 1, weeklyGoalLists)}
          style={{ height: 54 }}
        />
        <MenuItem
          title="Monthly Goal Lists"
          accessoryRight={ForwardIcon}
          onPress={() => handleGroupPress("Monthly", 2, monthlyGoalLists)}
          style={{ height: 54 }}
        />
        <MenuItem
          title="Yearly Goal Lists"
          accessoryRight={ForwardIcon}
          onPress={() => handleGroupPress("Yearly", 3, yearlyGoalLists)}
          style={{ height: 54 }}
        />
      </Menu>
    );
  }

  function renderHotListItem({
    item,
    index,
  }: {
    item: {
      title: string;
      description: string;
      goalList: GoalList | null;
    };
    index: number;
  }) {
    return (
      <ListItem
        key={index}
        title={item.title}
        description={item.description}
        style={{ height: 54 }}
        onPress={() => {
          navigation.push("GoalBuddyGoalList", {
            selectedGoalBuddy: selectedGoalBuddy,
            goalList: item.goalList,
            headerTitle:`${selectedGoalBuddy?.name}'s "${item.title}" Goal List`,
            subTitle: `${item.title} (${item.description})`
          });
        }}
      />
    );
  }

  function renderHotList() {
    const date = moment(new Date());
    const startOfWeek = date.startOf("isoWeek").format("yyyy-MM-DD");
    const endOfWeek = date.endOf("isoWeek").format("yyyy-MM-DD");
    const startOfMonth = date.startOf("month").format("yyyy-MM-DD");
    const endOfMonth = date.endOf("month").format("yyyy-MM-DD");
    const startOfYear = date.startOf("year").format("yyyy-MM-DD");
    const endOfYear = date.endOf("year").format("yyyy-MM-DD");

    let data = [
      {
        title: `Today`,
        description: `${moment().format("dddd")}`,
        goalList: todayGoalList,
      },
      {
        title: `This Week`,
        description: `${startOfWeek} ~ ${endOfWeek}`,
        goalList: thisWeekGoalList,
      },
      {
        title: "This Month",
        description: `${startOfMonth} ~ ${endOfMonth}`,
        goalList: thisMonthGoalList,
      },
      {
        title: "This Year",
        description: `${startOfYear} ~ ${endOfYear}`,
        goalList: thisYearGoalList,
      },
    ];

    return (
      <List
        data={data}
        renderItem={renderHotListItem}
        ItemSeparatorComponent={Divider}
      ></List>
    );
  }

  return (
    <View>
      <ListItem
        title={selectedGoalBuddy?.name}
        description={selectedGoalBuddy?.appID}
        accessoryLeft={() => (
          <Avatar source={{ uri: userAvatar?.s3ImageURL || " " }} />
        )}
      />
      <CustomDivider />
      <Text category={"label"} style={{ marginTop: 12, marginBottom: 6 }}>
        Hot Lists
      </Text>
      {renderHotList()}
      <Text category={"label"} style={{ marginTop: 12, marginBottom: 6 }}>
        Grouped Lists
      </Text>
      {renderListGroups()}
    </View>
  );
};

export default GoalBuddyGoalLists;

LogBox.ignoreAllLogs();
