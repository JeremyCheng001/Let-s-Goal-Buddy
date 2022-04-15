import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { Button } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import { increment } from "../store/GoalListReducer";

const GoalListStack = createNativeStackNavigator();

//@ts-ignore
export default function GoalListStackScreen({ navigation }) {
  const colorScheme = useColorScheme();

  return (
    <GoalListStack.Navigator>
      <GoalListStack.Screen
        name="Goal List"
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

function GoalList() {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Goal List</Text>
      <Button onPress={() => dispatch(increment())}> Set counter</Button>
    </View>
  );
}
