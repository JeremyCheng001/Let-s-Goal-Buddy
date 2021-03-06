/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        priority
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      appID
      name
      imageUrl
      motto
      goalList {
        items {
          id
          type
          startDate
          endDate
          createdAt
          updatedAt
          userGoalListId
        }
        nextToken
      }
      goalBuddyGoalLists {
        items {
          id
          userID
          goalListID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        appID
        name
        imageUrl
        motto
        goalList {
          nextToken
        }
        goalBuddyGoalLists {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFriendShip = /* GraphQL */ `
  query GetFriendShip($id: ID!) {
    getFriendShip(id: $id) {
      id
      user {
        id
        appID
        name
        imageUrl
        motto
        goalList {
          nextToken
        }
        goalBuddyGoalLists {
          nextToken
        }
        createdAt
        updatedAt
      }
      friend {
        id
        appID
        name
        imageUrl
        motto
        goalList {
          nextToken
        }
        goalBuddyGoalLists {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      friendShipUserId
      friendShipFriendId
    }
  }
`;
export const listFriendShips = /* GraphQL */ `
  query ListFriendShips(
    $filter: ModelFriendShipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendShips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          appID
          name
          imageUrl
          motto
          createdAt
          updatedAt
        }
        friend {
          id
          appID
          name
          imageUrl
          motto
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        friendShipUserId
        friendShipFriendId
      }
      nextToken
    }
  }
`;
export const getGoalList = /* GraphQL */ `
  query GetGoalList($id: ID!) {
    getGoalList(id: $id) {
      id
      type
      startDate
      endDate
      user {
        id
        appID
        name
        imageUrl
        motto
        goalList {
          nextToken
        }
        goalBuddyGoalLists {
          nextToken
        }
        createdAt
        updatedAt
      }
      goals {
        items {
          id
          title
          type
          description
          startDateTime
          endDateTime
          progress
          completed
          createdAt
          updatedAt
          goalListGoalsId
        }
        nextToken
      }
      goalBuddies {
        items {
          id
          userID
          goalListID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      userGoalListId
    }
  }
`;
export const listGoalLists = /* GraphQL */ `
  query ListGoalLists(
    $filter: ModelGoalListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoalLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        startDate
        endDate
        user {
          id
          appID
          name
          imageUrl
          motto
          createdAt
          updatedAt
        }
        goals {
          nextToken
        }
        goalBuddies {
          nextToken
        }
        createdAt
        updatedAt
        userGoalListId
      }
      nextToken
    }
  }
`;
export const getGoal = /* GraphQL */ `
  query GetGoal($id: ID!) {
    getGoal(id: $id) {
      id
      title
      type
      description
      startDateTime
      endDateTime
      progress
      completed
      goalList {
        id
        type
        startDate
        endDate
        user {
          id
          appID
          name
          imageUrl
          motto
          createdAt
          updatedAt
        }
        goals {
          nextToken
        }
        goalBuddies {
          nextToken
        }
        createdAt
        updatedAt
        userGoalListId
      }
      createdAt
      updatedAt
      goalListGoalsId
    }
  }
`;
export const listGoals = /* GraphQL */ `
  query ListGoals(
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        type
        description
        startDateTime
        endDateTime
        progress
        completed
        goalList {
          id
          type
          startDate
          endDate
          createdAt
          updatedAt
          userGoalListId
        }
        createdAt
        updatedAt
        goalListGoalsId
      }
      nextToken
    }
  }
`;
export const getGoalBuddyGoalLists = /* GraphQL */ `
  query GetGoalBuddyGoalLists($id: ID!) {
    getGoalBuddyGoalLists(id: $id) {
      id
      userID
      goalListID
      user {
        id
        appID
        name
        imageUrl
        motto
        goalList {
          nextToken
        }
        goalBuddyGoalLists {
          nextToken
        }
        createdAt
        updatedAt
      }
      goalList {
        id
        type
        startDate
        endDate
        user {
          id
          appID
          name
          imageUrl
          motto
          createdAt
          updatedAt
        }
        goals {
          nextToken
        }
        goalBuddies {
          nextToken
        }
        createdAt
        updatedAt
        userGoalListId
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGoalBuddyGoalLists = /* GraphQL */ `
  query ListGoalBuddyGoalLists(
    $filter: ModelGoalBuddyGoalListsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoalBuddyGoalLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        goalListID
        user {
          id
          appID
          name
          imageUrl
          motto
          createdAt
          updatedAt
        }
        goalList {
          id
          type
          startDate
          endDate
          createdAt
          updatedAt
          userGoalListId
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
