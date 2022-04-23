/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createFriendShip = /* GraphQL */ `
  mutation CreateFriendShip(
    $input: CreateFriendShipInput!
    $condition: ModelFriendShipConditionInput
  ) {
    createFriendShip(input: $input, condition: $condition) {
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
export const updateFriendShip = /* GraphQL */ `
  mutation UpdateFriendShip(
    $input: UpdateFriendShipInput!
    $condition: ModelFriendShipConditionInput
  ) {
    updateFriendShip(input: $input, condition: $condition) {
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
export const deleteFriendShip = /* GraphQL */ `
  mutation DeleteFriendShip(
    $input: DeleteFriendShipInput!
    $condition: ModelFriendShipConditionInput
  ) {
    deleteFriendShip(input: $input, condition: $condition) {
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
export const createGoalList = /* GraphQL */ `
  mutation CreateGoalList(
    $input: CreateGoalListInput!
    $condition: ModelGoalListConditionInput
  ) {
    createGoalList(input: $input, condition: $condition) {
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
export const updateGoalList = /* GraphQL */ `
  mutation UpdateGoalList(
    $input: UpdateGoalListInput!
    $condition: ModelGoalListConditionInput
  ) {
    updateGoalList(input: $input, condition: $condition) {
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
export const deleteGoalList = /* GraphQL */ `
  mutation DeleteGoalList(
    $input: DeleteGoalListInput!
    $condition: ModelGoalListConditionInput
  ) {
    deleteGoalList(input: $input, condition: $condition) {
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
export const createGoal = /* GraphQL */ `
  mutation CreateGoal(
    $input: CreateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    createGoal(input: $input, condition: $condition) {
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
export const updateGoal = /* GraphQL */ `
  mutation UpdateGoal(
    $input: UpdateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    updateGoal(input: $input, condition: $condition) {
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
export const deleteGoal = /* GraphQL */ `
  mutation DeleteGoal(
    $input: DeleteGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    deleteGoal(input: $input, condition: $condition) {
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
export const createGoalBuddyGoalLists = /* GraphQL */ `
  mutation CreateGoalBuddyGoalLists(
    $input: CreateGoalBuddyGoalListsInput!
    $condition: ModelGoalBuddyGoalListsConditionInput
  ) {
    createGoalBuddyGoalLists(input: $input, condition: $condition) {
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
export const updateGoalBuddyGoalLists = /* GraphQL */ `
  mutation UpdateGoalBuddyGoalLists(
    $input: UpdateGoalBuddyGoalListsInput!
    $condition: ModelGoalBuddyGoalListsConditionInput
  ) {
    updateGoalBuddyGoalLists(input: $input, condition: $condition) {
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
export const deleteGoalBuddyGoalLists = /* GraphQL */ `
  mutation DeleteGoalBuddyGoalLists(
    $input: DeleteGoalBuddyGoalListsInput!
    $condition: ModelGoalBuddyGoalListsConditionInput
  ) {
    deleteGoalBuddyGoalLists(input: $input, condition: $condition) {
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
