import moment from "moment";
import { useSelector } from "react-redux";
import { GoalList } from "../API";
import { RootState } from "../store/store";

export function useGoalBuddyGoalLists() {
  const selectedGoalBuddy = useSelector(
    (state: RootState) => state.goalBuddiesReducer.selectedGoalBuddy
  );

  let goalBuddyGoalLists: GoalList[] = [];
  if (selectedGoalBuddy) {
    const goalBuddiesGoalLists = useSelector(
      (state: RootState) => state.goalBuddiesReducer.goalBuddiesGoalLists
    );

    if (goalBuddiesGoalLists[selectedGoalBuddy.id]) {
      goalBuddyGoalLists = goalBuddiesGoalLists[selectedGoalBuddy.id];
    }
  }
  return categorizeGoalListByDates(goalBuddyGoalLists);
}

// categorize by (today, this week, this month, this year) and (daily goal lists, weekly goal lists, monthly goal lists, yearly goal lists)
function categorizeGoalListByDates(goalLists: GoalList[]) {
  let todayGoalList: GoalList | null = null;
  let thisWeekGoalList: GoalList | null = null;
  let thisMonthGoalList: GoalList | null = null;
  let thisYearGoalList: GoalList | null = null;

  let dailyGoalLists: GoalList[] = [];
  let weeklyGoalLists: GoalList[] = [];
  let monthlyGoalLists: GoalList[] = [];
  let yearlyGoalLists: GoalList[] = [];

  for (let goalList of goalLists) {
    if (isTodayGoalList(goalList)) {
      todayGoalList = goalList;
    }
    if (isThisWeekGoalList(goalList)) {
      thisWeekGoalList = goalList;
    }
    if (isThisMonthGoalList(goalList)) {
      thisMonthGoalList = goalList;
    }
    if (isThisYearGoalList(goalList)) {
      thisYearGoalList = goalList;
    }

    switch (goalList.type) {
      case 0:
        dailyGoalLists.push(goalList);
        break;
      case 1:
        weeklyGoalLists.push(goalList);
        break;
      case 2:
        monthlyGoalLists.push(goalList);
        break;
      case 3:
        yearlyGoalLists.push(goalList);
        break;
      default:
        break;
    }
  }

  return {
    todayGoalList,
    thisWeekGoalList,
    thisMonthGoalList,
    thisYearGoalList,
    dailyGoalLists,
    weeklyGoalLists,
    monthlyGoalLists,
    yearlyGoalLists,
  };
}

function isTodayGoalList(goalList: GoalList) {
  const today = moment(new Date()).format("yyyy-MM-DD");

  if (goalList.type === 0) {
    if (goalList.startDate === today) {
      return true;
    }
  }
  return false;
}

function isThisWeekGoalList(goalList: GoalList) {
  const date = moment(new Date());
  const startOfWeek = date.startOf("isoWeek").format("yyyy-MM-DD");
  const endOfWeek = date.endOf("isoWeek").format("yyyy-MM-DD");

  if (goalList.type === 1) {
    if (goalList.startDate === startOfWeek && goalList.endDate === endOfWeek) {
      return true;
    }
  }
  return false;
}

function isThisMonthGoalList(goalList: GoalList) {
  const date = moment(new Date());
  const startOfMonth = date.startOf("month").format("yyyy-MM-DD");
  const endOfMonth = date.endOf("month").format("yyyy-MM-DD");

  if (goalList.type === 2) {
    if (
      goalList.startDate === startOfMonth &&
      goalList.endDate === endOfMonth
    ) {
      return true;
    }
  }
  return false;
}

function isThisYearGoalList(goalList: GoalList) {
  const date = moment(new Date());
  const startOfYear = date.startOf("month").format("yyyy-MM-DD");
  const endOfYear = date.endOf("month").format("yyyy-MM-DD");

  if (goalList.type === 3) {
    if (goalList.startDate === startOfYear && goalList.endDate === endOfYear) {
      return true;
    }
  }
  return false;
}
