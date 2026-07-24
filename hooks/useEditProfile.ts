import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { EditProfileForm } from "../types/editProfile";

import {
  getEditableProfile,
  updateProfile,
} from "../services/editProfileService";
import Toast from "react-native-toast-message";

const EMPTY: EditProfileForm = {
  avatar: "",

  first_name: "",
  last_name: "",

  email: "",

  location: "",

  university: "",
  department: "",

  bio: "",

  whatsapp: "",
  telegram: "",
  imo: "",
};

export const useEditProfile = () => {
  const [form, setForm] = useState<EditProfileForm>(EMPTY);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    whatsapp: "",
  });

  const [globalError, setGlobalError] = useState("");
  const updateField = (key: keyof EditProfileForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const validate = () => {
    const newErrors = {
      first_name: "",
      last_name: "",
      whatsapp: "",
    };

    let valid = true;

    if (!form.first_name.trim()) {
      newErrors.first_name = "First name is required.";
      valid = false;
    }

    if (!form.last_name.trim()) {
      newErrors.last_name = "Last name is required.";
      valid = false;
    }

    if (!form.whatsapp.trim() && !form.telegram.trim() && !form.imo.trim()) {
      newErrors.whatsapp = "Add at least one communication method.";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const profile = await getEditableProfile();

      setForm({
        avatar: profile.avatar ?? "",

        first_name: profile.first_name ?? "",
        last_name: profile.last_name ?? "",

        email: profile.email ?? "",

        location: profile.location ?? "",

        university: profile.university ?? "",
        department: profile.department ?? "",

        bio: profile.bio ?? "",

        whatsapp: profile.whatsapp ?? "",
        telegram: profile.telegram ?? "",
        imo: profile.imo ?? "",
      });
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      setGlobalError("");
      setErrors({
        first_name: "",
        last_name: "",
        whatsapp: "",
      });

      const isValid = validate();

      if (!isValid) {
        if (!form.first_name.trim() || !form.last_name.trim()) {
          return {
            success: false,
            section: "personal",
          };
        }

        return {
          success: false,
          section: "communication",
        };
      }

      await updateProfile(form);
      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2: "Your changes have been saved.",
        position: "top",
      });

      return {
        success: true,
        section: null,
      };
    } catch (err: any) {
      setGlobalError(err.message);

      return {
        success: false,
        section: null,
      };
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    form,
    loading,
    saving,
    errors,
    globalError,
    updateField,

    saveProfile,
  };
};
