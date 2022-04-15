import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

const GoalListStack = createNativeStackNavigator();

export default function GoalListStackScreen() {
  return (
    <GoalListStack.Navigator>
      <GoalListStack.Screen name="Goal List" component={GoalList} />
    </GoalListStack.Navigator>
  );
}

function GoalList() {
  return (
    <View>
      <Text>Goal List</Text>
    </View>
  );
}
