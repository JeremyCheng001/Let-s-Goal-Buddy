import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
  Avatar,
  Button,
  Divider,
  Icon,
  Input,
  List,
  ListItem,
  Text,
} from "@ui-kitten/components";
import { API, graphqlOperation } from "aws-amplify";
import { StatusBar } from "expo-status-bar";
import { trim } from "lodash";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import {
  CreateGoalBuddyGoalListsInput,
  CreateGoalBuddyGoalListsMutation,
  GoalList,
  ListGoalBuddyGoalListsQuery,
  ListUsersQuery,
  User,
} from "../API";
import Column from "../components/Column";
import Row from "../components/Row";
import { createGoalBuddyGoalLists } from "../graphql/mutations";
import { listGoalBuddyGoalLists, listUsers } from "../graphql/queries";
import { RootState } from "../store/store";

interface GoalListGoalBuddiesModalProps {}

const GoalListGoalBuddiesModal: FunctionComponent<
  GoalListGoalBuddiesModalProps
> = () => {
  const [searchUserID, setSearchUserID] = useState<string>("");

  const [searchedUsers, setSearchedUsers] = useState<(User | null)[]>([]);
  const selectedGoalList: GoalList | null = useSelector(
    (state: RootState) => state.goalListReducer.selectedGoalList
  );

  const [goalBuddies, setGoalBuddies] = useState<User[]>([]);

  async function fetchGoalBuddies() {
    if (selectedGoalList) {
      const goalBuddyGoalLists = (await API.graphql(
        graphqlOperation(listGoalBuddyGoalLists, {
          filter: {
            goalListID: { eq: selectedGoalList.id },
          },
        })
      )) as GraphQLResult<ListGoalBuddyGoalListsQuery>;

      if (goalBuddyGoalLists.data?.listGoalBuddyGoalLists) {
        let goalBuddies: User[] = [];
        for (let goalBuddyGoalList of goalBuddyGoalLists.data
          .listGoalBuddyGoalLists.items) {
          if (goalBuddyGoalList) {
            goalBuddies.push(goalBuddyGoalList.user);
          }
        }

        for (let i = 0; i < 2; i++) {
          goalBuddies = goalBuddies.concat(goalBuddies);
        }
        setGoalBuddies(goalBuddies);
      }
    }
  }

  useEffect(() => {
    fetchGoalBuddies();
  }, [selectedGoalList?.id]);

  const renderUserAvatar = (props: any) => (
    <Avatar
      {...props}
      style={[props.style, { tintColor: null }]}
      source={{ uri: "https://picsum.photos/200" }}
    />
  );

  const renderGoalBuddyItem = ({
    item,
    index,
  }: {
    item: {
      title: string;
      description: string;
      userID: string;
    };
    index: number;
  }) => {
    return (
      <ListItem
        key={index}
        title={item.title}
        description={item.description}
        accessoryLeft={renderUserAvatar}
        accessoryRight={
          <Button
            accessoryLeft={<Icon name="trash-2-outline" />}
            // onPress={() => handleAddBuddyToGoalList(item.userID)}
          />
        }
      />
    );
  };

  // render a list of goal buddies you have already added to the goal list
  const renderGoalBuddiesList = () => {
    let data = [];
    for (let goalBuddy of goalBuddies) {
      if (goalBuddy) {
        data.push({
          title: goalBuddy.name,
          description: `${goalBuddy.appID} (${goalBuddy.motto})`,
          userID: goalBuddy.id,
        });
      }
    }

    return (
      <Column>
        <List
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={renderGoalBuddyItem}
        />
      </Column>
    );
  };

  function handleChangeSearchUserID(newText: string) {
    setSearchUserID(newText);
  }

  async function handleSearchUser() {
    let searchUserID_ = trim(searchUserID);
    const searched = (await API.graphql(
      graphqlOperation(listUsers, {
        filter: {
          appID: {
            eq: searchUserID_,
          },
        },
      })
    )) as GraphQLResult<ListUsersQuery>;

    if (searched.data?.listUsers) {
      setSearchedUsers(searched.data.listUsers.items as (User | null)[]);
    } else {
      setSearchedUsers([]);
    }
  }

  // search input + search button
  const renderSearchInput = () => {
    return (
      <Row style={{ width: "100%" }}>
        <Input
          style={{ flex: 1 }}
          placeholder="Enter user ID here"
          value={searchUserID}
          onChangeText={handleChangeSearchUserID}
        />
        <Button
          style={{ marginLeft: 8, height: 24 }}
          accessoryRight={<Icon name="search-outline" />}
          onPress={handleSearchUser}
        >
          Search
        </Button>
      </Row>
    );
  };
  async function handleAddBuddyToGoalList(userID: string) {
    if (selectedGoalList) {
      const createGoalBuddyGoalListsInput: CreateGoalBuddyGoalListsInput = {
        userID: userID,
        goalListID: selectedGoalList.id,
      };
      const createGoalBuddyGoalList = (await API.graphql(
        graphqlOperation(createGoalBuddyGoalLists, {
          input: createGoalBuddyGoalListsInput,
        })
      )) as GraphQLResult<CreateGoalBuddyGoalListsMutation>;

      if (createGoalBuddyGoalList.data?.createGoalBuddyGoalLists) {
        // TODO: use subscribe to update the new goal buddy
      }
    }
  }

  const renderSearchedUserItem = ({
    item,
    index,
  }: {
    item: {
      title: string;
      description: string;
      userID: string;
    };
    index: number;
  }) => {
    return (
      <ListItem
        key={index}
        title={item.title}
        description={item.description}
        accessoryLeft={renderUserAvatar}
        accessoryRight={
          <Button
            accessoryLeft={<Icon name="person-add-outline" />}
            onPress={() => handleAddBuddyToGoalList(item.userID)}
          />
        }
      />
    );
  };

  // render a list of users that you add to your goal list
  const renderSearchedUsers = () => {
    let data = [];
    for (let user of searchedUsers) {
      if (user) {
        data.push({
          title: user.name,
          description: `${user.appID} (${user.motto}) (${user.id})`,
          userID: user.id,
        });
      }
    }

    return (
      <Column>
        <List
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={renderSearchedUserItem}
        />
      </Column>
    );
  };

  const renderDivider = () => {
    return (
      <Divider
        style={{
          width: "100%",
          height: 2,
          marginBottom: 8,
          backgroundColor: "#9f9f9f",
        }}
      />
    );
  };

  return (
    <Column style={{ padding: 10 }}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <Text category={"h6"}>Watched by</Text>
      {renderGoalBuddiesList()}
      {renderDivider()}
      {renderSearchInput()}
      {renderSearchedUsers()}
    </Column>
  );
};

export default GoalListGoalBuddiesModal;
