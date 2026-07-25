import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
};

const MAX_IMAGES = 5;

const ProofImageUploader = ({ images, onChange }: Props) => {
  const pickImages = async () => {
    if (images.length >= MAX_IMAGES) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: MAX_IMAGES - images.length,
    });

    if (result.canceled) return;

    onChange([...images, ...result.assets.map((asset) => asset.uri)]);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <View className="mt-6">
      <Text className="text-lg font-bold text-[#0f6e56] mb-3">
        Proof Images (Optional)
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={pickImages}
        className="bg-white rounded-3xl h-36 border-2 border-dashed border-emerald-300 items-center justify-center"
      >
        <Ionicons name="cloud-upload-outline" size={42} color="#059669" />

        <Text className="font-semibold text-gray-700 mt-3">
          Upload Completion Photos
        </Text>

        <Text className="text-gray-400 text-sm mt-1">
          {images.length}/{MAX_IMAGES} selected
        </Text>
      </TouchableOpacity>

      {images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {images.map((uri, index) => (
            <View key={index} className="mr-3">
              <Image source={{ uri }} className="w-24 h-24 rounded-2xl" />

              <TouchableOpacity
                onPress={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
              >
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ProofImageUploader;
