import { supabase } from "../lib/supabase";
import { EditProfileForm } from "../types/editProfile";

export const getEditableProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
};

export const updateProfile = async (form: EditProfileForm) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found.");
  }

  if (!form.whatsapp.trim() && !form.telegram.trim() && !form.imo.trim()) {
    throw new Error("Please add at least one communication method.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      avatar: form.avatar,

      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),

      location: form.location.trim(),

      university: form.university.trim(),
      department: form.department.trim(),

      bio: form.bio.trim(),

      whatsapp: form.whatsapp.trim(),
      telegram: form.telegram.trim(),
      imo: form.imo.trim(),

      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) throw error;
};
