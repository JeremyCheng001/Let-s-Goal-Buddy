import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Avatar, Button, Text } from "@ui-kitten/components";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { User } from "../API";

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
      </View>
      <Button
        onPress={() => {
          Auth.signOut();
        }}
      >
        Sign out
      </Button>
    </View>
  );
}
