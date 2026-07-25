import { useCallback, useEffect, useState } from "react";
import { getJobDetails } from "../services/jobDetailsService";

export const useJobDetails = (jobId: string) => {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJob = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getJobDetails(jobId);

      setJob(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [fetchJob]);

  return {
    job,
    loading,
    error,
    refreshJob: fetchJob,
  };
};
