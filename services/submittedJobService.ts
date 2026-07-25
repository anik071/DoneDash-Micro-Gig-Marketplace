import { supabase } from "../lib/supabase";

export const getSubmittedJob = async (jobId: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      title,
      description,
      category,
      budget,
      deadline,
      location,
      status,

      proposals(
        id,
        status,
        completion_summary,
        completion_images,
        helper_id,

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
        )
      )
    `,
    )
    .eq("id", jobId)
    .single();

  if (error) throw error;

  const proposal = data.proposals.find((p: any) => p.status === "ACCEPTED");

  return {
    ...data,
    proposal,
  };
};

export const approveCompletedJob = async (jobId: string) => {
  const { error } = await supabase
    .from("jobs")
    .update({
      status: "COMPLETED",
    })
    .eq("id", jobId);

  if (error) throw error;
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
