import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type Props = {
  loading: boolean;
  onPress: () => void;
};

const SubmitWorkButton = ({ loading, onPress }: Props) => {
  return (
    <TouchableOpacity
      disabled={loading}
      activeOpacity={0.9}
      onPress={onPress}
      className={`mt-8 rounded-2xl py-4 items-center ${
        loading ? "bg-emerald-400" : "bg-emerald-700"
      }`}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-bold text-base">
          Submit Completed Work
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitWorkButton;
