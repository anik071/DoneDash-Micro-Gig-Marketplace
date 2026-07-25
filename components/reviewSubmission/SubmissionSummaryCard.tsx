import React from "react";
import { View, Text } from "react-native";

type Props = {
  summary: string;
  submittedAt?: string;
};

const SubmissionSummaryCard = ({ summary, submittedAt }: Props) => {
  return (
    <View className="bg-white rounded-3xl p-5 mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-[#0f6e56]">
          Completion Summary
        </Text>

        {submittedAt && (
          <Text className="text-xs text-gray-400">
            {new Date(submittedAt).toLocaleDateString()}
          </Text>
        )}
      </View>

      <Text className="text-gray-700 leading-7">
        {summary || "No summary was provided."}
      </Text>
    </View>
  );
};

export default SubmissionSummaryCard;
