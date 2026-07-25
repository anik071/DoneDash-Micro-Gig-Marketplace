import { supabase } from "../lib/supabase";

export const getJobProposals = async (jobId: string) => {
  const { data, error } = await supabase
    .from("proposals")
    .select(
      `
      id,
      message,
      proposed_amount,
      status,
      created_at,

      profiles!proposals_helper_id_fkey(
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
