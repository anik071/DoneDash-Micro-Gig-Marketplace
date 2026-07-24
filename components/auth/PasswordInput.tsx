import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";

interface PasswordInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const PasswordInput = ({
  label = "Password",
  error,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-6">
      <Text className="text-base font-medium text-gray-800 mb-2">{label}</Text>

      <View
        className="rounded-2xl bg-gray-100 px-4 py-4 flex-row items-center"
        style={{
          borderWidth: error ? 1 : 0,
          borderColor: "#EF4444",
        }}
      >
        <TextInput
          {...props}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          className="flex-1 text-base text-gray-900"
          placeholder="••••••••"
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
          <Text style={{ fontSize: 20 }}>{showPassword ? "🙈" : "👁️"}</Text>
        </TouchableOpacity>
      </View>

      {!!error && (
        <Text className="text-sm font-medium text-red-500 mt-1 pl-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default React.memo(PasswordInput);
