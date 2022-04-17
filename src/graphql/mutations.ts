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
      createdAt
      updatedAt
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
          createdAt
          updatedAt
          goalListGoalsId
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
          createdAt
          updatedAt
          goalListGoalsId
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
          createdAt
          updatedAt
          goalListGoalsId
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
