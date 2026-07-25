import React, { useState } from "react";
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

type Props = {
  visible: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
};

const JobImageViewer = ({ visible, images, initialIndex, onClose }: Props) => {
  const [active, setActive] = useState(initialIndex);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black">
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-14 right-5 z-10"
        >
          <Ionicons name="close" size={34} color="white" />
        </TouchableOpacity>

        <FlatList
          data={images}
          horizontal
          pagingEnabled
          initialScrollIndex={initialIndex}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);

            setActive(index);
          }}
          renderItem={({ item }) => (
            <View
              style={{
                width,
                height,
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width,
                  height: height * 0.7,
                }}
                resizeMode="contain"
              />
            </View>
          )}
        />

        <View className="absolute bottom-12 w-full items-center">
          <View className="bg-black/60 px-4 py-2 rounded-full">
            <Text className="text-white font-semibold">
              {active + 1}/{images.length}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default JobImageViewer;
