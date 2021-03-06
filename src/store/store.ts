import { configureStore } from "@reduxjs/toolkit";
import GoalListReducer from "./GoalListReducer";
import UserReducer from "./UserReducer";
import GoalBuddiesReducer from "./GoalBuddiesReducer";

export const store = configureStore({
  reducer: {
    userReducer: UserReducer,
    goalListReducer: GoalListReducer,
    goalBuddiesReducer:GoalBuddiesReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
