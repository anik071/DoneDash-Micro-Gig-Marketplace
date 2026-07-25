import { supabase } from "../lib/supabase";

export const getHelperApplications = async () => {
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
      created_at,

      job:jobs!proposals_job_id_fkey(
        id,
        title,
        category,
        budget,
        deadline,
        location,
        status
      )
      `,
    )
    .eq("helper_id", user.id)
    .in("status", ["PENDING", "REJECTED", "WITHDRAWN"])
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
};
