import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import GoalList from "../screens/GoalList";
import GoalDetails from "../screens/GoalDetails";

const GoalListStack = createNativeStackNavigator();

//@ts-ignore
export default function GoalListStackScreen({ navigation }) {
  const colorScheme = useColorScheme();

  return (
    <GoalListStack.Navigator>
      <GoalListStack.Screen
        name="My Goal List"
        component={GoalList}
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("GoalListGoalBuddiesModal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="eye"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        }}
      />
      <GoalListStack.Screen
        name="GoalDetails"
        component={GoalDetails}
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("GoalListGoalBuddiesModal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="eye"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        }}
      />
    </GoalListStack.Navigator>
  );
}
