import React from "react";
import { StyledButton, ButtonText } from "./customButton.css";

export const CustomButton = ({ title, onPress }) => {
  return (
    <StyledButton onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </StyledButton>
  );
};
