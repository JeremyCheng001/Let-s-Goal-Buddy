import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../API";

export interface UserState extends User {}

const initialState: UserState = {
  __typename: "User",
  id: "-1",
  appID: "-1",
  name: "",
  createdAt: "",
  updatedAt: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    resetUser: (state) => {
      return { ...initialState };
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      const { id, appID, name, motto, imageUrl, createdAt, updatedAt } =
        action.payload;
      state.id = id;
      state.appID = appID;
      state.name = name;
      state.motto = motto;
      state.imageUrl = imageUrl;
      state.createdAt = createdAt;
      state.updatedAt = updatedAt;
    },
  },
});

export const { resetUser, setUser } = counterSlice.actions;

export default counterSlice.reducer;
