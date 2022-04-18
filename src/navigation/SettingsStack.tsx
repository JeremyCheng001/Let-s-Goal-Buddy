import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Avatar, Button, Text } from "@ui-kitten/components";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../store/store";
import { User } from "../API";
import {resetGoalListReducer } from "../store/GoalListReducer"
import { resetUser } from "../store/UserReducer";

const SettingsStack = createNativeStackNavigator();

export default function SettingsScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="My Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
}

function Settings() {
  const user: User = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, justifyContent: "space-between", margin: 20 }}>
      <View style={{ alignItems: "center" }}>
        <Avatar
          source={{ uri: user.imageUrl || "https://picsum.photos/200" }}
          size={"large"}
        />
        <Text style={{ marginTop: 10 }} category={"h6"}>
          {user.name}
        </Text>
        <Text style={{ marginTop: 10 }}>UserID: {user.id}</Text>
        <Text style={{ marginTop: 10 }}>AppID: {user.appID}</Text>
      </View>
      <Button
        onPress={() => {
          dispatch(resetUser())
          dispatch(resetGoalListReducer())
          Auth.signOut();
        }}
      >
        Sign out
      </Button>
    </View>
  );
}
