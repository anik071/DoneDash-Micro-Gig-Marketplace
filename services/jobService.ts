import { supabase } from "../lib/supabase";

export const createJob = async (job: any) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first.");
  }

  const { data, error } = await supabase
    .from("jobs")
    .insert({
      poster_id: user.id,

      title: job.title.trim(),
      description: job.description.trim(),
      category: job.category,
      deadline: job.deadline,
      location: job.location.trim(),

      pay: job.pay.trim(),

      images: [],

      status: "OPEN", // <-- default status

      budget: Number(job.pay),

      poster_email: user.email,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateJobImages = async (jobId: string, images: string[]) => {
  const { error } = await supabase
    .from("jobs")
    .update({
      images,
    })
    .eq("id", jobId);

  if (error) throw error;
};
