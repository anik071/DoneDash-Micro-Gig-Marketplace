import { supabase } from "../lib/supabase";

export const getSubmittedWork = async (proposalId: string) => {
  const { data, error } = await supabase
    .from("proposals")
    .select(
      `
      id,
      status,
      completion_summary,
      completion_images,

      helper:profiles!proposals_helper_id_fkey(
        id,
        first_name,
        last_name,
        avatar,
        average_rating,
        completed_jobs,
        whatsapp,
        telegram,
        imo
      ),

      job:jobs(
        id,
        title,
        description,
        category,
        budget,
        deadline,
        location,
        status
      )
    `,
    )
    .eq("id", proposalId)
    .single();

  if (error) throw error;

  return data;
};

export const approveCompletedJob = async (
  proposalId: string,
  jobId: string,
) => {
  const { error: proposalError } = await supabase
    .from("proposals")
    .update({
      status: "COMPLETED",
    })
    .eq("id", proposalId);

  if (proposalError) throw proposalError;

  const { error: jobError } = await supabase
    .from("jobs")
    .update({
      status: "COMPLETED",
    })
    .eq("id", jobId);

  if (jobError) throw jobError;
};

export const requestRevision = async (jobId: string) => {
  const { error } = await supabase
    .from("jobs")
    .update({
      status: "IN PROGRESS",
    })
    .eq("id", jobId);

  if (error) throw error;
};
