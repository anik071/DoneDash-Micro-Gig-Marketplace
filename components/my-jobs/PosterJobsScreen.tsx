import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useMyPostedJobs } from "../../hooks/useMyPostedJobs";
import PosterJobCard from "./PosterJobCard";
import ActivePosterJobCard from "./ActivePosterJobCard";

const PosterJobsScreen = () => {
  const router = useRouter();

  const { jobs = [] } = useMyPostedJobs();
  console.log("jobs from my poster jobs screen -->", jobs);
  const activeJobs = jobs.filter(
    (job) =>
      job.status === "IN PROGRESS" ||
      job.status === "SUBMITTED" ||
      job.status === "COMPLETED",
  );
  const openJobs = jobs.filter(
    (job) => job.status !== "IN PROGRESS" && job.status !== "COMPLETED",
  );

  const handleJobPress = (job: any) => {
    if (job.status === "OPEN") {
      router.push({
        pathname: "/receivedProposals",
        params: {
          jobId: job.id,
        },
      });

      return;
    }

    router.push({
      pathname: "/acceptedJobsScreen",
      params: {
        jobId: job.id,
      },
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    if (
      item.status === "IN PROGRESS" ||
      item.status === "SUBMITTED" ||
      item.status === "COMPLETED"
    ) {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleJobPress(item)}
        >
          <ActivePosterJobCard item={item} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleJobPress(item)}
      >
        <PosterJobCard item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="px-5 py-4">
        <Text className="text-2xl font-bold text-[#0f6e56]">My Jobs</Text>

        <Text className="text-gray-500 mt-1">
          {activeJobs.length} active • {openJobs.length} open
        </Text>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center pt-24">
            <Ionicons name="briefcase-outline" size={48} color="#d1d5db" />

            <Text className="text-gray-400 mt-3">No jobs yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default PosterJobsScreen;
