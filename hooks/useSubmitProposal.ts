import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import {
  hasApplied,
  hasCommunicationMethod,
  submitProposal,
} from "../services/proposalService";

export const useSubmitProposal = (jobId: string) => {
  const router = useRouter();

  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    console.log("i submited");
    if (!proposal.trim()) {
      Toast.show({
        type: "error",
        text1: "Proposal Required",
        text2: "Please write a proposal first.",
      });

      return;
    }

    try {
      setLoading(true);

      const hasCommunication = await hasCommunicationMethod();

      if (!hasCommunication) {
        Alert.alert(
          "Communication Required",
          "Please add at least one communication method before applying.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Edit Profile",
              onPress: () => router.push("/profileEdit/edit"),
            },
          ],
        );

        return;
      }

      const alreadyApplied = await hasApplied(jobId);

      if (alreadyApplied) {
        Toast.show({
          type: "info",
          text1: "Already Applied",
          text2: "You have already applied for this job.",
        });

        return;
      }

      await submitProposal(jobId, proposal);

      Toast.show({
        type: "success",
        text1: "Proposal Submitted",
        text2: "Your proposal has been sent.",
      });

      router.back();
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Submission Failed",
        text2: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    proposal,
    setProposal,
    loading,
    submit,
  };
};
