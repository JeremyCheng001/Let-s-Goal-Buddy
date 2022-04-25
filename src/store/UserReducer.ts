import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../API";

export interface UserAvatar {
  userID: string;
  s3ImageURL: string; // signed URL string from S3, default expiration is 600s=15mins,
  // might need expired timestamp here, because the signed URL might be expired in 15 mins
}
export interface UserState extends User {
  userAvatars: { [userID: string]: UserAvatar };
}

const initialState: UserState = {
  __typename: "User",
  id: "-1",
  appID: "-1",
  name: "",
  createdAt: "",
  updatedAt: "",
  userAvatars: {},
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      return { ...initialState };
    },
    setUser: (state, action: PayloadAction<User>) => {
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
    setUserAvatar: (state, action: PayloadAction<UserAvatar>) => {
      const { userID } = action.payload;
      state.userAvatars[userID] = action.payload;
    },
  },
});

export const { resetUser, setUser, setUserAvatar } = counterSlice.actions;

export default counterSlice.reducer;
