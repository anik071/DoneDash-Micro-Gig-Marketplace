import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface PrimaryButtonProps {
  title: string;
  loading?: boolean;
  loadingTitle?: string;
  disabled?: boolean;
  onPress: () => void;
}

const PrimaryButton = ({
  title,
  loadingTitle = "Loading...",
  loading = false,
  disabled = false,
  onPress,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      className="rounded-2xl py-4 items-center mb-4"
      style={{
        backgroundColor: "#2D7D8F",
      }}
    >
      <Text className="text-base font-semibold text-white">
        {loading ? loadingTitle : title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(PrimaryButton);
