import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserSettings from "../screens/UserSettings";

const SettingsStack = createNativeStackNavigator();

export default function SettingsScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="My Settings" component={UserSettings} />
    </SettingsStack.Navigator>
  );
}
