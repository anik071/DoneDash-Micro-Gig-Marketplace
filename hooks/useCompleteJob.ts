import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import { submitCompletedWork } from "../services/completeJobService";

export const useCompleteJob = (proposalId: string, jobId: string) => {
  const router = useRouter();

  const [summary, setSummary] = useState("");

  const [images, setImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!summary.trim()) {
      Toast.show({
        type: "error",
        text1: "Summary Required",
        text2: "Please describe the completed work.",
      });

      return;
    }

    try {
      setLoading(true);

      await submitCompletedWork({
        proposalId,
        jobId,
        summary,
        images,
      });

      Toast.show({
        type: "success",
        text1: "Work Submitted",
        text2: "Waiting for the poster to review it.",
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
    summary,
    setSummary,
    images,
    setImages,
    loading,
    submit,
  };
};
