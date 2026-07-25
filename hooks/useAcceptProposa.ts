import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import {
  acceptProposal as acceptProposalService,
  hasCommunicationMethod,
} from "../services/proposalService";

export const useAcceptProposal = (refresh: () => Promise<void> | void) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const acceptProposal = async (proposal: any) => {
    try {
      setLoading(true);

      const hasCommunication = await hasCommunicationMethod();

      if (!hasCommunication) {
        Toast.show({
          type: "info",
          text1: "Communication Required",
          text2: "Add a contact method in your profile first.",
          position: "bottom",
          onPress: () => router.push("/profileEdit/edit"),
        });

        return;
      }

      await acceptProposalService(
        proposal.id,
        proposal.job_id,
        proposal.helper_id,
      );

      Toast.show({
        type: "success",
        text1: "Helper Accepted",
        text2: "Job is now in progress.",
      });

      await refresh();
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Couldn't accept helper",
        text2: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    acceptProposal,
  };
};
