import React from "react";
import { View, Text } from "react-native";

const LoginHeader = () => {
  return (
    <>
      {/* Top brand name */}
      <View className="items-center pt-14 pb-6">
        <Text className="text-2xl font-bold text-[#348293]">DoneDash</Text>
      </View>

      {/* Title */}
      <View className="items-center px-6 mb-6">
        <Text className="text-4xl font-bold text-black mb-2 text-center">
          Welcome back
        </Text>

        <Text className="text-base text-gray-500">
          Sign in to manage your campus gigs
        </Text>
      </View>
    </>
  );
};

export default LoginHeader;
