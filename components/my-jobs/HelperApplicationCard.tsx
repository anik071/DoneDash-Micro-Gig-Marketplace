import React from "react";
import { View, Text } from "react-native";

type Props = {
  item: any;
};

const STATUS = {
  PENDING: {
    label: "Pending",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  REJECTED: {
    label: "Rejected",
    bg: "bg-red-100",
    text: "text-red-700",
  },
  WITHDRAWN: {
    label: "Withdrawn",
    bg: "bg-slate-200",
    text: "text-slate-700",
  },
};

const CATEGORY = {
  Tutoring: "text-yellow-700 bg-yellow-100",
  Delivery: "text-orange-700 bg-orange-100",
  Digital: "text-indigo-700 bg-indigo-100",
  Physical: "text-emerald-700 bg-emerald-100",
  Academic: "text-blue-700 bg-blue-100",
};

const HelperApplicationCard = ({ item }: Props) => {
  const job = item.job;

  const status = STATUS[item.status as keyof typeof STATUS] || STATUS.PENDING;

  const category =
    CATEGORY[job?.category as keyof typeof CATEGORY] ||
    "text-slate-700 bg-slate-100";

  const deadline = job?.deadline
    ? new Date(job.deadline).toLocaleDateString()
    : "-";

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      {/* Category + Status */}
      <View className="flex-row justify-between items-center">
        <View className={`rounded-md px-2 py-1 ${category}`}>
          <Text className="text-[11px] font-bold uppercase">
            {job?.category}
          </Text>
        </View>

        <View className={`rounded-md px-2 py-1 ${status.bg}`}>
          <Text className={`text-[11px] font-bold uppercase ${status.text}`}>
            {status.label}
          </Text>
        </View>
      </View>

      {/* Job */}
      <Text className="text-lg font-semibold text-gray-900 mt-3">
        {job?.title}
      </Text>

      {/* Location */}
      <Text className="text-gray-500 mt-2">📍 {job?.location}</Text>

      {/* Bottom */}
      <View className="flex-row justify-between mt-5">
        <View>
          <Text className="text-xs uppercase text-gray-400">Budget</Text>

          <Text className="text-[#0f6e56] font-bold text-xl">
            ৳{job?.budget}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-xs uppercase text-gray-400">Deadline</Text>

          <Text className="font-medium text-gray-700">{deadline}</Text>
        </View>
      </View>
    </View>
  );
};

export default HelperApplicationCard;
