import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import LoadingScreen from "../common/LoadingScreen";
import HelperJobCard from "./HelperJobCard";

import { useHelperJobs } from "../../hooks/useHelperJobs";

const HelperJobsScreen = () => {
  const { jobs, loading, error } = useHelperJobs();

  const router = useRouter();

  const handleComplete = (proposal: any) => {
    router.push({
      pathname: "/completeJob",
      params: {
        proposalId: proposal.id,
        jobId: proposal.job.id,
      },
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-slate-100 justify-center items-center px-6">
        <Text className="text-base text-red-500 text-center">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="px-5 pt-5 pb-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold text-[#0f6e56]">My Jobs</Text>

            <Text className="text-gray-500 mt-1">
              Track your proposals and accepted jobs
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/helperApplications")}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2"
          >
            <Text className="text-[#0f6e56] font-semibold">Applications</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HelperJobCard item={item} onComplete={handleComplete} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
        ListEmptyComponent={
          <View className="items-center justify-center mt-28">
            <Text className="text-6xl mb-5">📭</Text>

            <Text className="text-xl font-bold text-gray-800">
              No Active Jobs
            </Text>

            <Text className="text-gray-500 text-center mt-3 px-10 leading-6">
              Accepted jobs will appear here.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/helperApplications")}
              className="mt-8 bg-[#0f6e56] rounded-xl px-6 py-3"
            >
              <Text className="text-white font-semibold">
                View Applications
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default HelperJobsScreen;
