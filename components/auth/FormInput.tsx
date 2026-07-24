import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;

  labelClassName?: string;
  inputContainerClassName?: string;
  containerClassName?: string;
}

const FormInput = ({
  label,
  error,
  labelClassName = "text-base font-medium text-gray-800 mb-2",
  inputContainerClassName = "rounded-2xl bg-gray-100 px-4 py-4",
  containerClassName = "mb-5",
  ...props
}: FormInputProps) => {
  return (
    <View className={containerClassName}>
      <Text className={labelClassName}>{label}</Text>

      <View
        className={inputContainerClassName}
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

      {error ? (
        <Text className="text-sm text-red-500 mt-1 pl-1">{error}</Text>
      ) : null}
    </View>
  );
};

export default FormInput;
