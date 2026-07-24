import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export interface ActiveJobCardProps {
  jobs: {
    id: string;
    title: string;
    budget: number;
    status: string;
    deadline: string;
  }[];
  onSeeAll?: () => void;
  onPostJobPress?: () => void;
}

const ActiveJobCard = ({
  jobs,
  onSeeAll,
  onPostJobPress,
}: ActiveJobCardProps) => {
  const handlePostJob = () => {
    if (onPostJobPress) {
      onPostJobPress();
    } else {
      router.push("/post"); // Adjust route name to match your Expo Router route
    }
  };

  return (
    <View className="mx-4 mb-3">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xl font-bold text-gray-900">Active Jobs</Text>
        {jobs.length > 0 && (
          <TouchableOpacity onPress={onSeeAll}>
            <Text className="text-sm font-medium text-teal-700">See all</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <View className="bg-gray-50 rounded-2xl p-6 items-center border border-dashed border-gray-300">
          <Text className="text-2xl mb-2">📋</Text>
          <Text className="text-base font-semibold text-gray-800 mb-1">
            No active jobs yet
          </Text>
          <Text className="text-xs text-gray-500 text-center mb-4">
            You haven't posted any tasks. Post a job to get helpers from your
            campus!
          </Text>
          <TouchableOpacity
            onPress={handlePostJob}
            className="bg-[#2D7D8F] px-5 py-2.5 rounded-xl flex-row items-center gap-1.5"
          >
            <Text className="text-white font-semibold text-sm">Post a Job</Text>
            <Text className="text-white text-base">＋</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Jobs List */
        jobs.map((job) => (
          <View
            key={job.id}
            className="bg-gray-50 rounded-2xl p-4 mb-2 flex-row items-center justify-between border border-gray-100"
          >
            {/* Left Column: Title & Status / Deadline */}
            <View className="flex-1 mr-3">
              <View className="flex-row items-center gap-2 mb-1">
                <View className="bg-teal-50 px-2 py-0.5 rounded-md">
                  <Text className="text-[10px] font-bold text-teal-700 uppercase">
                    {job.status}
                  </Text>
                </View>
                {job.deadline && (
                  <Text className="text-xs text-gray-400">
                    Due {job.deadline}
                  </Text>
                )}
              </View>
              <Text
                className="text-sm font-semibold text-gray-900"
                numberOfLines={1}
              >
                {job.title}
              </Text>
            </View>

            {/* Right Column: Budget in Taka */}
            <View className="items-end">
              <Text className="text-xs text-gray-400">Budget</Text>
              <Text className="text-base font-bold text-teal-700">
                ৳{job.budget}
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

export default ActiveJobCard;
