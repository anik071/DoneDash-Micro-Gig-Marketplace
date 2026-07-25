import { supabase } from "../lib/supabase";

export const getMyPostedJobs = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

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
      status,
      created_at,

      accepted_helper_id,

      proposals(id),

      helper:accepted_helper_id(
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
    `,
    )
    .eq("poster_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data.map((job) => ({
    ...job,
    proposal_count: job.proposals?.length ?? 0,
  }));
};

export const getPosterActiveJobs = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      title,
      budget,
      deadline,
      location,
      status,

      profiles!jobs_accepted_helper_id_fkey(
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
      `,
    )
    .eq("poster_id", user.id)
    .eq("status", "IN PROGRESS")
    .order("updated_at", { ascending: false });

  if (error) throw error;

  return data;
};
