import { View, FlatList, useWindowDimensions } from "react-native";
import React from "react";
import slides from "../slides";
import OnboardingItem from "./OnboardingItem";

const Onboarding = () => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id.toString()}
        onScrollCapture={() => {}}
        decelerationRate="fast"
      />
    </View>
  );
};

export default Onboarding;
