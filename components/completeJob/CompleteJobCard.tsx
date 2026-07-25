import React from "react";
import { View, Text } from "react-native";

type Props = {
  job: any;
};

const CompleteJobCard = ({ job }: Props) => {
  return (
    <View className="bg-white rounded-3xl p-5">
      <View className="flex-row justify-between">
        <View className="bg-emerald-100 rounded-full px-3 py-1">
          <Text className="text-xs font-bold text-emerald-700 uppercase">
            {job.category}
          </Text>
        </View>

        <Text className="text-2xl font-bold text-emerald-700">
          ৳{job.budget}
        </Text>
      </View>

      <Text className="text-xl font-bold text-gray-900 mt-5">{job.title}</Text>

      <Text className="text-gray-500 mt-2">{job.location}</Text>
    </View>
  );
};

export default CompleteJobCard;
