import React, { useRef, useState } from "react";
import { Text } from "react-native";
import {
  View,
  Image,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

const { width } = Dimensions.get("window");

interface Props {
  images: string[];
}

const IMAGE_WIDTH = width - 72;

const JobGallery = ({ images }: Props) => {
  const [active, setActive] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / IMAGE_WIDTH);

    setActive(index);
  };

  if (!images.length) return null;

  return (
    <View style={{ marginBottom: 20 }}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onMomentumScrollEnd={onScroll}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{
              width: IMAGE_WIDTH,
              height: 220,
              borderRadius: 18,
              marginRight: 12,
            }}
            resizeMode="cover"
          />
        )}
      />

      {/* Counter */}

      <View
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          backgroundColor: "rgba(0,0,0,.45)",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
            }}
          >
            {active + 1}/{images.length}
          </Text>
        </View>
      </View>

      {/* Dots */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 12,
        }}
      >
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              width: active === index ? 18 : 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: active === index ? "#0f6e56" : "#d1d5db",
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default JobGallery;
