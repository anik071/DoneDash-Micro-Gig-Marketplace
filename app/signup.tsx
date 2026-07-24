// app/signup.tsx

import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import AuthHeader from "../components/auth/AuthHeader";
import AuthLogo from "../components/auth/AuthLogo";
import AuthTitle from "../components/auth/AuthTitle";
import ErrorBanner from "../components/auth/ErrorBanner";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import RoleSelector from "../components/auth/RoleSelector";
import PrimaryButton from "../components/auth/PrimaryButton";
import AuthFooter from "../components/auth/AuthFooter";

import { useSignUp } from "../hooks/useSignUp";

const SignUp = () => {
  const {
    form,
    errors,
    loading,
    globalError,
    updateField,
    setRole,
    handleSignUp,
  } = useSignUp();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: "#EAF4F6" }}
    >
      <AuthHeader title="Create account" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 40,
        }}
      >
        <AuthLogo />

        <AuthTitle
          title="Welcome to DoneDash"
          subtitle="Join your campus marketplace today."
        />

        <ErrorBanner message={globalError} />

        <FormInput
          label="First Name"
          placeholder="John"
          value={form.firstName}
          error={errors.firstName}
          autoCapitalize="words"
          onChangeText={(text) => updateField("firstName", text)}
        />

        <FormInput
          label="Last Name"
          placeholder="Doe"
          value={form.lastName}
          error={errors.lastName}
          autoCapitalize="words"
          onChangeText={(text) => updateField("lastName", text)}
        />

        <FormInput
          label="University Email"
          placeholder="john@university.edu"
          value={form.email}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => updateField("email", text)}
        />

        <PasswordInput
          value={form.password}
          error={errors.password}
          onChangeText={(text) => updateField("password", text)}
        />

        <RoleSelector value={form.role} onChange={setRole} />

        <PrimaryButton
          title="Create account"
          loadingTitle="Creating account..."
          loading={loading}
          onPress={handleSignUp}
        />

        <AuthFooter />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
