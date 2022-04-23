import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import GoalBuddiesList from "../screens/GoalBuddiesList";

const GoalBuddiesStack = createNativeStackNavigator();

export default function GoalBuddiesStackScreen() {
  return (
    <GoalBuddiesStack.Navigator>
      <GoalBuddiesStack.Screen
        name="My Goal Buddies"
        component={GoalBuddiesList}
      />
    </GoalBuddiesStack.Navigator>
  );
}
