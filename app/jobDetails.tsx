import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import LoadingScreen from "../components/common/LoadingScreen";
import JobHeroCard from "../components/jobDetails/JobHeroCard";
import JobDetailsHeader from "../components/jobDetails/JobDetailsHeader";
import { useJobDetails } from "../hooks/useJobDetails";

const JobDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  console.log("Job ID:", id);

  const router = useRouter();

  const { job, loading, error } = useJobDetails(id as string);

  if (loading) return <LoadingScreen />;

  if (error || !job) {
    return (
      <SafeAreaView className="flex-1 bg-slate-100">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-base text-gray-800 text-center">
            {error || "Job not found."}
          </Text>

          <TouchableOpacity onPress={() => router.back()} className="mt-4">
            <Text className="text-[#1A8FA0] font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const proposalSubmission = () => {
    router.push({
      pathname: "/submitProposals",
      params: { jobId: id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar barStyle="dark-content" backgroundColor="#EAF3F6" />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-6"
        showsVerticalScrollIndicator={false}
      >
        <JobDetailsHeader />

        <JobHeroCard job={job} />

        <View className="mt-5">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={proposalSubmission}
            className="bg-[#0f6e56] rounded-xl py-4 flex-row items-center justify-center"
          >
            <Text className="text-white text-base font-semibold">
              Apply now
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color="#FFF"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailScreen;
