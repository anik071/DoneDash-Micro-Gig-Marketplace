import React from "react";
import { View, TextInput, Text } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const MAX = 700;

const CompletionSummaryInput = ({ value, onChangeText }: Props) => {
  return (
    <View className="mt-6">
      <Text className="text-lg font-bold text-[#0f6e56] mb-3">
        Completion Summary
      </Text>

      <View className="bg-white rounded-3xl p-4">
        <TextInput
          multiline
          value={value}
          onChangeText={onChangeText}
          maxLength={MAX}
          textAlignVertical="top"
          placeholder="Describe what you completed, any important notes, and anything the poster should know..."
          className="text-base text-gray-800 min-h-[180px]"
        />

        <Text className="text-right text-xs text-gray-400 mt-3">
          {value.length}/{MAX}
        </Text>
      </View>
    </View>
  );
};

export default CompletionSummaryInput;
