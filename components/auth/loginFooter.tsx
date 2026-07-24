import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";

const LoginFooter = () => {
  return (
    <>
      {/* Sign up link */}
      <View className="items-center mt-8 px-6">
        <Text className="text-sm text-gray-500">
          New to the campus marketplace?{" "}
          <Text
            onPress={() => router.push("/signup")}
            className="text-[#2D7D8F] font-semibold"
          >
            Create an account
          </Text>
        </Text>
      </View>

      {/* Footer */}
      <View className="items-center mt-auto py-8">
        <Text className="text-xs text-gray-400 uppercase tracking-widest">
          DoneDash © 2026 • Editorial gigs for students
        </Text>
      </View>
    </>
  );
};

export default LoginFooter;
