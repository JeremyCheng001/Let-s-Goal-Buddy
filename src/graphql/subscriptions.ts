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
export const onCreateFriendShip = /* GraphQL */ `
  subscription OnCreateFriendShip {
    onCreateFriendShip {
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
export const onUpdateFriendShip = /* GraphQL */ `
  subscription OnUpdateFriendShip {
    onUpdateFriendShip {
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
export const onDeleteFriendShip = /* GraphQL */ `
  subscription OnDeleteFriendShip {
    onDeleteFriendShip {
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
export const onCreateGoalBuddyGoalLists = /* GraphQL */ `
  subscription OnCreateGoalBuddyGoalLists {
    onCreateGoalBuddyGoalLists {
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
export const onUpdateGoalBuddyGoalLists = /* GraphQL */ `
  subscription OnUpdateGoalBuddyGoalLists {
    onUpdateGoalBuddyGoalLists {
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
export const onDeleteGoalBuddyGoalLists = /* GraphQL */ `
  subscription OnDeleteGoalBuddyGoalLists {
    onDeleteGoalBuddyGoalLists {
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
