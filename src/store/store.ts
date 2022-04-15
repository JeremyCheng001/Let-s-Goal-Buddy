import { configureStore } from "@reduxjs/toolkit";
import GoalListReducer from "./GoalListReducer";

export const store = configureStore({
  reducer: {
    goalListReducer: GoalListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
