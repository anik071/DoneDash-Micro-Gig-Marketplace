import { supabase } from "../lib/supabase";

export const getJobProposals = async (jobId: string) => {
  const { data, error } = await supabase
    .from("proposals")
    .select(
      `
      id,
      job_id,
      helper_id,
      cover_letter,
      status,
      created_at,

      profiles!proposals_helper_id_fkey (
        id,
        first_name,
        last_name,
        avatar,
        average_rating,
        completed_jobs
      )
    `,
    )
    .eq("job_id", jobId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
};
export const hasCommunicationMethod = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found.");

  const { data, error } = await supabase
    .from("profiles")
    .select("whatsapp, telegram, imo")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return Boolean(
    data?.whatsapp?.trim() || data?.telegram?.trim() || data?.imo?.trim(),
  );
};

export const hasApplied = async (jobId: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found.");

  const { data, error } = await supabase
    .from("proposals")
    .select("id")
    .eq("job_id", jobId)
    .eq("helper_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return !!data;
};

export const submitProposal = async (jobId: string, coverLetter: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found.");

  const { error } = await supabase.from("proposals").insert({
    job_id: jobId,
    helper_id: user.id,
    cover_letter: coverLetter,
    status: "PENDING",
  });

  if (error) throw error;
};

export const acceptProposal = async (
  proposalId: string,
  jobId: string,
  helperId: string,
) => {
  // Accept selected proposal
  const { error: acceptError } = await supabase
    .from("proposals")
    .update({
      status: "ACCEPTED",
    })
    .eq("id", proposalId);

  if (acceptError) throw acceptError;

  // Reject every other proposal
  const { error: rejectError } = await supabase
    .from("proposals")
    .update({
      status: "REJECTED",
    })
    .eq("job_id", jobId)
    .neq("id", proposalId);

  if (rejectError) throw rejectError;

  // Update the job
  const { error: jobError } = await supabase
    .from("jobs")
    .update({
      status: "IN PROGRESS",
      accepted_helper_id: helperId,
    })
    .eq("id", jobId);

  if (jobError) throw jobError;
};
