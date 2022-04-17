import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../API";

export interface UserState extends User {}

const initialState: UserState = {
  __typename: "User",
  id: "-1",
  cognitoUserID: "-1",
  name: "",
  createdAt: "",
  updatedAt: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { id, cognitoUserID, name, motto, imageUrl, createdAt, updatedAt } =
        action.payload;
      state.id = id;
      state.cognitoUserID = cognitoUserID;
      state.name = name;
      state.motto = motto;
      state.imageUrl = imageUrl;
      state.createdAt = createdAt;
      state.updatedAt = updatedAt;
    },
  },
});

export const { setUser } = counterSlice.actions;

export default counterSlice.reducer;
