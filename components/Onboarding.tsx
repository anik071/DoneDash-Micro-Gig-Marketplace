import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  useWindowDimensions,
  Animated,
  ViewToken,
  ListRenderItem,
  TouchableOpacity,
  Text
} from "react-native";
import slides from "../slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import { Feather } from "@expo/vector-icons";

type Slide = {
  id: number;
  title: string;
  description: string;
  image: any;
};

const Onboarding = () => {
  const { width } = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const slidesRef = useRef<FlatList<Slide> | null>(null);

  // ✅ Proper typing for viewable items
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index;
        if (index !== null) {
          setCurrentIndex(index);
        }
      }
    }
  ).current;

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderItem: ListRenderItem<Slide> = ({ item }) => {
    return <OnboardingItem item={item} />;
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-3">
        <FlatList<Slide>
          ref={slidesRef}
          data={slides}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          decelerationRate="fast"
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
        
      </View>
      {/* Paginator */}
      <Paginator data={slides} scrollX={scrollX}/>
      {/* Bottom Button */}
      <View className="px-6 pb-12">
        <TouchableOpacity className="bg-[#348293] w-full py-5 rounded-2xl flex-row items-center justify-center gap-3">
          <Text className="text-white text-xl font-bold">Get started</Text>
          <Feather name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;