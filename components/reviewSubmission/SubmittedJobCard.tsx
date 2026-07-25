import React from "react";
import { View, Text, Image } from "react-native";

type Props = {
  job: any;
};

const SubmittedJobCard = ({ job }: Props) => {
  const helper = job.proposal?.helper;

  return (
    <View className="bg-white rounded-3xl p-5">
      <View className="flex-row justify-between items-start">
        <View className="bg-indigo-100 rounded-full px-3 py-1">
          <Text className="text-xs font-bold text-indigo-700 uppercase">
            Submitted
          </Text>
        </View>

        <Text className="text-2xl font-bold text-[#0f6e56]">৳{job.budget}</Text>
      </View>

      <Text className="text-xl font-bold text-gray-900 mt-5">{job.title}</Text>

      <Text className="text-gray-500 mt-1">{job.location}</Text>

      <View className="h-px bg-slate-100 my-5" />

      <View className="flex-row items-center">
        <Image
          source={{
            uri: helper?.avatar || "https://placehold.co/100x100",
          }}
          className="w-14 h-14 rounded-full"
        />

        <View className="ml-3 flex-1">
          <Text className="font-bold text-base text-gray-900">
            {helper?.first_name} {helper?.last_name}
          </Text>

          <Text className="text-gray-500">
            ⭐ {helper?.average_rating ?? 0} • {helper?.completed_jobs ?? 0}{" "}
            jobs
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SubmittedJobCard;
