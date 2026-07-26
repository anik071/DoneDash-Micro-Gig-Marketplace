import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onApprove: () => void;
  onCancel: () => void;
  approveLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
};

export const SubmissionActions = ({
  onApprove,
  onCancel,
  approveLabel = "Release Payment & Complete Job",
  cancelLabel = "Send Back to Helper",
  loading = false,
}: Props) => {
  return (
    <View className="mt-6">
      <TouchableOpacity
        disabled={loading}
        activeOpacity={0.9}
        onPress={onApprove}
        className={`rounded-2xl py-4 items-center ${loading ? "bg-emerald-400" : "bg-emerald-700"}`}
      >
        <Text className="text-white font-bold text-base">{approveLabel}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={loading}
        activeOpacity={0.9}
        onPress={onCancel}
        className="bg-red-50 rounded-2xl py-4 mt-4 mb-10 flex-row justify-center items-center"
      >
        <Ionicons name="close-circle" size={18} color="#DC2626" />
        <Text className="font-semibold text-red-600 ml-2">{cancelLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};
