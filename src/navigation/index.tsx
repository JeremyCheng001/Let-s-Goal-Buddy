import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorSchemeName, Text, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList, RootTabParamList } from "../../types";
import GoalBuddiesStackScreen from "./GoalBuddiesStack";
import GoalListStackScreen from "./GoalListStack";
import SettingsStackScreen from "./SettingsStack";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      ></RootStack.Screen>
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen name="Modal" component={ModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="GoalList"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="GoalList"
        component={GoalListStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconFamily="Feather" name="target" color={color} />
          ),
        }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="GoalBuddies"
        component={GoalBuddiesStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              iconFamily="MaterialIcons"
              name="person-outline"
              color={color}
            />
          ),
        }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconFamily="Feather" name="settings" color={color} />
          ),
        }}
      ></BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  iconFamily: "Feather" | "FontAwesome" | "MaterialIcons";
  name: React.ComponentProps<
    typeof Feather | typeof FontAwesome | typeof MaterialIcons
  >["name"];
  color: string;
}) {
  switch (props.iconFamily) {
    case "Feather":
      return (
        <Feather
          size={30}
          style={{ marginBottom: -3 }}
          name={props.name as React.ComponentProps<typeof Feather>["name"]}
        />
      );
    case "FontAwesome":
      return (
        <FontAwesome
          size={30}
          style={{ marginBottom: -3 }}
          name={props.name as React.ComponentProps<typeof FontAwesome>["name"]}
        />
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          size={30}
          style={{ marginBottom: -3 }}
          name={
            props.name as React.ComponentProps<typeof MaterialIcons>["name"]
          }
        />
      );
  }
}
