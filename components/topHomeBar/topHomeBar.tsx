import { useNavigation } from "@react-navigation/native";
import {
  TopHomeBarContainer,
  RowContainer,
  AddCampusPostIcon,
  AddFollowingPostIcon,
} from "./topHomeBar.css";
import { FeedTab } from "../feedTab";
import { SortSwitch } from "../sortSwitch/sortSwitch";
import { useSelector } from "react-redux";
import { selectActiveFeedTab } from "../../redux/feedTab/selectors";
export const TopHomeBar = (props) => {
  const navigation = useNavigation();
  const activeFeedTab = useSelector(selectActiveFeedTab);
  const navigateToAddPost = () => {
    //@ts-ignore
    navigation.navigate("AddPost", undefined);
  };
  return (
    <TopHomeBarContainer>
      <RowContainer>
        {activeFeedTab && <AddCampusPostIcon name />}
        <SortSwitch />
        {!activeFeedTab && (
          <AddFollowingPostIcon name onPress={navigateToAddPost} />
        )}
      </RowContainer>
      <FeedTab />
    </TopHomeBarContainer>
  );
};
export default TopHomeBar;
