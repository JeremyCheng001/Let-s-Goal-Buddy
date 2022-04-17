import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import GoalList from "../screens/GoalList";

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
              onPress={() => navigation.navigate("Modal")}
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
