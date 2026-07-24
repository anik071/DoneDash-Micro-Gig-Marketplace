import { File } from "expo-file-system";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

const MAX_BYTE_SIZE = 33554432;

export const uploadImages = async (uris: string[]) => {
  const urls: string[] = [];

  for (let uri of uris) {
    try {
      const fileInstance = new File(uri);
      const fileInfo = fileInstance.info();

      if (!fileInfo.exists) continue;

      if ((fileInfo.size ?? 0) > MAX_BYTE_SIZE) {
        const context = ImageManipulator.manipulate(uri);

        context.resize({ width: 2000 });

        const image = await context.renderAsync();

        const compressed = await image.saveAsync({
          compress: 0.7,
          format: SaveFormat.JPEG,
        });

        uri = compressed.uri;
      }

      const formData = new FormData();

      const fileExt = uri.split(".").pop();

      formData.append("image", {
        uri,
        name: `job_image.${fileExt}`,
        type: `image/${fileExt === "jpg" ? "jpeg" : fileExt}`,
      } as any);

      formData.append("key", process.env.IMGBB_API_KEY);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();

      if (result.success) {
        urls.push(result.data.url);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return urls;
};
