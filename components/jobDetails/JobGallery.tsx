import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

import JobImageViewer from "./JobImageViewer";

const { width } = Dimensions.get("window");

type Props = {
  images: string[];
};

const JobGallery = ({ images }: Props) => {
  const [viewer, setViewer] = useState(false);
  const [selected, setSelected] = useState(0);

  if (!images.length) return null;

  return (
    <View className="mb-5">
      <FlatList
        horizontal
        pagingEnabled
        data={images}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setSelected(index);
              setViewer(true);
            }}
          >
            <Image
              source={{ uri: item }}
              className="rounded-3xl"
              style={{
                width: width - 72,
                height: 230,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />

      <JobImageViewer
        visible={viewer}
        images={images}
        initialIndex={selected}
        onClose={() => setViewer(false)}
      />
    </View>
  );
};

export default JobGallery;
