import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

const SettingsStack = createNativeStackNavigator();

export default function SettingsScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
}

function Settings() {
  return (
    <View>
      <Text>Goal Buddies</Text>
    </View>
  );
}
