import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  description: string;
};

const JobDescription = ({ description }: Props) => {
  return (
    <View className="mt-6 bg-white rounded-3xl p-5 border border-slate-200">
      <View className="flex-row items-center mb-4">
        <View className="w-9 h-9 rounded-full bg-teal-50 items-center justify-center">
          <Ionicons name="document-text-outline" size={20} color="#0f766e" />
        </View>

        <Text className="ml-3 text-lg font-bold text-slate-900">
          Description
        </Text>
      </View>

      <Text className="text-gray-600 text-[15px] leading-6">
        {description || "No description provided."}
      </Text>
    </View>
  );
};

export default JobDescription;
