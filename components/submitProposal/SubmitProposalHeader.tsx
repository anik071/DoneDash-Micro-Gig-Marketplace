import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SubmitProposalHeader = () => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-5 py-4 bg-slate-100 border-b border-slate-200">
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.7}
        className="flex-row items-center"
      >
        <Ionicons name="chevron-back" size={22} color="#0f6e56" />
        <Text className="text-base font-medium text-[#0f6e56]">Back</Text>
      </TouchableOpacity>

      <Text className="text-xl font-bold text-slate-900">Submit Proposal</Text>

      <View className="w-14" />
    </View>
  );
};

export default SubmitProposalHeader;
