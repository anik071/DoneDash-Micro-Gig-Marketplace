import { useCallback, useEffect, useState } from "react";
import { getHelperJobs } from "../services/helperJobsService";

export const useHelperJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getHelperJobs();

      setJobs(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    refreshJobs: fetchJobs,
  };
};
