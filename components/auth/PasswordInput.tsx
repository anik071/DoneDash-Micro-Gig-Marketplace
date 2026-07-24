import React, { useState, ReactNode } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;

  label?: string;

  headerRight?: ReactNode;

  labelClassName?: string;

  inputContainerClassName?: string;

  containerClassName?: string;
}

const PasswordInput = ({
  value,
  onChangeText,
  error,

  label = "Password",

  headerRight,

  labelClassName = "text-base font-medium text-gray-800",

  inputContainerClassName = "rounded-2xl bg-gray-100 px-4 py-4",

  containerClassName = "mb-6",
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={containerClassName}>
      <View className="flex-row justify-between items-center mb-2">
        <Text className={labelClassName}>{label}</Text>

        {headerRight}
      </View>

      <View
        className={`${inputContainerClassName} flex-row items-center`}
        style={{
          borderWidth: error ? 1 : 0,
          borderColor: "#EF4444",
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
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

      {error ? (
        <Text className="text-sm text-red-500 mt-1 pl-1">{error}</Text>
      ) : null}
    </View>
  );
};

export default PasswordInput;
