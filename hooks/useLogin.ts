import { useState } from "react";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import { LoginData, LoginErrors } from "../types/auth";
import { validateLogin } from "../utils/validation";
import { loginUser } from "../services/authService";

const initialForm: LoginData = {
  email: "",
  password: "",
};

export const useLogin = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = <K extends keyof LoginData>(
    key: K,
    value: LoginData[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }

    if (globalError) {
      setGlobalError("");
    }
  };

  const handleLogin = async () => {
    setErrors({});
    setGlobalError("");

    const result = validateLogin(form);

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    try {
      setLoading(true);

      await loginUser(form);

      Toast.show({
        type: "success",
        text1: "Welcome back! 👋",
        position: "top",
      });

      router.replace("/(tabs)/feed");
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
    handleLogin,
  };
};
