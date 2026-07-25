import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SubmittedJobHeader = () => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-5 py-4 bg-slate-100">
      <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={26} color="#111827" />
      </TouchableOpacity>

      <Text className="text-xl font-bold text-[#0f6e56]">
        Review Submission
      </Text>

      <View className="w-6" />
    </View>
  );
};

export default SubmittedJobHeader;
