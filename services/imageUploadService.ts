import * as ImagePicker from "expo-image-picker";

export const pickProfileImage = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new Error("Permission required to access photos.");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,

    allowsEditing: true,

    aspect: [1, 1],

    quality: 0.8,
  });

  if (result.canceled) {
    return null;
  }

  return result.assets[0].uri;
};
