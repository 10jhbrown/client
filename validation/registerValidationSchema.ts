import * as Yup from "yup";

export const registerForm1ValidationSchema = Yup.object({
  firstName: Yup.string().required("First name is required").max(30),
  lastName: Yup.string().required("Last name is required").max(50),
  username: Yup.string()
    .required(" Username is required")
    .lowercase()
    .max(9)
    .min(4),
});

export const registerForm2ValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

// export const registerForm3ValidationSchema = Yup.object({
//   emailCode: Yup.number().required("Verification code is required"),
// });
