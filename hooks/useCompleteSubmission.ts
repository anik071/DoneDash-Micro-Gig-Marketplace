import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import { completeJob } from "../services/completeSubmissionService";

export const useCompleteSubmission = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const approve = async ({
    jobId,
    helperId,
    budget,
  }: {
    jobId: string;
    helperId: string;
    budget: number;
  }) => {
    try {
      setLoading(true);

      await completeJob({
        jobId,
        helperId,
        budget,
      });

      Toast.show({
        type: "success",
        text1: "Payment Released",
        text2: "The job has been completed.",
      });

      router.replace({
        pathname: "/leaveReview",
        params: {
          helperId,
          jobId,
        },
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    approve,
    loading,
  };
};
