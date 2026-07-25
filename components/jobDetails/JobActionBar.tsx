import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  budget: number;
  hasApplied: boolean;
  onApply: () => void;
};

const JobActionBar = ({ budget, onApply, hasApplied }: Props) => {
  return (
    <View
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 pt-3 pb-7"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 20,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-xs text-gray-400">Budget</Text>

          <Text className="text-2xl font-bold text-emerald-700">
            ৳ {budget}
          </Text>
        </View>

        <TouchableOpacity
          disabled={hasApplied}
          onPress={onApply}
          activeOpacity={0.9}
          className={`rounded-2xl px-7 py-4 flex-row items-center ${
            hasApplied ? "bg-gray-400" : "bg-emerald-600"
          }`}
        >
          <Ionicons
            name={hasApplied ? "checkmark-circle" : "flash"}
            size={18}
            color="white"
          />

          <Text className="text-white font-bold text-base ml-2">
            {hasApplied ? "Proposal Sent" : "Apply Now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobActionBar;
