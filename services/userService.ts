import { supabase } from "../lib/supabase";

export const getCurrentUserProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("first_name,last_name,avatar")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
};
