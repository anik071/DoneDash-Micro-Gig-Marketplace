import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  job: any;
};

const Item = ({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
}) => (
  <View className="bg-slate-50 rounded-2xl p-4 flex-1 border border-slate-200">
    <Ionicons name={icon} size={22} color="#0f766e" />

    <Text className="text-xs text-gray-400 mt-3">{title}</Text>

    <Text className="text-base font-semibold text-gray-900 mt-1">{value}</Text>
  </View>
);

const JobInfoGrid = ({ job }: Props) => {
  return (
    <View className="mt-7">
      <Text className="text-xs tracking-[2px] font-bold text-gray-400 mb-4">
        INFORMATION
      </Text>

      <View className="flex-row gap-3">
        <Item icon="location-outline" title="Location" value={job.location} />

        <Item icon="cash-outline" title="Budget" value={`৳ ${job.budget}`} />
      </View>

      <View className="flex-row gap-3 mt-3">
        <Item
          icon="calendar-outline"
          title="Deadline"
          value={new Date(job.deadline).toLocaleDateString()}
        />

        <Item icon="briefcase-outline" title="Category" value={job.category} />
      </View>
    </View>
  );
};

export default JobInfoGrid;
