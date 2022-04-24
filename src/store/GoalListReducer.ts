import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Goal, GoalList } from "../API";
import { findIndex } from "lodash";
export interface GoalListReducer {
  selectedGoalList: GoalList | null;
  selectedGoal: Goal | null;
}

const initialState: GoalListReducer = {
  selectedGoalList: null,
  selectedGoal: null,
};

export const goalListSlice = createSlice({
  name: "goalList",
  initialState,
  reducers: {
    resetGoalListReducer: (state) => {
      return { ...initialState };
    },
    setSelectedGoalList: (state, action: PayloadAction<GoalList | null>) => {
      state.selectedGoalList = action.payload;
    },

    addNewGoalToList: (state, action: PayloadAction<Goal>) => {
      if (state.selectedGoalList) {
        state.selectedGoalList.goals?.items.unshift(action.payload);
      }
    },

    setSelectedGoal: (state, action: PayloadAction<Goal>) => {
      state.selectedGoal = action.payload;
    },
    setUpdatedGoal: (state, action: PayloadAction<Goal>) => {
      if (state.selectedGoalList?.goals?.items && state.selectedGoal) {
        const goalIndex = findIndex(
          state.selectedGoalList.goals?.items || [],
          (goal) => goal?.id === action.payload.id
        );
        if (goalIndex > -1) {
          state.selectedGoalList.goals.items[goalIndex] = action.payload;
          state.selectedGoal = action.payload;
        }
      }
    },
    setDeletedGoal: (state, action: PayloadAction<string>) => {
      if (state.selectedGoalList?.goals?.items && state.selectedGoal) {
        const goalIndex = findIndex(
          state.selectedGoalList.goals?.items || [],
          (goal) => goal?.id === action.payload
        );
        if (goalIndex > -1) {
          state.selectedGoalList.goals.items =
            state.selectedGoalList.goals.items.filter(
              (item) => item && item.id !== action.payload
            );
          state.selectedGoal = null;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  resetGoalListReducer,
  setSelectedGoalList,
  addNewGoalToList,
  setSelectedGoal,
  setUpdatedGoal,
  setDeletedGoal
} = goalListSlice.actions;

export default goalListSlice.reducer;
