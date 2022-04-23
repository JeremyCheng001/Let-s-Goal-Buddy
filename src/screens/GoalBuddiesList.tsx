import { GraphQLResult } from "@aws-amplify/api-graphql";
import {
    Avatar,
    Button,
    Divider,
    Icon,
    Input,
    List,
    ListItem,
    Text
} from "@ui-kitten/components";
import { API, graphqlOperation } from "aws-amplify";
import { trim } from "lodash";
import * as React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import {
    CreateFriendShipInput,
    DeleteFriendShipMutation,
    FriendShip,
    ListFriendShipsQuery,
    ListUsersQuery, User
} from "../API";
import Column from "../components/Column";
import Row from "../components/Row";
import { createFriendShip, deleteFriendShip } from "../graphql/mutations";
import { listFriendShips, listUsers } from "../graphql/queries";
import {
    onCreateFriendShip,
    onDeleteFriendShip
} from "../graphql/subscriptions";
import { RootState } from "../store/store";

interface GoalBuddiesListProps {}

const GoalBuddiesList: FunctionComponent<GoalBuddiesListProps> = () => {
  const user: User = useSelector((state: RootState) => state.userReducer);
  const [searchUserID, setSearchUserID] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<(User | null)[]>([]);
  const [friendships, setFriendShips] = useState<FriendShip[]>([]);

  async function getFriendsList() {
    let friendships_: FriendShip[] = [];
    const listFriendshipsQuery = (await API.graphql(
      graphqlOperation(listFriendShips, {
        filter: {
          friendShipUserId: { eq: user.id },
        },
      })
    )) as GraphQLResult<ListFriendShipsQuery>;

    if (listFriendshipsQuery.data?.listFriendShips) {
      for (let friendship of listFriendshipsQuery.data.listFriendShips.items) {
        if (friendship) {
          friendships_.push(friendship);
        }
      }
    }

    setFriendShips(friendships_);
  }
  useEffect(() => {
    // get friends list
    getFriendsList();

    const subscription_createFriendship = API.graphql(
      graphqlOperation(onCreateFriendShip)
      // @ts-ignore
    ).subscribe({
      next: ({ provider, value }: any) => {
        const createdFriendship: FriendShip = value.data.onCreateFriendShip;
        if (
          createdFriendship &&
          createdFriendship.friendShipUserId === user.id
        ) {
          if (value.data.onCreateFriendShip) {
            setFriendShips((prevState: FriendShip[]) => {
              let updated = [...prevState];
              updated.push(createdFriendship);

              return updated;
            });
          }
        }
      },
    });

    const subscription_deleteFriendship = API.graphql(
      graphqlOperation(onDeleteFriendShip)
      // @ts-ignore
    ).subscribe({
      next: ({ provider, value }: any) => {
        const deletedFriendship: FriendShip = value.data.onDeleteFriendShip;
        if (
          deletedFriendship &&
          deletedFriendship.friendShipUserId === user.id
        ) {
          if (value.data.onDeleteFriendShip) {
            setFriendShips((prevState: FriendShip[]) => {
              let updated = [...prevState];
              const deleteIndex = updated.findIndex(
                (friendship) => friendship.id === deletedFriendship.id
              );
              if (deleteIndex > -1) {
                updated = updated
                  .slice(0, deleteIndex)
                  .concat(updated.slice(deleteIndex + 1));
              }

              return updated;
            });
          }
        }
      },
    });

    return () => {
      subscription_createFriendship.unsubscribe();
      subscription_deleteFriendship.unsubscribe();
    };
  }, []);

  const renderUserAvatar = (props: any) => (
    <Avatar
      {...props}
      style={[props.style, { tintColor: null }]}
      source={{ uri: "https://picsum.photos/200" }}
    />
  );

  async function handleDeleteFriend(friendship: FriendShip) {
    (await API.graphql(
      graphqlOperation(deleteFriendShip, { input: { id: friendship.id } })
    )) as GraphQLResult<DeleteFriendShipMutation>;
  }

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
    return (
      <ListItem
        key={index}
        title={item.title}
        description={item.description}
        accessoryLeft={renderUserAvatar}
        accessoryRight={
          <Button
            accessoryLeft={<Icon name="trash-2-outline" />}
            onPress={() => handleDeleteFriend(item.friendship)}
          />
        }
      />
    );
  };

  const renderFriendsList = () => {
    let data = [];

    for (let friendship of friendships) {
      data.push({
        title: friendship.friend.name,
        description: `${friendship.friend.appID} (${friendship.friend.motto})`,
        userID: friendship.friend.id,
        friendship: friendship,
      });
    }

    return (
      <Column style={{ marginTop: 10 }}>
        <Text category={"h6"} style={{ marginBottom: 8 }}>
          My Goal Buddies
        </Text>
        <List
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={renderFriendItem}
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
    const userHasBeenAdded =
      friendships.findIndex(
        (friendship) => friendship.friendShipFriendId === item.userID
      ) > -1;

    return (
      <ListItem
        key={index}
        title={item.title}
        description={item.description}
        accessoryLeft={renderUserAvatar}
        accessoryRight={() => (
          <Button
            disabled={userHasBeenAdded || user.id === item.userID}
            onPress={() => handleAddFriend(item.userID)}
            size="tiny"
          >
            Add
          </Button>
        )}
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
          description: `${user.appID} (${user.motto})`,
          userID: user.id,
        });
      }
    }

    return (
      <View style={{ maxHeight: 100 }}>
        <List
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={renderSearchedUserItem}
        />
      </View>
    );
  };

  // search input + search button
  const renderSearchInput = () => {
    return (
      <Row style={{ width: "100%", marginTop: 8 }}>
        <Input
          style={{ flex: 1 }}
          placeholder="Enter user ID to add Goal Buddy"
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

  return (
    <Column>
      {renderSearchInput()}
      {renderSearchedUsers()}
      {renderFriendsList()}
    </Column>
  );
};

export default GoalBuddiesList;
