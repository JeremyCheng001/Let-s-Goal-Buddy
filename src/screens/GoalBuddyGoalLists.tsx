import {
    Avatar,
    Divider,
    IndexPath,
    List,
    ListItem,
    Menu,
    MenuGroup,
    MenuItem,
    Text
} from "@ui-kitten/components";
import * as React from "react";
import { FunctionComponent } from "react";
import { LogBox, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { GoalList } from "../API";
import CustomDivider from "../components/CustomDivider";
import { useGoalBuddyGoalLists } from "../hooks/GoalBuddyHooks";
import { useUserAvatar } from "../hooks/UserHooks";
import { RootState } from "../store/store";
import { UserState } from "../store/UserReducer";

interface GoalBuddyGoalListsProps {}

const GoalBuddyGoalLists: FunctionComponent<GoalBuddyGoalListsProps> = (
  props
) => {
  const selectedGoalBuddy = useSelector(
    (state: RootState) => state.goalBuddiesReducer.selectedGoalBuddy
  );
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

  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | undefined
  >(undefined);

  function renderListGroups() {
    return (
      <React.Fragment>
        <Menu
          style={{ flexGrow: 1 }}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <MenuGroup title="Daily Goal Lists">
            {dailyGoalLists.map((goalList) => {
              return <MenuItem title={`${goalList.startDate}`} />;
            })}
          </MenuGroup>
          <MenuGroup title="Weekly Goal Lists">
            {weeklyGoalLists.map((goalList) => {
              const title = `${goalList.startDate} - ${goalList.endDate}`;
              return <MenuItem title={`${title}`} />;
            })}
          </MenuGroup>
          <MenuGroup title="Monthly Goal Lists">
            {monthlyGoalLists.map((goalList) => {
              const title = `${goalList.startDate} - ${goalList.endDate}`;
              return <MenuItem title={`${title}`} />;
            })}
          </MenuGroup>
          <MenuGroup title="Yearly Goal Lists">
            {yearlyGoalLists.map((goalList) => {
              const title = `${goalList.startDate} - ${goalList.endDate}`;
              return <MenuItem title={`${title}`} />;
            })}
          </MenuGroup>
        </Menu>
      </React.Fragment>
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
      <ListItem key={index} title={item.title} description={item.description} />
    );
  }

  function renderHotList() {
    let data = [
      {
        title: "Today",
        description: "",
        goalList: todayGoalList,
      },
      {
        title: "This Week",
        description: "",
        goalList: thisWeekGoalList,
      },
      {
        title: "This Month",
        description: "",
        goalList: thisMonthGoalList,
      },
      {
        title: "This Year",
        description: "",
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
    <ScrollView>
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
    </ScrollView>
  );
};

export default GoalBuddyGoalLists;

LogBox.ignoreAllLogs();
