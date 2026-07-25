import { useCallback, useEffect, useState } from "react";
import { getHelperApplications } from "../services/helperApplicationsService";

export const useHelperApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getHelperApplications();

      setApplications(data);
      setError("");
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    loading,
    error,
    refreshApplications: fetchApplications,
  };
};
