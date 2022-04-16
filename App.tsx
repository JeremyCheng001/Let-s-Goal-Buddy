import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Amplify from "aws-amplify";
//https://stackoverflow.com/questions/62512237/how-to-use-aws-amplify-in-react-native-with-typescript-project
// @ts-ignore
import { withOAuth } from "aws-amplify-react-native";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { Image, Linking, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import awsconfig from "./src/aws-exports";
import { View } from "./src/components/Themed";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { store } from "./src/store/store";

async function urlOpener(url: string, redirectUrl: string) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  ) as any;

  if (type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

function LoginScreen(props: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", margin: 20 }}>
      <Image
        style={{ width: 400, height: 300 }}
        source={require("./assets/images/Logo.png")}
      />
      <Button
        style={{ marginTop: 10 }}
        onPress={props.googleSignIn}
        accessoryLeft={
          <Icon style={{ width: 32, height: 32 }} name="google-outline" />
        }
      >
        Sign in with Google
      </Button>
    </View>
  );
}

function App(props: any) {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const {
    oAuthUser,
    oAuthError,
    hostedUISignIn,
    facebookSignIn,
    googleSignIn,
    amazonSignIn,
    customProviderSignIn,
    signOut,
  } = props;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          {oAuthUser ? (
            <Provider store={store}>
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SafeAreaProvider>
            </Provider>
          ) : (
            <LoginScreen {...props} />
          )}
        </ApplicationProvider>
      </>
    );
  }
}

export default withOAuth(App);
