import { Storage } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import * as UserReducer from "../store/UserReducer";
import { UserAvatar } from "../store/UserReducer";

/**
 * get user avatar (S3 signed URL), if you haven't stored this info in redux yet
 */
export function useUserAvatar(userID?: string) {
  const dispatch = useDispatch();
  const userAvatars = useSelector(
    (state: RootState) => state.userReducer.userAvatars
  );

  let userAvatar: UserAvatar | null = null;
  if (userID && userAvatars[userID]) {
    userAvatar = userAvatars[userID];
  }

  async function getUserAvatar(userID: string) {
    const userAvatar = userAvatars[userID];
    if (!userAvatar) {
      const avatarUploadPathInS3 = `Avatar/${userID}_avatar.jpg`;
      const result = await Storage.get(avatarUploadPathInS3).catch((err) =>
        console.log(err)
      );
      if (result) {
        const fetchedUserAvatar: UserAvatar = {
          userID: userID,
          s3ImageURL: result,
        };
        dispatch(UserReducer.setUserAvatar(fetchedUserAvatar));
      }
    }
  }

  return { getUserAvatar, userAvatar };
}
