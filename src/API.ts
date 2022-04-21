/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  priority?: string | null,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  priority?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  name: string,
  description?: string | null,
  priority?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  priority?: string | null,
};

export type DeleteTodoInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  appID: string,
  name: string,
  imageUrl?: string | null,
  motto?: string | null,
};

export type ModelUserConditionInput = {
  appID?: ModelStringInput | null,
  name?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  motto?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  appID: string,
  name: string,
  imageUrl?: string | null,
  motto?: string | null,
  goalList?: ModelGoalListConnection | null,
  goalBuddyGoalLists?: ModelGoalBuddyGoalListsConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelGoalListConnection = {
  __typename: "ModelGoalListConnection",
  items:  Array<GoalList | null >,
  nextToken?: string | null,
};

export type GoalList = {
  __typename: "GoalList",
  id: string,
  type: number,
  startDate: string,
  endDate: string,
  user?: User | null,
  goals?: ModelGoalConnection | null,
  goalBuddies?: ModelGoalBuddyGoalListsConnection | null,
  createdAt: string,
  updatedAt: string,
  userGoalListId?: string | null,
};

export type ModelGoalConnection = {
  __typename: "ModelGoalConnection",
  items:  Array<Goal | null >,
  nextToken?: string | null,
};

export type Goal = {
  __typename: "Goal",
  id: string,
  title: string,
  type: number,
  description?: string | null,
  startDateTime?: string | null,
  endDateTime?: string | null,
  progress?: number | null,
  completed?: boolean | null,
  goalList?: GoalList | null,
  createdAt: string,
  updatedAt: string,
  goalListGoalsId?: string | null,
};

export type ModelGoalBuddyGoalListsConnection = {
  __typename: "ModelGoalBuddyGoalListsConnection",
  items:  Array<GoalBuddyGoalLists | null >,
  nextToken?: string | null,
};

export type GoalBuddyGoalLists = {
  __typename: "GoalBuddyGoalLists",
  id: string,
  userID: string,
  goalListID: string,
  user: User,
  goalList: GoalList,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  appID?: string | null,
  name?: string | null,
  imageUrl?: string | null,
  motto?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateGoalListInput = {
  id?: string | null,
  type: number,
  startDate: string,
  endDate: string,
  userGoalListId?: string | null,
};

export type ModelGoalListConditionInput = {
  type?: ModelIntInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  and?: Array< ModelGoalListConditionInput | null > | null,
  or?: Array< ModelGoalListConditionInput | null > | null,
  not?: ModelGoalListConditionInput | null,
  userGoalListId?: ModelIDInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateGoalListInput = {
  id: string,
  type?: number | null,
  startDate?: string | null,
  endDate?: string | null,
  userGoalListId?: string | null,
};

export type DeleteGoalListInput = {
  id: string,
};

export type CreateGoalInput = {
  id?: string | null,
  title: string,
  type: number,
  description?: string | null,
  startDateTime?: string | null,
  endDateTime?: string | null,
  progress?: number | null,
  completed?: boolean | null,
  goalListGoalsId?: string | null,
};

export type ModelGoalConditionInput = {
  title?: ModelStringInput | null,
  type?: ModelIntInput | null,
  description?: ModelStringInput | null,
  startDateTime?: ModelStringInput | null,
  endDateTime?: ModelStringInput | null,
  progress?: ModelIntInput | null,
  completed?: ModelBooleanInput | null,
  and?: Array< ModelGoalConditionInput | null > | null,
  or?: Array< ModelGoalConditionInput | null > | null,
  not?: ModelGoalConditionInput | null,
  goalListGoalsId?: ModelIDInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateGoalInput = {
  id: string,
  title?: string | null,
  type?: number | null,
  description?: string | null,
  startDateTime?: string | null,
  endDateTime?: string | null,
  progress?: number | null,
  completed?: boolean | null,
  goalListGoalsId?: string | null,
};

export type DeleteGoalInput = {
  id: string,
};

export type CreateGoalBuddyGoalListsInput = {
  id?: string | null,
  userID: string,
  goalListID: string,
};

export type ModelGoalBuddyGoalListsConditionInput = {
  userID?: ModelIDInput | null,
  goalListID?: ModelIDInput | null,
  and?: Array< ModelGoalBuddyGoalListsConditionInput | null > | null,
  or?: Array< ModelGoalBuddyGoalListsConditionInput | null > | null,
  not?: ModelGoalBuddyGoalListsConditionInput | null,
};

export type UpdateGoalBuddyGoalListsInput = {
  id: string,
  userID?: string | null,
  goalListID?: string | null,
};

export type DeleteGoalBuddyGoalListsInput = {
  id: string,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  priority?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  appID?: ModelStringInput | null,
  name?: ModelStringInput | null,
  imageUrl?: ModelStringInput | null,
  motto?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelGoalListFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelIntInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  and?: Array< ModelGoalListFilterInput | null > | null,
  or?: Array< ModelGoalListFilterInput | null > | null,
  not?: ModelGoalListFilterInput | null,
  userGoalListId?: ModelIDInput | null,
};

export type ModelGoalFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  type?: ModelIntInput | null,
  description?: ModelStringInput | null,
  startDateTime?: ModelStringInput | null,
  endDateTime?: ModelStringInput | null,
  progress?: ModelIntInput | null,
  completed?: ModelBooleanInput | null,
  and?: Array< ModelGoalFilterInput | null > | null,
  or?: Array< ModelGoalFilterInput | null > | null,
  not?: ModelGoalFilterInput | null,
  goalListGoalsId?: ModelIDInput | null,
};

export type ModelGoalBuddyGoalListsFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  goalListID?: ModelIDInput | null,
  and?: Array< ModelGoalBuddyGoalListsFilterInput | null > | null,
  or?: Array< ModelGoalBuddyGoalListsFilterInput | null > | null,
  not?: ModelGoalBuddyGoalListsFilterInput | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    priority?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    priority?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    priority?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    appID: string,
    name: string,
    imageUrl?: string | null,
    motto?: string | null,
    goalList?:  {
      __typename: "ModelGoalListConnection",
      items:  Array< {
        __typename: "GoalList",
        id: string,
        type: number,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        userGoalListId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddyGoalLists?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    appID: string,
    name: string,
    imageUrl?: string | null,
    motto?: string | null,
    goalList?:  {
      __typename: "ModelGoalListConnection",
      items:  Array< {
        __typename: "GoalList",
        id: string,
        type: number,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        userGoalListId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddyGoalLists?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    appID: string,
    name: string,
    imageUrl?: string | null,
    motto?: string | null,
    goalList?:  {
      __typename: "ModelGoalListConnection",
      items:  Array< {
        __typename: "GoalList",
        id: string,
        type: number,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        userGoalListId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddyGoalLists?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGoalListMutationVariables = {
  input: CreateGoalListInput,
  condition?: ModelGoalListConditionInput | null,
};

export type CreateGoalListMutation = {
  createGoalList?:  {
    __typename: "GoalList",
    id: string,
    type: number,
    startDate: string,
    endDate: string,
    user?:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    goals?:  {
      __typename: "ModelGoalConnection",
      items:  Array< {
        __typename: "Goal",
        id: string,
        title: string,
        type: number,
        description?: string | null,
        startDateTime?: string | null,
        endDateTime?: string | null,
        progress?: number | null,
        completed?: boolean | null,
        createdAt: string,
        updatedAt: string,
        goalListGoalsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddies?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGoalListId?: string | null,
  } | null,
};

export type UpdateGoalListMutationVariables = {
  input: UpdateGoalListInput,
  condition?: ModelGoalListConditionInput | null,
};

export type UpdateGoalListMutation = {
  updateGoalList?:  {
    __typename: "GoalList",
    id: string,
    type: number,
    startDate: string,
    endDate: string,
    user?:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    goals?:  {
      __typename: "ModelGoalConnection",
      items:  Array< {
        __typename: "Goal",
        id: string,
        title: string,
        type: number,
        description?: string | null,
        startDateTime?: string | null,
        endDateTime?: string | null,
        progress?: number | null,
        completed?: boolean | null,
        createdAt: string,
        updatedAt: string,
        goalListGoalsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddies?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGoalListId?: string | null,
  } | null,
};

export type DeleteGoalListMutationVariables = {
  input: DeleteGoalListInput,
  condition?: ModelGoalListConditionInput | null,
};

export type DeleteGoalListMutation = {
  deleteGoalList?:  {
    __typename: "GoalList",
    id: string,
    type: number,
    startDate: string,
    endDate: string,
    user?:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    goals?:  {
      __typename: "ModelGoalConnection",
      items:  Array< {
        __typename: "Goal",
        id: string,
        title: string,
        type: number,
        description?: string | null,
        startDateTime?: string | null,
        endDateTime?: string | null,
        progress?: number | null,
        completed?: boolean | null,
        createdAt: string,
        updatedAt: string,
        goalListGoalsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddies?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGoalListId?: string | null,
  } | null,
};

export type CreateGoalMutationVariables = {
  input: CreateGoalInput,
  condition?: ModelGoalConditionInput | null,
};

export type CreateGoalMutation = {
  createGoal?:  {
    __typename: "Goal",
    id: string,
    title: string,
    type: number,
    description?: string | null,
    startDateTime?: string | null,
    endDateTime?: string | null,
    progress?: number | null,
    completed?: boolean | null,
    goalList?:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    goalListGoalsId?: string | null,
  } | null,
};

export type UpdateGoalMutationVariables = {
  input: UpdateGoalInput,
  condition?: ModelGoalConditionInput | null,
};

export type UpdateGoalMutation = {
  updateGoal?:  {
    __typename: "Goal",
    id: string,
    title: string,
    type: number,
    description?: string | null,
    startDateTime?: string | null,
    endDateTime?: string | null,
    progress?: number | null,
    completed?: boolean | null,
    goalList?:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    goalListGoalsId?: string | null,
  } | null,
};

export type DeleteGoalMutationVariables = {
  input: DeleteGoalInput,
  condition?: ModelGoalConditionInput | null,
};

export type DeleteGoalMutation = {
  deleteGoal?:  {
    __typename: "Goal",
    id: string,
    title: string,
    type: number,
    description?: string | null,
    startDateTime?: string | null,
    endDateTime?: string | null,
    progress?: number | null,
    completed?: boolean | null,
    goalList?:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    goalListGoalsId?: string | null,
  } | null,
};

export type CreateGoalBuddyGoalListsMutationVariables = {
  input: CreateGoalBuddyGoalListsInput,
  condition?: ModelGoalBuddyGoalListsConditionInput | null,
};

export type CreateGoalBuddyGoalListsMutation = {
  createGoalBuddyGoalLists?:  {
    __typename: "GoalBuddyGoalLists",
    id: string,
    userID: string,
    goalListID: string,
    user:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    goalList:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGoalBuddyGoalListsMutationVariables = {
  input: UpdateGoalBuddyGoalListsInput,
  condition?: ModelGoalBuddyGoalListsConditionInput | null,
};

export type UpdateGoalBuddyGoalListsMutation = {
  updateGoalBuddyGoalLists?:  {
    __typename: "GoalBuddyGoalLists",
    id: string,
    userID: string,
    goalListID: string,
    user:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    goalList:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGoalBuddyGoalListsMutationVariables = {
  input: DeleteGoalBuddyGoalListsInput,
  condition?: ModelGoalBuddyGoalListsConditionInput | null,
};

export type DeleteGoalBuddyGoalListsMutation = {
  deleteGoalBuddyGoalLists?:  {
    __typename: "GoalBuddyGoalLists",
    id: string,
    userID: string,
    goalListID: string,
    user:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    goalList:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    priority?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      description?: string | null,
      priority?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    appID: string,
    name: string,
    imageUrl?: string | null,
    motto?: string | null,
    goalList?:  {
      __typename: "ModelGoalListConnection",
      items:  Array< {
        __typename: "GoalList",
        id: string,
        type: number,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        userGoalListId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddyGoalLists?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGoalListQueryVariables = {
  id: string,
};

export type GetGoalListQuery = {
  getGoalList?:  {
    __typename: "GoalList",
    id: string,
    type: number,
    startDate: string,
    endDate: string,
    user?:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    goals?:  {
      __typename: "ModelGoalConnection",
      items:  Array< {
        __typename: "Goal",
        id: string,
        title: string,
        type: number,
        description?: string | null,
        startDateTime?: string | null,
        endDateTime?: string | null,
        progress?: number | null,
        completed?: boolean | null,
        createdAt: string,
        updatedAt: string,
        goalListGoalsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddies?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGoalListId?: string | null,
  } | null,
};

export type ListGoalListsQueryVariables = {
  filter?: ModelGoalListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGoalListsQuery = {
  listGoalLists?:  {
    __typename: "ModelGoalListConnection",
    items:  Array< {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGoalQueryVariables = {
  id: string,
};

export type GetGoalQuery = {
  getGoal?:  {
    __typename: "Goal",
    id: string,
    title: string,
    type: number,
    description?: string | null,
    startDateTime?: string | null,
    endDateTime?: string | null,
    progress?: number | null,
    completed?: boolean | null,
    goalList?:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    goalListGoalsId?: string | null,
  } | null,
};

export type ListGoalsQueryVariables = {
  filter?: ModelGoalFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGoalsQuery = {
  listGoals?:  {
    __typename: "ModelGoalConnection",
    items:  Array< {
      __typename: "Goal",
      id: string,
      title: string,
      type: number,
      description?: string | null,
      startDateTime?: string | null,
      endDateTime?: string | null,
      progress?: number | null,
      completed?: boolean | null,
      goalList?:  {
        __typename: "GoalList",
        id: string,
        type: number,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        userGoalListId?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      goalListGoalsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGoalBuddyGoalListsQueryVariables = {
  id: string,
};

export type GetGoalBuddyGoalListsQuery = {
  getGoalBuddyGoalLists?:  {
    __typename: "GoalBuddyGoalLists",
    id: string,
    userID: string,
    goalListID: string,
    user:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    goalList:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGoalBuddyGoalListsQueryVariables = {
  filter?: ModelGoalBuddyGoalListsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGoalBuddyGoalListsQuery = {
  listGoalBuddyGoalLists?:  {
    __typename: "ModelGoalBuddyGoalListsConnection",
    items:  Array< {
      __typename: "GoalBuddyGoalLists",
      id: string,
      userID: string,
      goalListID: string,
      user:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      goalList:  {
        __typename: "GoalList",
        id: string,
        type: number,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        userGoalListId?: string | null,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    priority?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    priority?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    priority?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    appID: string,
    name: string,
    imageUrl?: string | null,
    motto?: string | null,
    goalList?:  {
      __typename: "ModelGoalListConnection",
      items:  Array< {
        __typename: "GoalList",
        id: string,
        type: number,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        userGoalListId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddyGoalLists?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    appID: string,
    name: string,
    imageUrl?: string | null,
    motto?: string | null,
    goalList?:  {
      __typename: "ModelGoalListConnection",
      items:  Array< {
        __typename: "GoalList",
        id: string,
        type: number,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        userGoalListId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddyGoalLists?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    appID: string,
    name: string,
    imageUrl?: string | null,
    motto?: string | null,
    goalList?:  {
      __typename: "ModelGoalListConnection",
      items:  Array< {
        __typename: "GoalList",
        id: string,
        type: number,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        userGoalListId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddyGoalLists?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGoalListSubscription = {
  onCreateGoalList?:  {
    __typename: "GoalList",
    id: string,
    type: number,
    startDate: string,
    endDate: string,
    user?:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    goals?:  {
      __typename: "ModelGoalConnection",
      items:  Array< {
        __typename: "Goal",
        id: string,
        title: string,
        type: number,
        description?: string | null,
        startDateTime?: string | null,
        endDateTime?: string | null,
        progress?: number | null,
        completed?: boolean | null,
        createdAt: string,
        updatedAt: string,
        goalListGoalsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddies?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGoalListId?: string | null,
  } | null,
};

export type OnUpdateGoalListSubscription = {
  onUpdateGoalList?:  {
    __typename: "GoalList",
    id: string,
    type: number,
    startDate: string,
    endDate: string,
    user?:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    goals?:  {
      __typename: "ModelGoalConnection",
      items:  Array< {
        __typename: "Goal",
        id: string,
        title: string,
        type: number,
        description?: string | null,
        startDateTime?: string | null,
        endDateTime?: string | null,
        progress?: number | null,
        completed?: boolean | null,
        createdAt: string,
        updatedAt: string,
        goalListGoalsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddies?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGoalListId?: string | null,
  } | null,
};

export type OnDeleteGoalListSubscription = {
  onDeleteGoalList?:  {
    __typename: "GoalList",
    id: string,
    type: number,
    startDate: string,
    endDate: string,
    user?:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    goals?:  {
      __typename: "ModelGoalConnection",
      items:  Array< {
        __typename: "Goal",
        id: string,
        title: string,
        type: number,
        description?: string | null,
        startDateTime?: string | null,
        endDateTime?: string | null,
        progress?: number | null,
        completed?: boolean | null,
        createdAt: string,
        updatedAt: string,
        goalListGoalsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    goalBuddies?:  {
      __typename: "ModelGoalBuddyGoalListsConnection",
      items:  Array< {
        __typename: "GoalBuddyGoalLists",
        id: string,
        userID: string,
        goalListID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userGoalListId?: string | null,
  } | null,
};

export type OnCreateGoalSubscription = {
  onCreateGoal?:  {
    __typename: "Goal",
    id: string,
    title: string,
    type: number,
    description?: string | null,
    startDateTime?: string | null,
    endDateTime?: string | null,
    progress?: number | null,
    completed?: boolean | null,
    goalList?:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    goalListGoalsId?: string | null,
  } | null,
};

export type OnUpdateGoalSubscription = {
  onUpdateGoal?:  {
    __typename: "Goal",
    id: string,
    title: string,
    type: number,
    description?: string | null,
    startDateTime?: string | null,
    endDateTime?: string | null,
    progress?: number | null,
    completed?: boolean | null,
    goalList?:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    goalListGoalsId?: string | null,
  } | null,
};

export type OnDeleteGoalSubscription = {
  onDeleteGoal?:  {
    __typename: "Goal",
    id: string,
    title: string,
    type: number,
    description?: string | null,
    startDateTime?: string | null,
    endDateTime?: string | null,
    progress?: number | null,
    completed?: boolean | null,
    goalList?:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    goalListGoalsId?: string | null,
  } | null,
};

export type OnCreateGoalBuddyGoalListsSubscription = {
  onCreateGoalBuddyGoalLists?:  {
    __typename: "GoalBuddyGoalLists",
    id: string,
    userID: string,
    goalListID: string,
    user:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    goalList:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGoalBuddyGoalListsSubscription = {
  onUpdateGoalBuddyGoalLists?:  {
    __typename: "GoalBuddyGoalLists",
    id: string,
    userID: string,
    goalListID: string,
    user:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    goalList:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGoalBuddyGoalListsSubscription = {
  onDeleteGoalBuddyGoalLists?:  {
    __typename: "GoalBuddyGoalLists",
    id: string,
    userID: string,
    goalListID: string,
    user:  {
      __typename: "User",
      id: string,
      appID: string,
      name: string,
      imageUrl?: string | null,
      motto?: string | null,
      goalList?:  {
        __typename: "ModelGoalListConnection",
        nextToken?: string | null,
      } | null,
      goalBuddyGoalLists?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    goalList:  {
      __typename: "GoalList",
      id: string,
      type: number,
      startDate: string,
      endDate: string,
      user?:  {
        __typename: "User",
        id: string,
        appID: string,
        name: string,
        imageUrl?: string | null,
        motto?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      goals?:  {
        __typename: "ModelGoalConnection",
        nextToken?: string | null,
      } | null,
      goalBuddies?:  {
        __typename: "ModelGoalBuddyGoalListsConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userGoalListId?: string | null,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
