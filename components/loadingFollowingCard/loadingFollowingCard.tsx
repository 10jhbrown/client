import React, { useEffect, useRef } from "react";
import {
  SkeletonWrapper,
  SkeletonImage,
  SkeletonTitle,
  SkeletonText,
  SkeletonButton,
} from "./loadingFollowingCard.css";
import { StyleSheet, View, Animated } from "react-native";

export const LoadingFollowingCard = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  const shimmerInterpolation = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  return (
    <SkeletonWrapper>
      <View>
        <SkeletonTitle>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: [{ translateX: shimmerInterpolation }],
            }}
          />
        </SkeletonTitle>
        <SkeletonText>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: [{ translateX: shimmerInterpolation }],
            }}
          />
        </SkeletonText>
        <SkeletonText>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: [{ translateX: shimmerInterpolation }],
            }}
          />
        </SkeletonText>
        <SkeletonButton>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: [{ translateX: shimmerInterpolation }],
            }}
          />
        </SkeletonButton>
      </View>
    </SkeletonWrapper>
  );
};

export default LoadingFollowingCard;
