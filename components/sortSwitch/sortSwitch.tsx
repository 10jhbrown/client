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
import { selectActiveSortState } from "../../redux/sortSwitch/selectors";
import { setLatestSort, setGreatestSort } from "../../redux/sortSwitch";

export const SortSwitch = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const activeSort = useSelector(selectActiveSortState);
  const dispatch = useDispatch();
  const startAnimation = (toValue) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    if (activeSort && toValue === 1) {
      dispatch(setLatestSort());
    }
    if (!activeSort && toValue === 0) {
      dispatch(setGreatestSort());
    }
  };

  useEffect(() => {
    if (activeSort) {
      startAnimation(0);
    }
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
    return activeSort ? (
      <Animated.Text style={[styles.sliderText, { transform: [{ scale }] }]}>
        {textLabel}
      </Animated.Text>
    ) : (
      <Text style={styles.inActiveText}>{textLabel}</Text>
    );
  };

  const activeSortGreatest = (textLabel) => {
    return activeSort ? (
      <Text style={styles.inActiveText}>{textLabel}</Text>
    ) : (
      <Animated.Text style={[styles.sliderText, { transform: [{ scale }] }]}>
        {textLabel}
      </Animated.Text>
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
