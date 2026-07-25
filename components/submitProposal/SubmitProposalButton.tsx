import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

type Props = {
  loading?: boolean;
  onPress: () => void;
};

const SubmitProposalButton = ({ loading, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={loading}
      onPress={onPress}
      className={`rounded-2xl py-4 items-center ${
        loading ? "bg-emerald-400" : "bg-emerald-700"
      }`}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-base font-semibold">
          Submit Proposal
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SubmitProposalButton;
