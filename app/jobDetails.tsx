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
import JobDetailsHeader from "../components/jobDetails/JobDetailsHeader";
import { useJobDetails } from "../hooks/useJobDetails";
import JobHeroCard from "../components/jobDetails/JobHeroCard";
import JobActionBar from "../components/jobDetails/JobActionBar";
import JobLocationCard from "../components/jobDetails/JobLocationCard";

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
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <JobDetailsHeader />

        <JobHeroCard job={job} />
        <JobLocationCard location={job.location} />
      </ScrollView>
      <JobActionBar budget={job.budget} onApply={proposalSubmission} />
    </SafeAreaView>
  );
};

export default JobDetailScreen;
