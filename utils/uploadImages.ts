import { File } from "expo-file-system";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

const MAX_BYTE_SIZE = 33554432; // 32 MB

export const uploadImages = async (uris: string[]) => {
  const apiKey = process.env.EXPO_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    console.error("ImgBB API key is missing from environment variables.");
    return [];
  }

  const uploadTasks = uris.map(async (originalUri) => {
    let uri = originalUri;

    try {
      const fileInstance = new File(uri);
      const fileInfo = fileInstance.info();

      if (!fileInfo.exists) return null;

      // Compress large images
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

      const fileExt = uri.split(".").pop() || "jpg";
      const formData = new FormData();

      formData.append("image", {
        uri,
        name: `job_image.${fileExt}`,
        type: `image/${fileExt === "jpg" ? "jpeg" : fileExt}`,
      } as any);

      // TypeScript is now guaranteed to receive a string here
      formData.append("key", apiKey);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          // Do not manually specify Content-Type for FormData in React Native
        },
      });

      const result = await response.json();

      if (result.success) {
        return result.data.url as string;
      }
    } catch (err) {
      console.error("Failed to upload image:", err);
    }

    return null;
  });

  const results = await Promise.all(uploadTasks);
  return results.filter((url): url is string => url !== null);
};
