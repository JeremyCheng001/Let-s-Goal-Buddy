import { Button, List, ListItem } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import { increment } from "../store/GoalListReducer";
import { View, Text, Pressable } from "react-native";
import { listTodos } from "../graphql/queries";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  CreateTodoInput,
  Todo,
  ListTodosQuery,
  OnCreateTodoSubscription,
} from "../API";
import { createTodo, deleteTodo } from "../graphql/mutations";
import { onCreateTodo, onDeleteTodo } from "../graphql/subscriptions";
import { GraphQLResult } from "@aws-amplify/api-graphql";

export default function GoalList() {
  const dispatch = useDispatch();

  const [todos, setTodos] = useState<(Todo | null)[]>([]);

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

    return () => {
      subscription_createTodo.unsubscribe();
      subscription_deleteTodo.unsubscribe();
    };
  }, []);

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
            console.log("firstTodo");
            console.log(firstTodo);
            API.graphql(
              graphqlOperation(deleteTodo, { input: { id: firstTodo.id } })
            );
          }
        }}
      >
        delete TODO
      </Button>
    </View>
  );
}
