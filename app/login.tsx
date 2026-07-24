import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useLogin } from "../hooks/useLogin";
import ErrorBanner from "../components/auth/ErrorBanner";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import PrimaryButton from "../components/auth/PrimaryButton";
import LoginHeader from "../components/auth/LoginHeader";
import LoginFooter from "../components/auth/loginFooter";

const Login = () => {
  const { form, errors, globalError, loading, updateField, handleLogin } =
    useLogin();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ backgroundColor: "#EAF4F6" }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <LoginHeader />
        <ErrorBanner message={globalError} />

        {/* Card */}
        <View
          className="mx-4 rounded-2xl bg-white px-6 py-8"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 10,
          }}
        >
          <FormInput
            label="Email"
            value={form.email}
            onChangeText={(text) => updateField("email", text)}
            placeholder="name@university.edu"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            labelClassName="text-xs font-semibold text-gray-500 mb-2 tracking-widest uppercase"
            inputContainerClassName="rounded-xl bg-gray-100 px-4 py-3"
            containerClassName="mb-5"
          />

          <PasswordInput
            value={form.password}
            onChangeText={(text) => updateField("password", text)}
            error={errors.password}
            labelClassName="text-xs font-semibold text-gray-500 tracking-widest uppercase"
            inputContainerClassName="rounded-xl bg-gray-100 px-4 py-3"
            containerClassName="mb-6"
            headerRight={
              <TouchableOpacity>
                <Text className="text-sm font-medium text-[#348293]">
                  Forgot password?
                </Text>
              </TouchableOpacity>
            }
          />

          <PrimaryButton
            title="Log in"
            loadingTitle="Signing in..."
            loading={loading}
            onPress={handleLogin}
          />

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />

            <Text className="mx-3 text-xs text-gray-400 uppercase tracking-widest">
              or continue with
            </Text>

            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-2xl border border-gray-200 bg-white py-3 gap-2">
              <Text style={{ fontSize: 16 }}>G</Text>
              <Text className="text-sm font-medium text-gray-700">Google</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-2xl border border-gray-200 bg-white py-3 gap-2">
              <Text style={{ fontSize: 14 }}>iOS</Text>
              <Text className="text-sm font-medium text-gray-700">Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        <LoginFooter />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
