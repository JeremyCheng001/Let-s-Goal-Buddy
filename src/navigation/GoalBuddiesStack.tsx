import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import GoalBuddiesList from "../screens/GoalBuddiesList";
import GoalBuddyGoalList from "../screens/GoalBuddyGoalList";
import GoalBuddyGoalLists from "../screens/GoalBuddyGoalLists";
import GoalBuddyGroupedGoalLists from "../screens/GoalBuddyGroupedGoalLists";
import GoalDetails from "../screens/GoalDetails";

const GoalBuddiesStack = createNativeStackNavigator();

export default function GoalBuddiesStackScreen() {
  return (
    <GoalBuddiesStack.Navigator>
      <GoalBuddiesStack.Screen
        name="My Goal Buddies"
        component={GoalBuddiesList}
      />
      <GoalBuddiesStack.Screen
        name="GoalBuddyGoalLists"
        component={GoalBuddyGoalLists}
        options={({ route }) => ({
          headerTitle: "Goal Buddy's Goal Lists", // to overwrite the header title, otherwise it would be the same as "name" by default
        })}
      />
      <GoalBuddiesStack.Screen
        name="GoalBuddyGroupedGoalLists"
        component={GoalBuddyGroupedGoalLists}
        options={({ route }) => ({
          headerTitle: "Grouped Goal Lists", // to overwrite the header title, otherwise it would be the same as "name" by default
        })}
      />
      <GoalBuddiesStack.Screen
        name="GoalBuddyGoalList"
        component={GoalBuddyGoalList}
        options={({ route }) => ({
          headerTitle: "Goal Buddy's Goal List", // to overwrite the header title, otherwise it would be the same as "name" by default
        })}
      />
      <GoalBuddiesStack.Screen name="GoalDetails" component={GoalDetails} />
    </GoalBuddiesStack.Navigator>
  );
}
