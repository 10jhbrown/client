import React from "react";
import { View } from "react-native";
import { theme } from "theme";
import { TopHomeBar } from "../../components/topHomeBar";
import { selectActiveFeedTab } from "../../redux/feedTab/selectors";
import { CampusFeed } from "../../components/campusFeed";
import { FollowingFeedContainer } from "../../components/followingFeed";
import { selectActiveSort } from "../../redux/sortSwitch/selectors";
import { useSelector } from "react-redux";

export const HomeScreen: React.FC = () => {
  const activeFeedTab = useSelector(selectActiveFeedTab);
  const activeSort = useSelector(selectActiveSort);

  const renderFollowingFeed = () => (
    <FollowingFeedContainer sortType={activeSort} />
  );

  const renderCampusFeed = () => null;

  const mainPanel = () => {
    return activeFeedTab ? renderCampusFeed() : renderFollowingFeed();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.SURFACE_200 }}>
      <TopHomeBar />
      {mainPanel()}
    </View>
  );
};
