import { supabase } from "../lib/supabase";
import { uploadImages } from "../utils/uploadImages";

export const submitCompletedWork = async ({
  proposalId,
  jobId,
  summary,
  images,
}: {
  proposalId: string;
  jobId: string;
  summary: string;
  images: string[];
}) => {
  let uploadedImages: string[] = [];

  if (images.length) {
    uploadedImages = await uploadImages(images);
  }

  const { error: proposalError } = await supabase
    .from("proposals")
    .update({
      completion_summary: summary,
      completion_images: uploadedImages,
    })
    .eq("id", proposalId);

  if (proposalError) throw proposalError;

  const { error: jobError } = await supabase
    .from("jobs")
    .update({
      status: "SUBMITTED",
    })
    .eq("id", jobId);

  if (jobError) throw jobError;
};
