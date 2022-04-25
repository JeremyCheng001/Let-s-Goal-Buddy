import { PutResult } from "@aws-amplify/storage";
import { Avatar, Button, Text } from "@ui-kitten/components";
import { Auth, Storage } from "aws-amplify";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../API";
import { resetGoalBuddiesReducer } from "../store/GoalBuddiesReducer";
import { resetGoalListReducer } from "../store/GoalListReducer";
import { RootState } from "../store/store";
import { resetUser } from "../store/UserReducer";

interface UserSettingsProps {}
const AccessLevel = "public";

const UserSettings: FunctionComponent<UserSettingsProps> = () => {
  const user: User = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const avatarUploadPathInS3 = `Avatar/${user.id}_avatar.jpg`; // avatar is stored in the path like "/public/Avatar/L230CSHK_avatar.jpg"

  const [image, setImage] = useState(" ");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled && user) {
      try {
        const img = await fetchImageFromUri(result.uri);
        const uploadUrl = await uploadImage(avatarUploadPathInS3, img);
        downloadImage(uploadUrl);
      } catch (e) {
        Alert.alert("Upload Failed");
      }
    }
  };

  const downloadImage = (uri: string) => {
    Storage.get(uri, {
      level: AccessLevel,
    })
      .then((result) => {
        setImage(result);
      })
      .catch((err) => console.log(err));
  };

  const uploadImage = (fileName: string, img: Blob) => {
    return Storage.put(fileName, img, {
      level: AccessLevel,
      contentType: "image/jpeg",
    })
      .then((response: PutResult) => response.key)
      .catch((error) => error.response);
  };

  const fetchImageFromUri = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const copyToClipboard = () => {
    Clipboard.setString(user.appID);
    Alert.alert("Copied User ID");
  };

  React.useEffect(() => {
    downloadImage(avatarUploadPathInS3);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "space-between", margin: 20 }}>
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <Pressable onPress={pickImage} style={{ alignItems: "center" }}>
          <Avatar
            source={{ uri: user.imageUrl || image }}
            style={{ width: 120, height: 120 }}
          />
          <Text appearance={"hint"} category="c1">
            Press to Change Avatar
          </Text>
        </Pressable>
        <Text style={{ marginTop: 10 }} category={"h6"}>
          {user.name}
        </Text>
        {/* <Text style={{ marginTop: 10 }}>Cognito User ID: {user.id}</Text> */}
        <Pressable style={{ alignItems: "center" }} onPress={copyToClipboard}>
          <Text style={{ marginTop: 10 }} category={"s1"}>
            User ID: {user.appID}
          </Text>
          <Text appearance={"hint"} category="c1">
            Press to copy User ID
          </Text>
        </Pressable>
      </View>
      <Button
        onPress={() => {
          dispatch(resetUser());
          dispatch(resetGoalListReducer());
          dispatch(resetGoalBuddiesReducer());
          Auth.signOut();
        }}
      >
        Sign out
      </Button>
    </View>
  );
};

export default UserSettings;
