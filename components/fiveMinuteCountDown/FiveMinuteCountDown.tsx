import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../navigation/types";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../redux/auth";

export const FiveMinuteCountDown = () => {
  const [seconds, setSeconds] = useState(10 * 60);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  // Function to update the timer every second
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      dispatch(clearErrors());

      navigation.navigate("Login", undefined);
    }
  }, [seconds]);

  // Format seconds into minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
      {` ${minutes
        .toString()
        .padStart(1, "0")}:${remainingSeconds.toString().padStart(2, "0")}`}
    </Text>
  );
};
