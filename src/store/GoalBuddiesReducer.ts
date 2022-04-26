import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import {
  FriendShip,
  GoalList,
  ListGoalBuddyGoalListsQuery,
  User,
} from "../API";
import { listGoalBuddyGoalLists } from "../graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { groupBy } from "lodash";

export interface GoalBuddiesReducer {
  friendships: FriendShip[] | null;
  goalBuddiesGoalLists: { [userID: string]: GoalList[] };
  selectedGoalBuddy: User | null;
}

const initialState: GoalBuddiesReducer = {
  friendships: null,
  goalBuddiesGoalLists: {},
  selectedGoalBuddy: null,
};

export const goalBuddiesSlice = createSlice({
  name: "goalBuddies",
  initialState: initialState,
  reducers: {
    resetGoalBuddiesReducer: (state) => {
      return { ...initialState };
    },

    setFriendships: (state, action: PayloadAction<FriendShip[]>) => {
      state.friendships = action.payload;
    },

    addFriendship: (state, action: PayloadAction<FriendShip>) => {
      if (state.friendships) {
        state.friendships.push(action.payload);
      } else {
        state.friendships = [action.payload];
      }
    },

    deleteFriendship: (state, action: PayloadAction<FriendShip>) => {
      if (state.friendships) {
        const deletedFriendship = action.payload;
        const deleteIndex = state.friendships.findIndex(
          (friendship) => friendship.id === deletedFriendship.id
        );

        if (deleteIndex > -1) {
          state.friendships = state.friendships
            .slice(0, deleteIndex)
            .concat(state.friendships.slice(deleteIndex + 1));
        }
      }
    },
    setSelectedGoalBuddy: (state, action: PayloadAction<User>) => {
      state.selectedGoalBuddy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoalBuddiesGoalLists.fulfilled, (state, action) => {
      if (action.payload) {
        const groupedGoalBuddiesGoalLists = groupBy(
          action.payload,
          (item) => item && item.goalList.userGoalListId
        );

        let goalBuddiesGoalLists: { [userID: string]: GoalList[] } = {};
        for (let [userID, goalBuddyGoalLists] of Object.entries(
          groupedGoalBuddiesGoalLists
        )) {
          let goalLists: GoalList[] = [];
          for (let goalBuddyGoalList of goalBuddyGoalLists) {
            if (goalBuddyGoalList) {
              goalLists.push(goalBuddyGoalList.goalList);
            }
          }
          goalBuddiesGoalLists[userID] = goalLists;
        }

        state.goalBuddiesGoalLists = goalBuddiesGoalLists;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  resetGoalBuddiesReducer,
  setFriendships,
  addFriendship,
  deleteFriendship,
  setSelectedGoalBuddy,
} = goalBuddiesSlice.actions;

export const fetchGoalBuddiesGoalLists = createAsyncThunk(
  "goalBuddies/fetchGoalBuddiesGoalLists",
  async (userID: string, thunkAPI) => {
    const listGoalBuddyGoalListsQuery = (await API.graphql(
      graphqlOperation(listGoalBuddyGoalLists, {
        filter: {
          userID: {
            eq: userID,
          },
        },
      })
    )) as GraphQLResult<ListGoalBuddyGoalListsQuery>;

    if (listGoalBuddyGoalListsQuery.data?.listGoalBuddyGoalLists) {
      return listGoalBuddyGoalListsQuery.data?.listGoalBuddyGoalLists.items;
    }

    return null;
  }
);

export default goalBuddiesSlice.reducer;
