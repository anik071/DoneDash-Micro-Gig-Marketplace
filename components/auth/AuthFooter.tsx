import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";

const AuthFooter = () => {
  return (
    <>
      <View className="items-center mb-6">
        <Text className="text-sm text-gray-500 text-center">
          By joining, you agree to our{" "}
          <Text className="text-[#2D7D8F] font-semibold">Terms of Service</Text>{" "}
          and{" "}
          <Text className="text-[#2D7D8F] font-semibold">Privacy Policy</Text>.
        </Text>
      </View>

      <View className="items-center">
        <Text className="text-sm text-gray-500">
          Already have an account?{" "}
          <Text
            onPress={() => router.push("/login")}
            className="text-[#2D7D8F] font-semibold"
          >
            Log in
          </Text>
        </Text>
      </View>
    </>
  );
};

export default React.memo(AuthFooter);
