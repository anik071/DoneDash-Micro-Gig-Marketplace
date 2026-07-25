import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

interface Props {
  text?: string;
}

const LoadingScreen = ({ text = "Loading..." }: Props) => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <LottieView
        source={require("../../assets/animations/loading.json")}
        autoPlay
        loop
        style={{
          width: 170,
          height: 170,
        }}
      />

      <Text className="mt-2 text-gray-500 text-base">{text}</Text>
    </View>
  );
};

export default LoadingScreen;
