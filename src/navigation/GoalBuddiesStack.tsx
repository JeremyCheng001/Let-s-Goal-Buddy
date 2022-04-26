import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import GoalBuddiesList from "../screens/GoalBuddiesList";
import GoalBuddyGoalLists from "../screens/GoalBuddyGoalLists";

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
    </GoalBuddiesStack.Navigator>
  );
}
