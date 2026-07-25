import { supabase } from "../lib/supabase";

export const getJobDetails = async (jobId: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,

      poster:profiles!jobs_poster_id_fkey(
        id,
        first_name,
        last_name,
        avatar,
        university,
        department,
        average_rating,
        completed_jobs
      ),

      accepted_helper:profiles!jobs_accepted_helper_id_fkey(
        id,
        first_name,
        last_name,
        avatar,
        university,
        department,
        average_rating,
        completed_jobs,
        whatsapp,
        telegram,
        imo
      )
      `,
    )
    .eq("id", jobId)
    .single();

  if (error) {
    console.log("Job details error:", error);
    throw error;
  }

  console.log("Job details:", data);

  return data;
};
