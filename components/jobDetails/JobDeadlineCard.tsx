import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  deadline: string;
};

const JobDeadlineCard = ({ deadline }: Props) => {
  const getRemainingTime = () => {
    const now = new Date();
    const end = new Date(deadline);

    const diff = end.getTime() - now.getTime();

    if (diff <= 0) {
      return "Expired";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    if (days > 0) {
      return `${days} days ${hours} hours left`;
    }

    return `${hours} hours left`;
  };

  const remaining = getRemainingTime();

  const expired = remaining === "Expired";

  return (
    <View
      className={`mt-6 rounded-3xl p-5 border ${
        expired ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
      }`}
    >
      <View className="flex-row items-center">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center ${
            expired ? "bg-red-100" : "bg-amber-100"
          }`}
        >
          <Ionicons
            name={expired ? "close-circle-outline" : "alarm-outline"}
            size={22}
            color={expired ? "#dc2626" : "#d97706"}
          />
        </View>

        <View className="ml-3">
          <Text className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Deadline
          </Text>

          <Text
            className={`text-lg font-bold ${
              expired ? "text-red-600" : "text-amber-700"
            }`}
          >
            {remaining}
          </Text>
        </View>
      </View>

      <Text className="mt-4 text-sm text-gray-600">
        Due date: {new Date(deadline).toLocaleDateString()}
      </Text>
    </View>
  );
};

export default JobDeadlineCard;
