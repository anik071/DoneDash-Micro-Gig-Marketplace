import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  job: any;
};

const CATEGORY_COLOR: Record<string, string> = {
  Tutoring: "#854f0b",
  Delivery: "#993c1d",
  Digital: "#534ab7",
  Physical: "#0f6e56",
  Academic: "#185fa5",
};

const ProposalJobCard = ({ job }: Props) => {
  if (!job) return null;

  const badgeColor = CATEGORY_COLOR[job.category] ?? "#0f6e56";

  return (
    <View className="bg-white rounded-2xl p-4 mb-5">
      <View className="flex-row justify-between items-center mb-3">
        <View
          style={{ backgroundColor: `${badgeColor}18` }}
          className="px-3 py-1 rounded-full"
        >
          <Text
            style={{ color: badgeColor }}
            className="text-[11px] font-bold uppercase"
          >
            {job.category}
          </Text>
        </View>

        <Text className="text-xl font-bold text-emerald-700">
          ৳{job.budget}
        </Text>
      </View>

      <Text className="text-lg font-bold text-slate-900 mb-4">{job.title}</Text>

      <View className="gap-3">
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={17} color="#64748b" />
          <Text className="ml-2 text-slate-600 flex-1">
            {job.location || "Location not specified"}
          </Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={17} color="#64748b" />
          <Text className="ml-2 text-slate-600">
            {job.deadline || "Flexible"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProposalJobCard;
