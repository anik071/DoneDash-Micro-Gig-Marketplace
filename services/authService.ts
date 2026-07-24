import { supabase } from "../lib/supabase";
import { SignUpData } from "../types/auth";

export const signUpUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}: SignUpData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("Unable to create account.");
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    first_name: firstName,
    last_name: lastName,
    email,
    role,
  });

  if (profileError) {
    throw new Error(profileError.message);
  }

  return data.user;
};
