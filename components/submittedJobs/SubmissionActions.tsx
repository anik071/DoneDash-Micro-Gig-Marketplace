import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onApprove: () => void;
  onReview: () => void;
  onReport: () => void;
  loading?: boolean;
};

const SubmissionActions = ({
  onApprove,
  onReview,
  onReport,
  loading = false,
}: Props) => {
  return (
    <View className="mt-6">
      <TouchableOpacity
        disabled={loading}
        activeOpacity={0.9}
        onPress={onApprove}
        className={`rounded-2xl py-4 items-center ${
          loading ? "bg-emerald-400" : "bg-emerald-700"
        }`}
      >
        <Text className="text-white font-bold text-base">
          Release Payment & Complete Job
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onReview}
        className="bg-white rounded-2xl py-4 mt-4 flex-row justify-center items-center"
      >
        <Ionicons name="star" size={18} color="#F59E0B" />

        <Text className="font-semibold text-gray-800 ml-2">Leave Review</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onReport}
        className="bg-red-50 rounded-2xl py-4 mt-4 flex-row justify-center items-center"
      >
        <Ionicons name="warning" size={18} color="#DC2626" />

        <Text className="font-semibold text-red-600 ml-2">Report Issue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubmissionActions;
