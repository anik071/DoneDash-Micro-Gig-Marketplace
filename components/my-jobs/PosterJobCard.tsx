import React from "react";
import { View, Text } from "react-native";

const STATUS = {
  OPEN: {
    label: "Open",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  IN_PROGRESS: {
    label: "In Progress",
    bg: "bg-cyan-100",
    text: "text-cyan-700",
  },
  SUBMITTED: {
    label: "Work Submitted",
    bg: "bg-indigo-100",
    text: "text-indigo-700",
  },
  PAYMENT_PENDING: {
    label: "Payment Pending",
    bg: "bg-pink-100",
    text: "text-pink-700",
  },
  COMPLETED: {
    label: "Completed",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
};

const CATEGORY = {
  Tutoring: "text-yellow-700 bg-yellow-100",
  Delivery: "text-orange-700 bg-orange-100",
  Digital: "text-indigo-700 bg-indigo-100",
  Physical: "text-emerald-700 bg-emerald-100",
  Academic: "text-blue-700 bg-blue-100",
};

type Props = {
  item: any;
};

const PosterJobCard = ({ item }: Props) => {
  const status = STATUS[item.status as keyof typeof STATUS] || STATUS.OPEN;

  const category =
    CATEGORY[item.category as keyof typeof CATEGORY] ||
    "text-slate-700 bg-slate-100";

  const deadline = item.deadline
    ? new Date(item.deadline).toLocaleDateString()
    : "-";
  console.log("deadline from poster job card->", item);
  const proposalCount = item.proposal_count ?? 0;

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row justify-between items-center">
        <View className={`rounded-md px-2 py-1 ${category}`}>
          <Text className="text-[11px] font-bold uppercase">
            {item.category}
          </Text>
        </View>

        <View className={`rounded-md px-2 py-1 ${status.bg}`}>
          <Text className={`text-[11px] font-bold uppercase ${status.text}`}>
            {status.label}
          </Text>
        </View>
      </View>

      <Text className="text-gray-900 text-lg font-semibold mt-3">
        {item.title}
      </Text>

      <Text numberOfLines={2} className="text-gray-500 text-sm mt-1">
        {item.description}
      </Text>

      <View className="flex-row justify-between mt-5">
        <View>
          <Text className="text-gray-400 text-xs uppercase">Budget</Text>

          <Text className="text-[#0f6e56] font-bold text-xl">
            ৳{item.budget}
          </Text>
        </View>

        <View className="items-end">
          <Text className="text-gray-400 text-xs uppercase">Deadline</Text>

          <Text className="text-gray-700 font-medium">{deadline}</Text>
        </View>
      </View>

      <View className="border-t border-slate-100 mt-5 pt-4 flex-row justify-between items-center">
        <View>
          <Text className="text-xs text-gray-400 uppercase">Proposals</Text>

          <Text className="text-base font-bold text-gray-900">
            {proposalCount}
          </Text>
        </View>

        <View className="bg-[#0f6e56]/10 rounded-full px-4 py-2">
          <Text className="text-[#0f6e56] font-semibold">View Proposals →</Text>
        </View>
      </View>
    </View>
  );
};

export default PosterJobCard;
