import { useState } from "react";
import { Alert } from "react-native";

import { JobForm } from "../types/JobForm";

import { createJob, updateJobImages } from "../services/jobService";

import { uploadImages } from "../utils/uploadImages";

const EMPTY: JobForm = {
  title: "",
  description: "",
  category: null,
  deadline: null,
  location: "",
  pay: "",
  images: [],
};

export const usePostJob = () => {
  const [form, setForm] = useState<JobForm>(EMPTY);

  const [submitting, setSubmitting] = useState(false);

  const updateField = (key: keyof JobForm, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.title.trim())
      return Alert.alert("Missing", "Job title is required.");

    if (!form.description.trim())
      return Alert.alert("Missing", "Description is required.");

    if (!form.category) return Alert.alert("Missing", "Select a category.");

    if (!form.deadline) return Alert.alert("Missing", "Select a deadline.");

    if (!form.location.trim())
      return Alert.alert("Missing", "Location is required.");

    if (!form.pay.trim()) return Alert.alert("Missing", "Pay is required.");

    return true;
  };

  const submit = async () => {
    if (validate() !== true) return false;

    setSubmitting(true);

    try {
      const job = await createJob(form);

      if (form.images.length) {
        const urls = await uploadImages(form.images);

        await updateJobImages(job.id, urls);
      }

      Alert.alert("Success", "Job posted successfully.");

      setForm(EMPTY);

      return true;
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Something went wrong.");

      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    updateField,
    submit,
    submitting,
  };
};
