import React from "react";

import FormField from "./FormField";
import ImageUploader from "./ImageUploader";

interface Props {
  images: string[];
  updateField: (key: any, value: any) => void;
}

const JobImages = ({ images, updateField }: Props) => {
  return (
    <FormField label="UPLOAD IMAGES">
      <ImageUploader
        images={images}
        onChange={(imgs) => updateField("images", imgs)}
      />
    </FormField>
  );
};

export default JobImages;
