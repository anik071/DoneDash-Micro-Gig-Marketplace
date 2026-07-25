import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getMyPostedJobs } from "../services/myJobsService";

export const useMyPostedJobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getMyPostedJobs();

      setJobs(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, [fetchJobs]),
  );

  return {
    jobs,
    loading,
    error,
    refreshJobs: fetchJobs,
  };
};
