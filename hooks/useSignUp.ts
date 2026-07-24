import { useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

import { SignUpData, SignUpErrors, Role } from "../types/auth";
import { validateSignUp } from "../utils/validation";
import { signUpUser } from "../services/authService";

const initialData: SignUpData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "poster",
};

export const useSignUp = () => {
  const [form, setForm] = useState<SignUpData>(initialData);

  const [errors, setErrors] = useState<SignUpErrors>({});

  const [globalError, setGlobalError] = useState("");

  const [loading, setLoading] = useState(false);

  const updateField = <K extends keyof SignUpData>(
    key: K,
    value: SignUpData[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key as keyof SignUpErrors]) {
      setErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }

    if (globalError) {
      setGlobalError("");
    }
  };

  const setRole = (role: Role) => {
    updateField("role", role);
  };

  const handleSignUp = async () => {
    setErrors({});
    setGlobalError("");

    const result = validateSignUp(form);

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    try {
      setLoading(true);

      await signUpUser(form);

      Toast.show({
        type: "success",
        text1: "Account Created Successfully! 👋",
        text2: "Please log in to continue.",
        position: "top",
        visibilityTime: 4000,
      });

      router.replace("/login");
    } catch (error) {
      setGlobalError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,

    errors,

    loading,

    globalError,

    updateField,

    setRole,

    handleSignUp,
  };
};
