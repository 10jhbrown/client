import React, { useState, useLayoutEffect } from "react";
import { View } from "react-native";
import { theme } from "theme";
import { FollowingPostForm } from "../../components/followingPostForm";
import {} from "../../redux/followingFeed/index";
import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "components/customButton";

export const AddPostScreen = () => {
  const [errorMessage, setErrorMessage] = useState<string | Error>(null);
  const navigation = useNavigation();

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
