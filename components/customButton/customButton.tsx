import React from "react";
import { StyledButton, EthnoText } from "./customButton.css";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
  size?: number;
}

export const CustomButton = ({
  title,
  onPress,
  disabled,
  secondary,
  size,
}: Props) => {
  return (
    <StyledButton onPress={onPress} disabled={disabled} secondary={secondary}>
      <EthnoText size={size} secondary={secondary}>
        {title}
      </EthnoText>
    </StyledButton>
  );
};
