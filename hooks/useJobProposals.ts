import { useEffect, useState } from "react";
import { getJobProposals } from "../services/proposalService";

export const useJobProposals = (jobId: string) => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProposals = async () => {
    try {
      setLoading(true);

      const data = await getJobProposals(jobId);

      setProposals(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchProposals();
  }, [jobId]);

  return {
    proposals,
    loading,
    error,
    refreshProposals: fetchProposals,
  };
};
