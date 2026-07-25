import { supabase } from "../lib/supabase";

export const getHelperJobs = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("proposals")
    .select(
      `
      id,
      status,
      cover_letter,
      completion_summary,
      completion_images,
      created_at,

      job:jobs!proposals_job_id_fkey(
        id,
        title,
        category,
        budget,
        deadline,
        status,
        location,

        poster:profiles!jobs_poster_id_fkey(
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
    .eq("helper_id", user.id)
    .eq("status", "ACCEPTED")
    .in("job.status", ["IN PROGRESS", "SUBMITTED"])
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
};
