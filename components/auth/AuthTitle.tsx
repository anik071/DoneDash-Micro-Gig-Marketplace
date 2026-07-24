import React from "react";
import { View, Text } from "react-native";

interface AuthTitleProps {
  title: string;
  subtitle: string;
}

const AuthTitle = ({ title, subtitle }: AuthTitleProps) => {
  return (
    <View className="items-center mb-6">
      <Text className="text-3xl font-bold text-black mb-2">{title}</Text>

      <Text className="text-base text-gray-500 text-center">{subtitle}</Text>
    </View>
  );
};

export default React.memo(AuthTitle);
