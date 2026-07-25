import { useCallback, useEffect, useState } from "react";
import { getSubmittedJob } from "../services/submittedJobService";

export const useSubmittedJob = (jobId: string) => {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJob = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getSubmittedJob(jobId);

      setJob(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [fetchJob, jobId]);

  return {
    job,
    loading,
    error,
    refresh: fetchJob,
  };
};
