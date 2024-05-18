import React, { useEffect } from "react";
import { View } from "react-native";
import { theme } from "theme";
import { TopHomeBar } from "../../components/topHomeBar";
import { useSelector } from "react-redux";
import { selectActiveFeedTab } from "../../redux/feedTab/selectors";
import { CampusFeed } from "../../components/campusFeed";
import { FollowingFeed } from "../../components/followingFeed";
export const HomeScreen = () => {
  const activeFeedTab = useSelector(selectActiveFeedTab);
  const mainPanel = () => {
    // if (activeFeedTab) {
    //   return <CampusFeed />;
    // }
    // if (!activeFeedTab) {
    //   return <FollowingFeed />;
    // }
    return activeFeedTab ? <CampusFeed /> : <FollowingFeed />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.SURFACE_200 }}>
      <TopHomeBar />
      {mainPanel()}
    </View>
  );
};
