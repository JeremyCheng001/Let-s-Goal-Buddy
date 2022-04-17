
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

const GoalBuddiesStack = createNativeStackNavigator();

export default function GoalBuddiesStackScreen() {
  return (
    <GoalBuddiesStack.Navigator>
      <GoalBuddiesStack.Screen name="My Goal Buddies" component={GoalBuddies} />
    </GoalBuddiesStack.Navigator>
  );
}

function GoalBuddies() {
  return (
    <View>
      <Text>Goal Buddies</Text>
    </View>
  );
}
