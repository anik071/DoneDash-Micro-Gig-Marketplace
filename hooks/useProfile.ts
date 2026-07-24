import { useEffect, useState } from "react";

import { Profile } from "../types/profile";
import { getProfile, getActiveJobs } from "../services/profileService";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const data = await getProfile();
      const jobs = await getActiveJobs();

      setActiveJobs(jobs);
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    activeJobs,
    loading,
    error,
    refreshProfile: fetchProfile,
  };
};
