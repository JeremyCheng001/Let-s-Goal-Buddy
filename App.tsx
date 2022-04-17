import { GraphQLResult } from "@aws-amplify/api-graphql";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Amplify, { API, graphqlOperation } from "aws-amplify";
//https://stackoverflow.com/questions/62512237/how-to-use-aws-amplify-in-react-native-with-typescript-project
// @ts-ignore
import { withOAuth } from "aws-amplify-react-native";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Image, Linking, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from "unique-names-generator";
import {
  CreateUserInput,
  CreateUserMutation,
  UserByCognitoUserQuery,
} from "./src/API";
import awsconfig from "./src/aws-exports";
import { View } from "./src/components/Themed";
import { createUser } from "./src/graphql/mutations";
import { userByCognitoUser } from "./src/graphql/queries";
import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";
import { store } from "./src/store/store";
import { setUser } from "./src/store/UserReducer";

async function urlOpener(url: string, redirectUrl: string) {
  const { type, url: newUrl } = (await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  )) as any;

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

  // const dispatch = useDispatch();

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

  // check if the cognito user has a corresponding user recorded in our DynamoDB
  async function checkSignInUser() {
    if (oAuthUser && oAuthUser.attributes && oAuthUser.attributes.sub) {
      const cognitoUserSubID = oAuthUser.attributes.sub;
      const resp = (await API.graphql(
        graphqlOperation(userByCognitoUser, { cognitoUserID: cognitoUserSubID })
      )) as GraphQLResult<UserByCognitoUserQuery>;
      if (resp.data?.userByCognitoUser?.items) {
        if (resp.data.userByCognitoUser.items.length === 0) {
          // if there is no user record in our DynamoDB, we create a new user for the newly sign-in user
          const randomName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals],
          }); // big_donkey

          const newUserInput: CreateUserInput = {
            cognitoUserID: cognitoUserSubID,
            name: `${randomName}`,
            motto: `I am ${randomName}`,
          };
          const newUser = (await API.graphql(
            graphqlOperation(createUser, { input: newUserInput })
          )) as GraphQLResult<CreateUserMutation>;

          if (newUser.data?.createUser) {
            store.dispatch(setUser(newUser.data.createUser));
          }
        } else {
          const user = resp.data.userByCognitoUser.items[0];
          if (user) {
            store.dispatch(setUser(user));
          }
        }
      }
    }
  }

  useEffect(() => {
    checkSignInUser();
  }, [oAuthUser]);

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
