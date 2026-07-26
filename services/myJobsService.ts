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

      proposals(
        id,
        status
      ),

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

  return data.map((job: any) => {
    const acceptedProposal = job.proposals?.find(
      (proposal: any) => proposal.status === "ACCEPTED",
    );

    return {
      ...job,
      proposal_count: job.proposals?.length ?? 0,
      proposal: acceptedProposal ?? null,
    };
  });
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

      proposals(
        id,
        status
      ),

      helper:profiles!jobs_accepted_helper_id_fkey(
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
    .in("status", ["IN PROGRESS", "SUBMITTED", "PAYMENT_SENT"])
    .order("updated_at", { ascending: false });

  if (error) throw error;

  return data.map((job: any) => {
    const acceptedProposal = job.proposals?.find(
      (proposal: any) =>
        proposal.status === "ACCEPTED" || proposal.status === "SUBMITTED",
    );

    return {
      ...job,
      proposal: acceptedProposal ?? null,
    };
  });
};
