import { Formik } from "formik";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { theme } from "theme";
import { FollowingPostField } from "./followingPostForm.css";
import { useSelector } from "react-redux";
import { selectAuthToken } from "../../redux/auth/selectors";
import { submitFollowingPost } from "../../repositories/PostRepository";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

export const FollowingPostForm = ({
  formikRef,
  errorMessage,
  setErrorMessage,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const navigation = useNavigation();
  return (
    <View>
      <Formik
        innerRef={formikRef}
        initialValues={{ followingPost: "" }}
        onSubmit={(values) => {
          const { followingPost } = values;
          //@ts-ignore
          dispatch(submitFollowingPost({ followingPost, token }));
          //@ts-ignore
          navigation.navigate("Home", undefined);
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <View
            style={{
              backgroundColor: theme.colors.SURFACE_200,
              height: "100%",
            }}
          >
            <FollowingPostField
              placeholder={
                "Let your friends and followers know what's happening!"
              }
              multiline={true}
              numberOfLines={4}
              onChangeText={handleChange("followingPost")}
              value={values.followingPost}
              //   error={errors.followingPost}
              //   setError={setErrorMessage}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
