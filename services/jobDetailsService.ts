import { supabase } from "../lib/supabase";

export const getJobDetails = async (jobId: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      profiles!jobs_poster_id_fkey (
        id,
        first_name,
        last_name,
        avatar,
        university,
        department,
        average_rating,
        completed_jobs
      )
    `,
    )
    .eq("id", jobId)
    .single();
  console.log("Supabase data:", data);
  console.log("Supabase error:", error);
  if (error) throw error;

  return data;
};
