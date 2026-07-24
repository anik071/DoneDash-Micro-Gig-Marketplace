import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const FormInput = ({ label, error, ...props }: FormInputProps) => {
  return (
    <View className="mb-5">
      <Text className="text-base font-medium text-gray-800 mb-2">{label}</Text>

      <View
        className="rounded-2xl bg-gray-100 px-4 py-4"
        style={{
          borderWidth: error ? 1 : 0,
          borderColor: "#EF4444",
        }}
      >
        <TextInput
          {...props}
          className="text-base text-gray-900"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {!!error && (
        <Text className="text-sm font-medium text-red-500 mt-1 pl-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default React.memo(FormInput);
