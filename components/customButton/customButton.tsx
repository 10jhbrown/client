import React from "react";
import { StyledButton, ButtonText } from "./customButton.css";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
}

export const CustomButton = ({
  title,
  onPress,
  disabled,
  secondary,
}: Props) => {
  return (
    <StyledButton onPress={onPress} disabled={disabled} secondary={secondary}>
      <ButtonText secondary={secondary}>{title}</ButtonText>
    </StyledButton>
  );
};
