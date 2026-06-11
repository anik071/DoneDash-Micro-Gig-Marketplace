import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"poster" | "helper" | null>("poster");
  const [loading, setLoading] = useState(false);

  // Validation & Server Error States
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Form Validation Logic
  const validateForm = () => {
    let valid = true;
    let newErrors: { fullName?: string; email?: string; password?: string } =
      {};

    // 1. Full Name Validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    // 2. Email Regex Validation (Enforces standard email formatting)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // 3. Password Length Validation
    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async () => {
    // Reset errors on fresh submission
    setErrors({});
    setGlobalError(null);

    if (!validateForm()) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setGlobalError(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        full_name: fullName,
        role: role,
      });

      if (profileError) {
        setGlobalError(profileError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    Toast.show({
      type: "success",
      text1: "Account Created Successfully! 👋",
      text2: "Please Log in to continue.",
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
    });
    router.replace("/login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ backgroundColor: "#EAF4F6" }}
    >
      {/* Header */}
      <View
        className="flex-row items-center px-4 pt-12 pb-4"
        style={{ backgroundColor: "#EAF4F6" }}
      >
        <TouchableOpacity
          onPress={() => router.replace("/login")}
          className="pr-4"
        >
          <Text className="text-2xl text-black">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-black">Create account</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View className="items-center mt-4 mb-6">
          <View className="w-20 h-20 rounded-2xl items-center justify-center">
            <Image
              source={require("../assets/images/donedash_logo.png")}
              style={{ width: 48, height: 48 }}
              resizeMode="contain"
            ></Image>
          </View>
        </View>

        {/* Title */}
        <View className="items-center mb-6">
          <Text className="text-3xl font-bold text-black mb-2">
            Welcome to DoneDash
          </Text>
          <Text className="text-base text-gray-500">
            Join your campus marketplace today.
          </Text>
        </View>

        {/* Global Error Banner */}
        {globalError && (
          <View className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <Text className="text-sm font-semibold text-red-800 text-center">
              ⚠️ Signup Failed: {globalError}
            </Text>
          </View>
        )}

        {/* Full name Input */}
        <Text className="text-base font-medium text-gray-800 mb-2">
          Full name
        </Text>
        <View
          className="rounded-2xl bg-gray-100 px-4 py-4"
          style={{
            borderWidth: errors.fullName ? 1 : 0,
            borderColor: "#EF4444",
          }}
        >
          <TextInput
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName)
                setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            placeholder="Alex Johnson"
            autoCapitalize="words"
            className="text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        {errors.fullName && (
          <Text className="text-sm font-medium text-red-500 mt-1 mb-3 pl-1">
            {errors.fullName}
          </Text>
        )}
        {!errors.fullName && <View className="mb-5" />}

        {/* University email Input */}
        <Text className="text-base font-medium text-gray-800 mb-2">
          University email
        </Text>
        <View
          className="rounded-2xl bg-gray-100 px-4 py-4"
          style={{ borderWidth: errors.email ? 1 : 0, borderColor: "#EF4444" }}
        >
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="alex@university.edu"
            keyboardType="email-address"
            autoCapitalize="none"
            className="text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        {errors.email && (
          <Text className="text-sm font-medium text-red-500 mt-1 mb-3 pl-1">
            {errors.email}
          </Text>
        )}
        {!errors.email && <View className="mb-5" />}

        {/* Password Input */}
        <Text className="text-base font-medium text-gray-800 mb-2">
          Password
        </Text>
        <View
          className="rounded-2xl bg-gray-100 px-4 py-4 flex-row items-center"
          style={{
            borderWidth: errors.password ? 1 : 0,
            borderColor: "#EF4444",
          }}
        >
          <TextInput
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            className="flex-1 text-base text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ fontSize: 20 }}>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text className="text-sm font-medium text-red-500 mt-1 mb-3 pl-1">
            {errors.password}
          </Text>
        )}
        {!errors.password && <View className="mb-6" />}

        {/* Role selector */}
        <Text className="text-base font-medium text-gray-800 mb-3">
          I want to...
        </Text>
        <View className="flex-row gap-4 mb-8">
          <TouchableOpacity
            onPress={() => setRole("poster")}
            className="flex-1 rounded-2xl items-center py-5 px-3"
            style={{
              backgroundColor: role === "poster" ? "#fff" : "#F3F4F6",
              borderWidth: role === "poster" ? 2 : 1,
              borderColor: role === "poster" ? "#2D7D8F" : "#E5E7EB",
            }}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center mb-3"
              style={{ backgroundColor: "#EAF4F6" }}
            >
              <Text style={{ fontSize: 22 }}>📢</Text>
            </View>
            <Text className="text-base font-bold text-gray-900 mb-1">
              Post jobs
            </Text>
            <Text className="text-xs text-gray-500 text-center">
              I need tasks done
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setRole("helper")}
            className="flex-1 rounded-2xl items-center py-5 px-3"
            style={{
              backgroundColor: role === "helper" ? "#fff" : "#F3F4F6",
              borderWidth: role === "helper" ? 2 : 1,
              borderColor: role === "helper" ? "#2D7D8F" : "#E5E7EB",
            }}
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center mb-3"
              style={{ backgroundColor: "#EAF4F6" }}
            >
              <Text style={{ fontSize: 22 }}>🤝</Text>
            </View>
            <Text className="text-base font-bold text-gray-900 mb-1">
              Help out
            </Text>
            <Text className="text-xs text-gray-500 text-center">
              I want to earn credits
            </Text>
          </TouchableOpacity>
        </View>

        {/* Create account button */}
        <TouchableOpacity
          onPress={handleSignUp}
          disabled={loading}
          className="rounded-2xl py-4 items-center mb-4"
          style={{ backgroundColor: "#2D7D8F" }}
        >
          <Text className="text-base font-semibold text-white">
            {loading ? "Creating account..." : "Create account"}
          </Text>
        </TouchableOpacity>

        {/* Terms */}
        <View className="items-center mb-6">
          <Text className="text-sm text-gray-500 text-center">
            By joining, you agree to our{" "}
            <Text className="text-[#2D7D8F] font-semibold">
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text className="text-[#2D7D8F] font-semibold">Privacy Policy</Text>
            .
          </Text>
        </View>

        {/* Back to login */}
        <View className="items-center">
          <Text className="text-sm text-gray-500">
            Already have an account?{" "}
            <Text
              onPress={() => router.push("/login")}
              className="text-[#2D7D8F] font-semibold"
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
