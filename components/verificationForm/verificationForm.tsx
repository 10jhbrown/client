import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";
import { theme } from "../../theme";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import {
  VerificationContainer,
  VerificationTitle,
  VerificationSubTitle,
  VerificationEmail,
  VerificationDescription,
} from "./verificationForm.css";
import { CustomButton } from "../../components/customButton";
import { FiveMinuteCountDown } from "../../components/fiveMinuteCountDown";

interface Props {
  values: object;
  handleSubmit?: () => void;
  goToPrevForm?: () => void;
  errorMessage?: string | Error;
}

export const VerificationForm = ({
  values,
  handleSubmit,
  goToPrevForm,
  errorMessage,
}: Props) => {
  //   const ref = useBlurOnFulfill({ values.en, cellCount: 6 });
  console.log("Verification Error", errorMessage);
  const [value, setValue] = useState("");
  values["emailCode"] = value;
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <View>
      <VerificationContainer>
        <VerificationTitle>Verify Email</VerificationTitle>
        <VerificationSubTitle>
          A verification code has been sent to
        </VerificationSubTitle>
        <VerificationEmail>{values["email"]}</VerificationEmail>
        <VerificationDescription>
          Please check your inbox and enter the verification code to verify your
          email and finish signing up. The code will expire in
          <FiveMinuteCountDown />
        </VerificationDescription>

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          testID="my-code-input"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {/* {errorMessage && (
          <View>
            <Text> {errorMessage}</Text>
          </View>
        )} */}
      </VerificationContainer>
      <CustomButton title="Sign Up" onPress={handleSubmit} />
      <CustomButton title="Back" onPress={goToPrevForm} secondary={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20, color: "white" },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: theme.colors.PLACEHOLDER,
    textAlign: "center",
    color: "white",
    borderRadius: 15,
    margin: 10,
  },
  focusCell: {
    borderColor: theme.colors.PRIMARY_400,
    color: "#fff",
  },
});
