import React from "react";
import { View, Text } from "react-native";

const CompletionTipsCard = () => {
  return (
    <View className="bg-emerald-50 rounded-3xl p-5 mt-6">
      <Text className="text-lg font-bold text-emerald-700 mb-3">
        Tips for Faster Approval
      </Text>

      <Text className="text-gray-700 leading-7">
        • Explain exactly what you completed.
      </Text>

      <Text className="text-gray-700 leading-7">
        • Upload photos if the job involved physical work.
      </Text>

      <Text className="text-gray-700 leading-7">
        • Mention any important details the poster should know.
      </Text>

      <Text className="text-gray-700 leading-7">
        • Keep your summary short but informative.
      </Text>
    </View>
  );
};

export default CompletionTipsCard;
