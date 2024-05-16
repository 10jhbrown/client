import { useNavigation } from "@react-navigation/native";
import {
  TopHomeBarContainer,
  RowContainer,
  AddCampusPostIcon,
  AddFollowingPostIcon,
} from "./topHomeBar.css";
import { FeedTab } from "../feedTab";
import { SortSwitch } from "../sortSwitch/sortSwitch";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveFeedTab } from "../../redux/feedTab/selectors";
export const TopHomeBar = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeFeedTab = useSelector(selectActiveFeedTab);
  //   const navigateToAddPost = () => {
  //     navigation.navigate("AddPost");
  //   };
  return (
    <TopHomeBarContainer>
      <RowContainer>
        {activeFeedTab && <AddCampusPostIcon name />}
        <SortSwitch />
        {!activeFeedTab && <AddFollowingPostIcon name />}
      </RowContainer>
      <FeedTab />
    </TopHomeBarContainer>
  );
};
export default TopHomeBar;
