import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
type NextBtnProps = {
  scrollTo: () => void;
  currentIndex:number;
  totalSlides:number;
};





const NextBtn = ({scrollTo, currentIndex, totalSlides}: NextBtnProps) => {
  const isLastSlide = currentIndex === totalSlides - 1;

   // 🔥 Dynamic text
  const getButtonText = () => {
    if (isLastSlide) return "Get Started";

    const texts = ["Next","Continue"];
    return texts[currentIndex % texts.length];
  };

  return (
    <View className="px-6 pb-12">
        <TouchableOpacity   onPress={scrollTo} className="bg-[#348293] w-full py-5 rounded-2xl flex-row items-center justify-center gap-3">
          <Text className="text-white text-xl font-bold">  {getButtonText()}</Text>
          <Feather name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      <View className="flex-row justify-center mt-4">
  <Text className="text-sm text-gray-900">
    Already have an account?{" "}
  </Text>
  <TouchableOpacity>
    <Text className="font-bold text-sm text-[#348293]">Log in</Text>
  </TouchableOpacity>
</View>
      </View>
  )
}

export default NextBtn

const styles = StyleSheet.create({})