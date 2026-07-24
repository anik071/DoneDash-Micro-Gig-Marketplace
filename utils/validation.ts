import { SignUpData, SignUpErrors } from "../types/auth";
import { LoginData, LoginErrors } from "../types/auth";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// validate signup
export const validateSignUp = (
  data: SignUpData,
): {
  valid: boolean;
  errors: SignUpErrors;
} => {
  const errors: SignUpErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

// validate login

export const validateLogin = (
  data: LoginData,
): {
  valid: boolean;
  errors: LoginErrors;
} => {
  const errors: LoginErrors = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
