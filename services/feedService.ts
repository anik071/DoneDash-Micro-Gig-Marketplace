import { supabase } from "../lib/supabase";

export const getFeedJobs = async () => {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      profiles!jobs_poster_id_fkey (
        first_name,
        last_name,
        avatar
      )
    `,
    )
    .eq("status", "OPEN")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};
