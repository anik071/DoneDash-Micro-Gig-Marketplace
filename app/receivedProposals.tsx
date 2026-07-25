import React from "react";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import LoadingScreen from "../components/common/LoadingScreen";
import JobProposalsScreen from "../components/my-jobs/JobProposalsScreen";

import { useJobProposals } from "../hooks/useJobProposals";
import {
  acceptProposal,
  hasCommunicationMethod,
} from "../services/proposalService";
import { Stack } from "expo-router";

const ReceivedProposals = () => {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();

  const router = useRouter();

  const { proposals, loading, error, refreshProposals } =
    useJobProposals(jobId);

  const handleAccept = async (proposal: any) => {
    try {
      const hasCommunication = await hasCommunicationMethod();

      if (!hasCommunication) {
        Toast.show({
          type: "info",
          text1: "Communication Required",
          text2: "Add a communication method before accepting a helper.",
          position: "bottom",
          autoHide: false,
          onPress: () => {
            Toast.hide();
            router.push("/profileEdit/edit");
          },
        });

        return;
      }

      await acceptProposal(proposal.id, proposal.job_id, proposal.helper_id);

      Toast.show({
        type: "success",
        text1: "Helper Accepted",
        text2: "The helper has been assigned to this job.",
      });

      router.replace("/(tabs)/my-jobs");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-slate-100">
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <JobProposalsScreen proposals={proposals} onAccept={handleAccept} />
    </>
  );
};

export default ReceivedProposals;
