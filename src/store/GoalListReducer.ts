import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Goal, GoalList } from "../API";

export interface GoalListReducer {
  selectedGoalList: GoalList | null;
}

const initialState: GoalListReducer = {
  selectedGoalList: null,
};

export const goalListSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    resetGoalListReducer: (state) => {
      state.selectedGoalList = null;
    },
    setSelectedGoalList: (state, action: PayloadAction<GoalList | null>) => {
      state.selectedGoalList = action.payload;
    },

    addNewGoalToList: (state, action: PayloadAction<Goal>) => {
      if (state.selectedGoalList) {
        state.selectedGoalList.goals?.items.unshift(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetGoalListReducer, setSelectedGoalList, addNewGoalToList } = goalListSlice.actions;

export default goalListSlice.reducer;
