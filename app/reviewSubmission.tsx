import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import LoadingScreen from "../components/common/LoadingScreen";
import SubmittedJobHeader from "../components/reviewSubmission/SubmittedJobHeader";
import SubmittedJobCard from "../components/reviewSubmission/SubmittedJobCard";
import SubmissionSummaryCard from "../components/reviewSubmission/SubmissionSummaryCard";
import ProofImagesCard from "../components/reviewSubmission/ProofImagesCard";

import ProofImageUploader from "../components/completeJob/ProofImageUploader";

import { useSubmittedWork } from "../hooks/useSubmittedWork";
import {
  sendPaymentProof,
  requestRevision,
} from "../services/reviewSubmissionService";
import { uploadImages } from "../utils/uploadImages";
import ImageUploader from "../components/post/ImageUploader";
import { SubmissionActions } from "../components/reviewSubmission/SubmissionActions";

const ReviewSubmissionScreen = () => {
  const router = useRouter();
  const { proposalId, jobId } = useLocalSearchParams<{
    proposalId: string;
    jobId: string;
  }>();
  const { submission, loading, error } = useSubmittedWork(proposalId);

  const [paymentImage, setPaymentImage] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState(false);

  if (loading) return <LoadingScreen />;
  if (error || !submission) return <LoadingScreen />;

  const handleSendPayment = async () => {
    if (paymentImage.length === 0) return;

    try {
      setActionLoading(true);
      const uploaded = await uploadImages(paymentImage);
      await sendPaymentProof(jobId, uploaded[0]);
      router.replace("/(tabs)/my-jobs");
    } catch (err) {
      console.log("Send payment error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setActionLoading(true);
      await requestRevision(jobId);
      router.replace("/(tabs)/my-jobs");
    } catch (err) {
      console.log("Cancel/send-back error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-slate-100">
        <SubmittedJobHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        >
          <SubmittedJobCard job={submission.job} />
          <SubmissionSummaryCard summary={submission.completion_summary} />
          <ProofImagesCard images={submission.completion_images ?? []} />

          <ImageUploader images={paymentImage} onChange={setPaymentImage} />

          <SubmissionActions
            onApprove={handleSendPayment}
            onCancel={handleCancel}
            approveLabel="Send Payment Screenshot"
            loading={actionLoading}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ReviewSubmissionScreen;
