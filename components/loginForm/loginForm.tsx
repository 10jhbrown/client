import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

export const LoginForm = ({ onSubmit, errorMessage, clearError }) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  return (
    <View>
      <Text>Login</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            <TextInput
              onFocus={() => setIsEmailFocused(true)}
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleEmailBlur}
              value={values.email}
              autoCapitalize="none"
              onChange={clearError}
            />
            {errors.email && <Text>{errors.email}</Text>}
            <TextInput
              onFocus={() => setIsPasswordFocused(true)}
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handlePasswordBlur}
              value={values.password}
              secureTextEntry
              onChange={clearError}
            />
            {errors.password && <Text>{errors.password}</Text>}
            {errorMessage && <Text>{errorMessage}</Text>}
            <Button onPress={() => handleSubmit()} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
  },
});
