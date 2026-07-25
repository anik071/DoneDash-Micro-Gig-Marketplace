import { supabase } from "../lib/supabase";

export const getJobDetails = async (jobId: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      profiles!jobs_poster_id_fkey(
        id,
        first_name,
        last_name,
        avatar,
        university,
        department,
        average_rating,
        completed_jobs
      ),
      proposals(
        id,
        helper_id,
        status
      )
    `,
    )
    .eq("id", jobId)
    .single();

  if (error) throw error;

  const myProposal = data.proposals?.find(
    (proposal: any) => proposal.helper_id === user?.id,
  );

  return {
    ...data,
    hasApplied: !!myProposal,
    myProposal,
  };
};
