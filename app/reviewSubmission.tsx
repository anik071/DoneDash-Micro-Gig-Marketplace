import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import LoadingScreen from "../components/common/LoadingScreen";

import SubmittedJobHeader from "../components/reviewSubmission/SubmittedJobHeader";
import SubmittedJobCard from "../components/reviewSubmission/SubmittedJobCard";
import SubmissionSummaryCard from "../components/reviewSubmission/SubmissionSummaryCard";
import ProofImagesCard from "../components/reviewSubmission/ProofImagesCard";
import SubmissionActions from "../components/reviewSubmission/SubmissionActions";

import { useSubmittedWork } from "../hooks/useSubmittedWork";
import {
  approveCompletedJob,
  requestRevision,
} from "../services/reviewSubmissionService";

const ReviewSubmissionScreen = () => {
  const router = useRouter();

  const { proposalId, jobId } = useLocalSearchParams<{
    proposalId: string;
    jobId: string;
  }>();

  const { submission, loading, error } = useSubmittedWork(proposalId);

  const [actionLoading, setActionLoading] = useState(false);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !submission) {
    return <LoadingScreen />;
  }

  const handleApprove = async () => {
    try {
      setActionLoading(true);

      await approveCompletedJob(proposalId, jobId);

      router.replace("/(tabs)/my-jobs");
    } catch (error) {
      console.log("Approve completion error:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRevision = async () => {
    try {
      setActionLoading(true);

      await requestRevision(jobId);

      router.replace("/(tabs)/my-jobs");
    } catch (error) {
      console.log("Revision request error:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView className="flex-1 bg-slate-100">
        <SubmittedJobHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 40,
          }}
        >
          <SubmittedJobCard job={submission.job} />

          <SubmissionSummaryCard summary={submission.completion_summary} />

          <ProofImagesCard images={submission.completion_images ?? []} />

          <SubmissionActions
            onApprove={handleApprove}
            onReview={() => {}}
            onReport={handleRevision}
            loading={actionLoading}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ReviewSubmissionScreen;
