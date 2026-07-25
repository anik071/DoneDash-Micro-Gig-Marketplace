import { useEffect, useState } from "react";
import { getSubmittedWork } from "../services/reviewSubmissionService";

export const useSubmittedWork = (proposalId: string) => {
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubmission = async () => {
    try {
      setLoading(true);

      const data = await getSubmittedWork(proposalId);

      setSubmission(data);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load submitted work");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (proposalId) {
      fetchSubmission();
    }
  }, [proposalId]);

  return {
    submission,
    loading,
    error,
    refreshSubmission: fetchSubmission,
  };
};
