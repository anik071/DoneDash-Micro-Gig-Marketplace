import React from "react";
import { View, Text, TextInput } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const MAX_LENGTH = 500;

const ProposalTextInput = ({ value, onChangeText }: Props) => {
  return (
    <View className="mb-5">
      <Text className="text-lg font-semibold text-slate-900 mb-3">
        Your Proposal
      </Text>

      <View className="bg-white rounded-2xl p-4">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          multiline
          maxLength={MAX_LENGTH}
          textAlignVertical="top"
          placeholder="Tell the poster why you're the right person for this job..."
          className="min-h-[170px] text-[15px] text-slate-800"
        />

        <Text className="text-right text-xs text-slate-400 mt-2">
          {value.length}/{MAX_LENGTH}
        </Text>
      </View>
    </View>
  );
};

export default ProposalTextInput;
