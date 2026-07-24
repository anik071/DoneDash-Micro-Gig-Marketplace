import React from "react";
import { View, Text } from "react-native";

interface ErrorBannerProps {
  message?: string | null;
}

const ErrorBanner = ({ message }: ErrorBannerProps) => {
  if (!message) return null;

  return (
    <View className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
      <Text className="text-sm font-semibold text-red-800 text-center">
        ⚠️ Signup Failed: {message}
      </Text>
    </View>
  );
};

export default React.memo(ErrorBanner);
