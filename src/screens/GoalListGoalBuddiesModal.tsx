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
  CreateFriendShipInput,
  CreateGoalBuddyGoalListsInput,
  DeleteGoalBuddyGoalListsInput,
  FriendShip,
  GoalBuddyGoalLists,
  GoalList,
  ListGoalBuddyGoalListsQuery,
  ListUsersQuery,
  User,
} from "../API";
import Column from "../components/Column";
import Row from "../components/Row";
import {
  createFriendShip,
  createGoalBuddyGoalLists,
  deleteGoalBuddyGoalLists,
} from "../graphql/mutations";
import { listGoalBuddyGoalLists, listUsers } from "../graphql/queries";
import {
  onCreateGoalBuddyGoalLists,
  onDeleteGoalBuddyGoalLists,
} from "../graphql/subscriptions";
import { useUserAvatar } from "../hooks/UserHooks";
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

  const friendships: FriendShip[] | null = useSelector(
    (state: RootState) => state.goalBuddiesReducer.friendships
  );

  const user: User = useSelector((state: RootState) => state.userReducer);

  const [goalBuddyGoalLists, setGoalBuddyGoalLists] = useState<
    GoalBuddyGoalLists[]
  >([]);

  const { getUserAvatar } = useUserAvatar();

  async function handleAddFriend(friendUserID: string) {
    let createFriendShipInput: CreateFriendShipInput = {
      friendShipUserId: user.id,
      friendShipFriendId: friendUserID,
    };
    await API.graphql(
      graphqlOperation(createFriendShip, {
        input: createFriendShipInput,
      })
    );

    // friendship is mutual
    // userB is friend of userA
    // userA should be friend of userB as well
    createFriendShipInput = {
      friendShipUserId: friendUserID,
      friendShipFriendId: user.id,
    };
    await API.graphql(
      graphqlOperation(createFriendShip, {
        input: createFriendShipInput,
      })
    );
  }

  useEffect(() => {
    const subscription_addGoalBody = API.graphql(
      graphqlOperation(onCreateGoalBuddyGoalLists)
      // @ts-ignore
    ).subscribe({
      next: ({ provider, value }: any) => {
        const createdGoalBuddyGoalList = value.data.onCreateGoalBuddyGoalLists;

        if (selectedGoalList) {
          if (createdGoalBuddyGoalList.goalListID === selectedGoalList.id) {
            setGoalBuddyGoalLists((prevState: GoalBuddyGoalLists[]) => {
              let updatedGoalBuddyGoalLists = [...prevState];
              updatedGoalBuddyGoalLists.push(createdGoalBuddyGoalList);

              return updatedGoalBuddyGoalLists;
            });

            if (friendships) {
              // add this new goal buddy to the friends list, that way user can easily add this friend to other goal lists (without doing search over and over)
              let goalBuddyAlreadyInFriendsList =
                friendships.findIndex(
                  (friendship) =>
                    friendship.friendShipFriendId ===
                    createdGoalBuddyGoalList.user.id
                ) > -1;
              if (!goalBuddyAlreadyInFriendsList) {
                handleAddFriend(createdGoalBuddyGoalList.user.id);
              }
            }
          }
        }
      },
    });

    const subscription_deleteGoalBody = API.graphql(
      graphqlOperation(onDeleteGoalBuddyGoalLists)
      // @ts-ignore
    ).subscribe({
      next: ({ provider, value }: any) => {
        if (selectedGoalList) {
          const deletedGoalBuddyGoalList =
            value.data.onDeleteGoalBuddyGoalLists;

          if (deletedGoalBuddyGoalList.goalListID === selectedGoalList.id) {
            setGoalBuddyGoalLists((prevState: GoalBuddyGoalLists[]) => {
              let updatedGoalBuddyGoalLists = [...prevState];
              const deleteIndex = updatedGoalBuddyGoalLists.findIndex(
                (goalBuddyGoalList) =>
                  goalBuddyGoalList.id === deletedGoalBuddyGoalList.id
              );
              if (deleteIndex > -1) {
                updatedGoalBuddyGoalLists = updatedGoalBuddyGoalLists
                  .slice(0, deleteIndex)
                  .concat(updatedGoalBuddyGoalLists.slice(deleteIndex + 1));
              }

              return updatedGoalBuddyGoalLists;
            });
          }
        }
      },
    });

    return () => {
      subscription_addGoalBody.unsubscribe();
      subscription_deleteGoalBody.unsubscribe();
    };
  }, []);

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
        setGoalBuddyGoalLists(
          goalBuddyGoalLists.data.listGoalBuddyGoalLists
            .items as GoalBuddyGoalLists[]
        );
      }
    }
  }

  useEffect(() => {
    fetchGoalBuddies();
  }, [selectedGoalList?.id]);

  async function handleDeleteBuddyFromGoalList(goalBuddyGoalListID: string) {
    if (selectedGoalList) {
      const deleteGoalBuddyGoalListsInput: DeleteGoalBuddyGoalListsInput = {
        id: goalBuddyGoalListID,
      };
      await API.graphql(
        graphqlOperation(deleteGoalBuddyGoalLists, {
          input: deleteGoalBuddyGoalListsInput,
        })
      );
    }
  }

  const renderUserAvatar = (userID: string) => {
    getUserAvatar(userID);
    const userAvatars = useSelector(
      (state: RootState) => state.userReducer.userAvatars
    );
    const userAvatar = userAvatars[userID];

    return (
      <Avatar
        source={{
          uri: userAvatar ? userAvatar.s3ImageURL : "https://picsum.photos/200",
        }}
      />
    );
  };

  const renderGoalBuddyItem = ({
    item,
    index,
  }: {
    item: {
      title: string;
      description: string;
      userID: string;
      goalBuddyGoalListID: string;
    };
    index: number;
  }) => {
    return (
      <ListItem
        key={index}
        title={item.title}
        description={item.description}
        accessoryLeft={() => renderUserAvatar(item.userID)}
        accessoryRight={
          <Button
            accessoryLeft={<Icon name="trash-2-outline" />}
            onPress={() =>
              handleDeleteBuddyFromGoalList(item.goalBuddyGoalListID)
            }
          />
        }
      />
    );
  };

  // render a list of goal buddies you have already added to the goal list
  const renderGoalBuddiesList = () => {
    let data = [];

    for (let goalBuddyGoalList of goalBuddyGoalLists) {
      if (goalBuddyGoalList) {
        data.push({
          title: goalBuddyGoalList.user.name,
          description: `${goalBuddyGoalList.user.appID}`,
          userID: goalBuddyGoalList.user.id,
          goalBuddyGoalListID: goalBuddyGoalList.id,
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
          style={{ marginLeft: 8 }}
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
      await API.graphql(
        graphqlOperation(createGoalBuddyGoalLists, {
          input: createGoalBuddyGoalListsInput,
        })
      );
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
    const hasAlreadyAddedAsGoalBuddy =
      goalBuddyGoalLists.findIndex(
        (goalBuddyGoalList) => goalBuddyGoalList.user.id === item.userID
      ) > -1; // is this user already added as a goal buddy to the current goal list?

    return (
      <ListItem
        key={index}
        title={item.title}
        description={item.description}
        accessoryLeft={() => renderUserAvatar(item.userID)}
        accessoryRight={
          <Button
            accessoryLeft={<Icon name="person-add-outline" />}
            disabled={hasAlreadyAddedAsGoalBuddy}
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
          description: `${user.appID}`,
          userID: user.id,
        });
      }
    }

    return (
      <Column style={{ maxHeight: 100 }}>
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

  const renderFriendItem = ({
    item,
    index,
  }: {
    item: {
      title: string;
      description: string;
      userID: string;
      friendship: FriendShip;
    };
    index: number;
  }) => {
    const hasAlreadyAddedAsGoalBuddy =
      goalBuddyGoalLists.findIndex(
        (goalBuddyGoalList) =>
          goalBuddyGoalList.user.id === item.friendship.friendShipFriendId
      ) > -1; // is this friend already added as a goal buddy to the current goal list?

    return (
      <ListItem
        key={index}
        title={item.title}
        description={item.description}
        accessoryLeft={() => renderUserAvatar(item.userID)}
        accessoryRight={() => (
          <Button
            size={"tiny"}
            disabled={hasAlreadyAddedAsGoalBuddy}
            onPress={() =>
              handleAddBuddyToGoalList(item.friendship.friendShipFriendId)
            }
          >
            Add
          </Button>
        )}
      />
    );
  };

  const renderFriendsList = () => {
    if (!friendships) return null;

    let data = [];
    for (let friendship of friendships) {
      data.push({
        title: friendship.friend.name,
        description: `${friendship.friend.appID}`,
        userID: friendship.friend.id,
        friendship: friendship,
      });
    }

    return (
      <Column style={{ marginTop: 10 }}>
        <Text category={"h6"} style={{ marginBottom: 8 }}>
          Goal Buddies You Can Add:
        </Text>
        <List
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={renderFriendItem}
        />
      </Column>
    );
  };

  return (
    <Column style={{ padding: 10 }}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <Text category={"h6"} style={{ marginBottom: 8 }}>
        Watched by
      </Text>
      {renderGoalBuddiesList()}
      {renderDivider()}
      {renderFriendsList()}
      {renderSearchInput()}
      {renderSearchedUsers()}
    </Column>
  );
};

export default GoalListGoalBuddiesModal;
