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
import { useDispatch, useSelector } from "react-redux";
import {
  CreateFriendShipInput,
  DeleteFriendShipMutation,
  FriendShip,
  ListFriendShipsQuery, ListUsersQuery,
  User
} from "../API";
import Column from "../components/Column";
import Row from "../components/Row";
import { createFriendShip, deleteFriendShip } from "../graphql/mutations";
import {
  listFriendShips, listUsers
} from "../graphql/queries";
import { useUserAvatar } from "../hooks/UserHooks";
import * as GoalBuddiesReducer from "../store/GoalBuddiesReducer";
import { RootState } from "../store/store";

interface GoalBuddiesListProps {}
//@ts-ignore
const GoalBuddiesList: FunctionComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const user: User = useSelector((state: RootState) => state.userReducer);
  const [searchUserID, setSearchUserID] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<(User | null)[]>([]);

  const friendships: FriendShip[] | null = useSelector(
    (state: RootState) => state.goalBuddiesReducer.friendships
  );

  useEffect(() => {
    dispatch(GoalBuddiesReducer.fetchGoalBuddiesGoalLists(user.id));
  }, []);

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

    dispatch(GoalBuddiesReducer.setFriendships(friendships_));
  }

  const { getUserAvatar, userAvatar } = useUserAvatar();

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
        accessoryLeft={() => renderUserAvatar(item.userID)}
        accessoryRight={() => (
          <Button
            onPress={() => handleDeleteFriend(item.friendship)}
            size={"small"}
          >
            remove
          </Button>
        )}
        onPress={() => {
          dispatch(
            GoalBuddiesReducer.setSelectedGoalBuddy(item.friendship.friend)
          );
          navigation.push("GoalBuddyGoalLists");
        }}
      />
    );
  };

  const handleRefresh = ()=>{
    getFriendsList();
    dispatch(GoalBuddiesReducer.fetchGoalBuddiesGoalLists(user.id));
  }

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
          My Goal Buddies
        </Text>
        <List
          data={data}
          ItemSeparatorComponent={Divider}
          renderItem={renderFriendItem}
          onRefresh={handleRefresh}
          refreshing={false}
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
    if (!friendships) return null;
    const userHasBeenAdded =
      friendships.findIndex(
        (friendship) => friendship.friendShipFriendId === item.userID
      ) > -1;

    return (
      <ListItem
        key={index}
        title={item.title}
        description={item.description}
        accessoryLeft={() => renderUserAvatar(item.userID)}
        accessoryRight={() => (
          <Button
            disabled={userHasBeenAdded || user.id === item.userID}
            onPress={() => handleAddFriend(item.userID)}
            size="small"
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
          description: `${user.appID}`,
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
          placeholder="Enter User ID"
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
    <Column style={{ padding: 4 }}>
      {renderSearchInput()}
      {renderSearchedUsers()}
      {renderFriendsList()}
    </Column>
  );
};

export default GoalBuddiesList;
