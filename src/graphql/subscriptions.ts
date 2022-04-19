/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateGoalList = /* GraphQL */ `
  subscription OnCreateGoalList {
    onCreateGoalList {
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
          completed
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
export const onUpdateGoalList = /* GraphQL */ `
  subscription OnUpdateGoalList {
    onUpdateGoalList {
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
          completed
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
export const onDeleteGoalList = /* GraphQL */ `
  subscription OnDeleteGoalList {
    onDeleteGoalList {
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
          completed
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
export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal {
    onCreateGoal {
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
export const onUpdateGoal = /* GraphQL */ `
  subscription OnUpdateGoal {
    onUpdateGoal {
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
export const onDeleteGoal = /* GraphQL */ `
  subscription OnDeleteGoal {
    onDeleteGoal {
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
