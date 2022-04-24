import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FriendShip } from "../API";

export interface GoalBuddiesReducer {
  friendships: FriendShip[] | null;
}

const initialState: GoalBuddiesReducer = {
  friendships: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { resetGoalBuddiesReducer, setFriendships, addFriendship,deleteFriendship } =
  goalBuddiesSlice.actions;

export default goalBuddiesSlice.reducer;
