import { supabase } from "../lib/supabase";

export const getProfile = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getActiveJobs = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("poster_id", user.id)
    .in("status", ["open", "assigned", "in_progress"])
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};
