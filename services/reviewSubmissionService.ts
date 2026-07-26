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
        id, first_name, last_name, avatar, average_rating, completed_jobs, whatsapp, telegram, imo
      ),

      job:jobs(
        id, title, description, category, budget, deadline, location, status, payment_proof
      )
      `,
    )
    .eq("id", proposalId)
    .single();

  if (error) throw error;
  return data;
};

export const sendPaymentProof = async (
  jobId: string,
  paymentProofUrl: string,
) => {
  const { error } = await supabase
    .from("jobs")
    .update({
      status: "PAYMENT_SENT",
      payment_proof: paymentProofUrl,
    })
    .eq("id", jobId);

  if (error) throw error;
};

export const requestRevision = async (jobId: string) => {
  const { error } = await supabase
    .from("jobs")
    .update({ status: "IN PROGRESS" })
    .eq("id", jobId);

  if (error) throw error;
};
