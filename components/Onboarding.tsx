import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  useWindowDimensions,
  Animated,
  ViewToken,
  ListRenderItem,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import slides from "../slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import NextBtn from "./NextBtn";
const DoneDashLogo = require("../assets/images/donedash_logo.png");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

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

  const skip = async () => {
  await AsyncStorage.setItem('@viewedOnboarding', 'true');
  router.replace('/(tabs)/feed');
};

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderItem: ListRenderItem<Slide> = ({ item }) => {
    return <OnboardingItem item={item} DoneDashLogo={DoneDashLogo}/>;
  };


const scrollTo = async () => {
  if (currentIndex < slides.length - 1 && slidesRef.current) {
    slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
  } else {
    try {
      await AsyncStorage.setItem('@viewedOnboarding', 'true');
      router.replace('/(tabs)/feed'); 
    } catch (error) {
      console.log("Error @finishOnboarding: ", error);
    }
  }
};


  return (
    <View className="flex-1 bg-white">
            {/* Header */}
          <View className="flex-row justify-between items-center px-6 pt-12 pb-4">
  <View className="flex-row items-center gap-2">
    {/* logo + text together */}
    <Image
      source={DoneDashLogo}
      style={{
        width: width * 0.1,   // dynamic sizing
        height: width * 0.1,
      }}
      resizeMode="contain"
    />
     <View>
      <Text className="text-xl font-bold text-[#348293]">DoneDash</Text>
      <Text className="text-sm text-gray-500">Campus micro-gig, done fast</Text>
    </View>
  </View>

<TouchableOpacity onPress={skip}>
  <Text className="text-gray-400 font-semibold text-lg">Skip</Text>
</TouchableOpacity>
</View>
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
      {/* Next Button */}
      <NextBtn scrollTo={scrollTo} currentIndex={currentIndex} totalSlides={slides.length}/>
    </View>
  );
};

export default Onboarding;