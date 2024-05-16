import React from "react";
import { SafeAreaView, View, TouchableOpacity, StyleSheet } from "react-native";

import { theme } from "../../theme";
import { FeedTabText } from "./feedTab.css";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveFeedTab } from "../../redux/feedTab/selectors";
import { setCampusFeedTab, setFollowingFeedTab } from "../../redux/feedTab";

export const FeedTab = () => {
  const activeFeedTab = useSelector(selectActiveFeedTab);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[
            styles.btn,
            activeFeedTab
              ? {
                  borderBottomColor: theme.colors.PRIMARY_500,
                  borderBottomWidth: 1,
                }
              : null,
          ]}
          onPress={() => dispatch(setCampusFeedTab())}
        >
          <View>
            <FeedTabText activeFeedTab={activeFeedTab}>Campus</FeedTabText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            !activeFeedTab
              ? {
                  borderBottomColor: theme.colors.PRIMARY_500,
                  borderBottomWidth: 1,
                }
              : null,
          ]}
          onPress={() => dispatch(setFollowingFeedTab())}
        >
          <View>
            {/* <FollowingIcon /> */}

            <FeedTabText activeFeedTab={!activeFeedTab}>Following</FeedTabText>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0,
    borderBottomColor: "#6B7280",
  },
  btn: {
    flex: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: "#6B7280",
  },
  btnText: {
    textAlign: "center",
    paddingVertical: 18,
    fontSize: 18,
    fontWeight: 800,
    color: theme.colors.PLACEHOLDER,
  },
});
