import React from "react";
import { View, Text } from "react-native";
import { CustomButton } from "../../components/customButton";
import { setLogOut } from "../../redux/auth";
import { emptyPosts } from "../../redux/followingFeed";
import { useDispatch } from "react-redux";

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(emptyPosts());
    dispatch(setLogOut());
  };

  return (
    <View>
      <Text>Profile Screen</Text>
      <CustomButton title="Log Out" onPress={handleLogOut} />
    </View>
  );
};
