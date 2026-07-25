import { supabase } from "../lib/supabase";

export const completeJob = async ({
  jobId,
  helperId,
  budget,
}: {
  jobId: string;
  helperId: string;
  budget: number;
}) => {
  // 1. Complete the job
  const { error: jobError } = await supabase
    .from("jobs")
    .update({
      status: "COMPLETED",
    })
    .eq("id", jobId);

  if (jobError) throw jobError;

  // 2. Increment helper stats
  const { data: helper } = await supabase
    .from("profiles")
    .select("completed_jobs,total_earnings")
    .eq("id", helperId)
    .single();

  if (helper) {
    await supabase
      .from("profiles")
      .update({
        completed_jobs: (helper.completed_jobs ?? 0) + 1,
        total_earnings: Number(helper.total_earnings ?? 0) + Number(budget),
      })
      .eq("id", helperId);
  }

  // 3. Get poster id
  const { data: job } = await supabase
    .from("jobs")
    .select("poster_id")
    .eq("id", jobId)
    .single();

  if (job?.poster_id) {
    const { data: poster } = await supabase
      .from("profiles")
      .select("completed_jobs")
      .eq("id", job.poster_id)
      .single();

    await supabase
      .from("profiles")
      .update({
        completed_jobs: (poster?.completed_jobs ?? 0) + 1,
      })
      .eq("id", job.poster_id);
  }
};
