import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface AuthHeaderProps {
  title: string;
  backRoute?: string;
}

const AuthHeader = ({ title, backRoute = "/login" }: AuthHeaderProps) => {
  return (
    <View
      className="flex-row items-center px-4 pt-12 pb-4"
      style={{ backgroundColor: "#EAF4F6" }}
    >
      <TouchableOpacity
        onPress={() => router.replace(backRoute)}
        className="pr-4"
      >
        <Text className="text-2xl text-black">←</Text>
      </TouchableOpacity>

      <Text className="text-lg font-semibold text-black">{title}</Text>
    </View>
  );
};

export default React.memo(AuthHeader);
