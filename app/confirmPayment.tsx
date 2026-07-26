import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import LoadingScreen from "../components/common/LoadingScreen";
import SubmittedJobHeader from "../components/reviewSubmission/SubmittedJobHeader";
import { useSubmittedWork } from "../hooks/useSubmittedWork";
import { confirmPaymentReceived } from "../services/helperJobsService";

const ConfirmPaymentScreen = () => {
  const router = useRouter();
  const { proposalId, jobId } = useLocalSearchParams<{
    proposalId: string;
    jobId: string;
  }>();
  const { submission, loading, error } = useSubmittedWork(proposalId);
  const [confirming, setConfirming] = useState(false);

  if (loading) return <LoadingScreen />;
  if (error || !submission) return <LoadingScreen />;

  const handleConfirm = async () => {
    try {
      setConfirming(true);
      await confirmPaymentReceived(jobId);
      router.replace("/(tabs)/my-jobs");
    } catch (err) {
      console.log("Confirm payment error:", err);
    } finally {
      setConfirming(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-slate-100">
        <SubmittedJobHeader />
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
          <View className="bg-white rounded-3xl p-5">
            <Text className="text-xl font-bold text-gray-900">
              {submission.job.title}
            </Text>
            <Text className="text-emerald-700 font-bold text-xl mt-2">
              ৳{submission.job.budget}
            </Text>
          </View>

          <View className="bg-white rounded-3xl p-5 mt-6">
            <Text className="text-lg font-bold text-[#0f6e56] mb-4">
              Payment Screenshot
            </Text>
            {submission.job.payment_proof ? (
              <Image
                source={{ uri: submission.job.payment_proof }}
                className="w-full h-72 rounded-2xl"
                resizeMode="contain"
              />
            ) : (
              <Text className="text-gray-400">No screenshot uploaded yet.</Text>
            )}
          </View>

          <TouchableOpacity
            disabled={confirming}
            activeOpacity={0.9}
            onPress={handleConfirm}
            className={`mt-8 rounded-2xl py-4 items-center ${confirming ? "bg-emerald-400" : "bg-emerald-700"}`}
          >
            {confirming ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-base">
                I Received the Payment
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ConfirmPaymentScreen;
