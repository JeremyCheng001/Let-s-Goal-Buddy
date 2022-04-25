import { GraphQLResult } from "@aws-amplify/api-graphql";
import { PutResult } from "@aws-amplify/storage";
import { Avatar, Button, Icon, Input, Text } from "@ui-kitten/components";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserInput, UpdateUserMutation, User } from "../API";
import Row from "../components/Row";
import { updateUser } from "../graphql/mutations";
import { resetGoalBuddiesReducer } from "../store/GoalBuddiesReducer";
import { resetGoalListReducer } from "../store/GoalListReducer";
import { RootState } from "../store/store";
import { resetUser, setUser } from "../store/UserReducer";

interface UserSettingsProps {}
const AccessLevel = "public";

const UserSettings: FunctionComponent<UserSettingsProps> = () => {
  const user: User = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const avatarUploadPathInS3 = `Avatar/${user.id}_avatar.jpg`; // avatar is stored in the path like "/public/Avatar/L230CSHK_avatar.jpg"

  const [image, setImage] = useState(" ");
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(user.name);

  const nameInputEl = useRef(null);

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

  useEffect(() => {
    downloadImage(avatarUploadPathInS3);
  }, []);

  const handleSaveName = async () => {
    setEditingName(false);
    const updateUserInput: UpdateUserInput = {
      id: user.id,
      name: name,
    };
    const updateUserMutation = (await API.graphql(
      graphqlOperation(updateUser, { input: updateUserInput })
    )) as GraphQLResult<UpdateUserMutation>;

    if (updateUserMutation.data?.updateUser) {
      dispatch(setUser(updateUserMutation.data.updateUser as User));
    }
  };

  function renderUserName() {
    return (
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Row style={{ width: "50%" }}>
          <Input
            ref={nameInputEl}
            style={{ flex: 1, display: editingName ? "flex" : "none" }}
            value={name}
            onChangeText={(nextText: string) => setName(nextText)}
            onBlur={handleSaveName}
          />
        </Row>
        <Pressable
          onPress={() => {
            setEditingName(true);
            if (nameInputEl && nameInputEl.current) {
              (nameInputEl.current as any).focus();
            }
          }}
          style={{ display: editingName ? "none" : "flex" }}
        >
          <Row style={{ marginTop: 10 }}>
            <Text category={"h6"}>{user.name}</Text>
            <Icon
              name="edit-2-outline"
              style={{ width: 20, height: 20, marginLeft: 4 }}
              fill="#8F9BB3"
            />
          </Row>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          <View
            style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
          >
            <Pressable
              style={{ alignItems: "center", marginBottom: 20 }}
              onPress={copyToClipboard}
            >
              <Text category={"s1"}>User ID: {user.appID}</Text>
              <Text appearance={"hint"} category="c1">
                Press to copy User ID
              </Text>
            </Pressable>

            <Pressable onPress={pickImage} style={{ alignItems: "center" }}>
              <Avatar
                source={{ uri: user.imageUrl || image }}
                style={{ width: 120, height: 120 }}
              />
              <Text appearance={"hint"} category="c1">
                Press to Change Avatar
              </Text>
            </Pressable>
            {renderUserName()}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserSettings;
