import { Button, List, ListItem } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import { increment } from "../store/GoalListReducer";
import { View, Text, Pressable, Platform, Linking } from "react-native";
import { listTodos } from "../graphql/queries";
import { useEffect, useState } from "react";
import { API, Auth, graphqlOperation, Hub } from "aws-amplify";
import {
  CreateTodoInput,
  Todo,
  ListTodosQuery,
  OnCreateTodoSubscription,
} from "../API";
import { createTodo, deleteTodo } from "../graphql/mutations";
import { onCreateTodo, onDeleteTodo } from "../graphql/subscriptions";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import * as WebBrowser from "expo-web-browser";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

export default function GoalList() {
  const dispatch = useDispatch();

  const [todos, setTodos] = useState<(Todo | null)[]>([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function getTodos() {
      const todoQuery = (await API.graphql(
        graphqlOperation(listTodos)
      )) as GraphQLResult<ListTodosQuery>;

      const todos = todoQuery?.data?.listTodos?.items || [];

      setTodos(todos);
    })();

    // Subscribe to creation of Todo
    const subscription_createTodo = API.graphql(
      graphqlOperation(onCreateTodo)
      // @ts-ignore
    ).subscribe({
      next: (todoData: any) => {
        // Do something with the data
        setTodos((prevState) =>
          prevState.concat(todoData.value.data.onCreateTodo)
        );
      },
    });

    // Subscribe to deletion of Todo
    const subscription_deleteTodo = API.graphql(
      graphqlOperation(onDeleteTodo)
      // @ts-ignore
    ).subscribe({
      next: (todoData: any) => {
        // Do something with the data
        setTodos((prevState) => {
          let newToDoList = [...prevState];
          newToDoList.shift();
          return newToDoList;
        });
      },
    });

    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          getUser().then((userData) => {
            setUser(userData);
          });
          break;
        case "signOut":
          setUser(null);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          break;
      }
    });

    getUser().then((userData) => setUser(userData));

    return () => {
      subscription_createTodo.unsubscribe();
      subscription_deleteTodo.unsubscribe();
    };
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then((userData) => userData)
      .catch(() => console.log("Not signed in"));
  }

  // async function urlOpener(url: string, redirectUrl: string) {
  //   const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
  //     url,
  //     redirectUrl
  //   );

  //   if (type === "success" && Platform.OS === "ios") {
  //     WebBrowser.dismissBrowser();
  //     return Linking.openURL(newUrl);
  //   }
  // }

  const renderListItem = ({
    item,
    index,
  }: {
    item: Todo | null;
    index: number;
  }) => (
    <ListItem
      title={`${
        item ? `${item.name}-${item.description}-${item.priority}` : ""
      }`}
      key={index}
    />
  );

  return (
    <View>
      <Text>Goal List</Text>
      <Button onPress={() => dispatch(increment())}> Set counter</Button>

      <List data={todos} renderItem={renderListItem} />
      <Button
        style={{ marginTop: 10 }}
        onPress={() => {
          const todo: CreateTodoInput = {
            name: "my first todo",
            description: "hello world",
            priority: "top",
          };

          API.graphql(graphqlOperation(createTodo, { input: todo }));
        }}
      >
        add TODO
      </Button>
      <Button
        style={{ marginTop: 10 }}
        onPress={() => {
          let firstTodo = todos.length > 0 ? todos[0] : null;

          if (firstTodo) {
            API.graphql(
              graphqlOperation(deleteTodo, { input: { id: firstTodo.id } })
            );
          }
        }}
      >
        delete TODO
      </Button>

      <Text>User: {user ? JSON.stringify(user.attributes) : "None"}</Text>

      <Button
        style={{ marginTop: 10 }}
        onPress={() => {
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          });
        }}
      >
        Sign in
      </Button>
      <Button
        style={{ marginTop: 10 }}
        onPress={() => {
          Auth.signOut();
        }}
      >
        Sign out
      </Button>
    </View>
  );
}
