import React, { useContext, useEffect } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Pressable,
  View,
  Text,
} from "react-native";
import { theme } from "../../theme";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveSort } from "../../redux/sortSwitch/selectors";
import { setLatestSort, setGreatestSort } from "../../redux/sortSwitch";

export const SortSwitch = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const activeSort = useSelector(selectActiveSort);
  const dispatch = useDispatch();
  const startAnimation = (toValue) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    if (activeSort === "latest" && toValue === 1) {
      dispatch(setGreatestSort());
    } else if (activeSort === "greatest" && toValue === 0) {
      dispatch(setLatestSort());
    }
  };

  useEffect(() => {
    if (activeSort === "latest") {
      startAnimation(0);
    }
    console.log("ACTIVE SORT: ", activeSort);
  }, [activeSort]);

  const left = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["2%", "50%"],
    extrapolate: "clamp",
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.9, 1],
    extrapolate: "clamp",
  });

  const activeSortLatest = (textLabel) => {
    return activeSort === "latest" ? (
      <Animated.Text style={[styles.sliderText, { transform: [{ scale }] }]}>
        {textLabel}
      </Animated.Text>
    ) : (
      <Text style={styles.inActiveText}>{textLabel}</Text>
    );
  };

  const activeSortGreatest = (textLabel) => {
    return activeSort === "greatest" ? (
      <Animated.Text style={[styles.sliderText, { transform: [{ scale }] }]}>
        {textLabel}
      </Animated.Text>
    ) : (
      <Text style={styles.inActiveText}>{textLabel}</Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Animated.View style={[styles.slider, { left }]} />
        <Pressable
          style={styles.clickableArea}
          onPress={startAnimation.bind(null, 0)}
        >
          {activeSortLatest("Latest")}
        </Pressable>
        <Pressable
          style={styles.clickableArea}
          onPress={startAnimation.bind(null, 1)}
        >
          {activeSortGreatest("Greatest")}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 80,
  },
  sliderContainer: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.SURFACE_200,
  },
  clickableArea: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sliderText: {
    fontSize: 14,
    fontWeight: "800",
    color: "white",
  },
  inActiveText: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.colors.SURFACE_600,
  },
  slider: {
    position: "absolute",
    width: "48%",
    height: "90%",
    borderRadius: 10,
    backgroundColor: theme.colors.PRIMARY_500,
  },
});
