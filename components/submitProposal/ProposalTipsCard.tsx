import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const tips = [
  "Mention when you can start.",
  "Explain why you're a good fit.",
  "Keep your proposal short and clear.",
];

const ProposalTipsCard = () => {
  return (
    <View className="bg-emerald-50 rounded-2xl p-4 mb-6">
      <Text className="text-base font-bold text-emerald-800 mb-3">Tips</Text>

      {tips.map((tip) => (
        <View key={tip} className="flex-row items-start mb-2">
          <Ionicons name="checkmark-circle" size={18} color="#0f6e56" />

          <Text className="ml-2 text-slate-700 flex-1">{tip}</Text>
        </View>
      ))}
    </View>
  );
};

export default ProposalTipsCard;
