import { useCallback, useEffect, useState } from "react";
import { getFeedJobs } from "../services/feedService";
import { useFocusEffect } from "expo-router";

export const useFeed = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getFeedJobs();

      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchJobs();
    }, []),
  );
  return {
    jobs,
    loading,
    error,
    refreshFeed: fetchJobs,
  };
};
