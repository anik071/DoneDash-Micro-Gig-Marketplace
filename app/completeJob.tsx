import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";

import LoadingScreen from "../components/common/LoadingScreen";

import CompleteJobHeader from "../components/completeJob/CompleteJobHeader";
import CompleteJobCard from "../components/completeJob/CompleteJobCard";
import CompletionSummaryInput from "../components/completeJob/CompletionSummaryInput";
import ProofImageUploader from "../components/completeJob/ProofImageUploader";
import CompletionTipsCard from "../components/completeJob/CompletionTipsCard";
import SubmitWorkButton from "../components/completeJob/SubmitWorkButton";

import { useJobDetails } from "../hooks/useJobDetails";
import { useCompleteJob } from "../hooks/useCompleteJob";
import ImageUploader from "../components/post/ImageUploader";

const CompleteJobScreen = () => {
  const { jobId, proposalId } = useLocalSearchParams<{
    jobId: string;
    proposalId: string;
  }>();

  const { job, loading } = useJobDetails(jobId);

  const {
    summary,
    setSummary,
    images,
    setImages,
    loading: submitting,
    submit,
  } = useCompleteJob(proposalId, jobId);

  if (loading || !job) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView className="flex-1 bg-slate-100">
        <CompleteJobHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 40,
          }}
        >
          <CompleteJobCard job={job} />

          <CompletionSummaryInput value={summary} onChangeText={setSummary} />

          <ImageUploader images={images} onChange={setImages} />
          <CompletionTipsCard />

          <SubmitWorkButton loading={submitting} onPress={submit} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CompleteJobScreen;
