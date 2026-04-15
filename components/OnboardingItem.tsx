import React from "react";
import {
  Text,
  useWindowDimensions,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Feather } from "@expo/vector-icons";

// ✅ Shared Slide type
export type Slide = {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
  badge?: string;
  earningBadge?: string;
};

// ✅ Props type
type OnboardingItemProps = {
  item: Slide;
};

export default function OnboardingItem({ item }: OnboardingItemProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width }} className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-12 pb-4">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 rounded-lg bg-[#348293] items-center justify-center">
            <Feather name="check-circle" size={20} color="white" />
          </View>
          <Text className="text-xl font-bold text-[#348293]">DoneDash</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-gray-400 font-semibold text-lg">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-6 justify-center">
        <View className="relative mb-10">
          {/* Top Badge */}
          <View
            className="absolute -top-6 -right-2 z-20 bg-white rounded-2xl px-4 py-3 flex-row items-center gap-2 border border-gray-100"
            style={{ elevation: 5 }}
          >
            <View className="w-6 h-6 rounded-full bg-[#5AB65B] items-center justify-center">
              <Feather name="check" size={14} color="white" />
            </View>
            <Text className="text-gray-800 font-bold">
              Gig: {item.badge ?? "Deliver coffee"}
            </Text>
          </View>

          <View className="bg-white rounded-[40px] overflow-hidden border border-gray-100">
            <Image
              source={item.image}
              style={{ width: "100%", height: width * 0.85 }}
              resizeMode="cover"
            />
          </View>

          {/* Bottom Badge */}
          <View
            className="absolute -bottom-5 left-4 z-20 bg-[#348293] rounded-2xl px-5 py-3"
            style={{ elevation: 5 }}
          >
            <Text className="text-white font-bold text-lg">
              {item.earningBadge ?? "$15 earned"}
            </Text>
          </View>
        </View>

        {/* Text Content */}
        <View className="items-center mb-8">
          <Text className="text-4xl font-extrabold text-center text-gray-900 tracking-tight leading-tight">
            {item.title}
          </Text>
          <Text className="text-lg text-gray-500 text-center mt-4 leading-6 px-4">
            {item.description}
          </Text>
        </View>
      </View>

    
    </View>
  );
}