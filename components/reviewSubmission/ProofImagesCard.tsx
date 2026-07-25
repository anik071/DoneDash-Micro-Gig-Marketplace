import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

type Props = {
  images: string[];
};

const ProofImagesCard = ({ images }: Props) => {
  if (!images || images.length === 0) {
    return (
      <View className="bg-white rounded-3xl p-5 mt-6">
        <Text className="text-lg font-bold text-[#0f6e56] mb-3">
          Proof Images
        </Text>

        <Text className="text-gray-400">No images were uploaded.</Text>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-3xl p-5 mt-6">
      <Text className="text-lg font-bold text-[#0f6e56] mb-4">
        Proof Images
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            className="w-40 h-40 rounded-2xl mr-4"
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProofImagesCard;
