import React, { useState, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { theme } from "theme";
import { TextInput } from "react-native-paper";
import { FollowingPostForm } from "../../components/followingPostForm";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../redux/followingFeed/index";
import { selectAuthToken } from "../../redux/auth/selectors";
import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "components/customButton";
import { submitFollowingPost } from "../../repositories/PostRepository";

export const AddPostScreen = () => {
  const [errorMessage, setErrorMessage] = useState<string | Error>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async (values: { followingPost: string }) => {
    const token = useSelector(selectAuthToken);
    console.warn("VALUES", values);
    const { followingPost } = values;
    //@ts-ignore
    dispatch(submitFollowingPost({ followingPost, token }));
    //@ts-ignore
    navigation.navigate("Home", undefined);
  };

  const formikRef = React.useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          //@ts-ignore
          onPress={() => formikRef.current?.handleSubmit()}
          title="Submit"
          size={12}
        />
      ),
    });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.SURFACE_200,
        height: "100%",
      }}
    >
      <FollowingPostForm
        formikRef={formikRef}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      {/* <TextInput multiline={true} numberOfLines={4} /> */}
    </View>
  );
};
