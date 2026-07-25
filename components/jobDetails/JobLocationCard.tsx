import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  location: string;
};

const JobLocationCard = ({ location }: Props) => {
  return (
    <View className="mt-5 bg-white rounded-3xl p-5">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-11 h-11 rounded-full bg-teal-50 items-center justify-center">
            <Ionicons name="location" size={24} color="#1A8FA0" />
          </View>

          <View className="ml-3">
            <Text className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
              Location
            </Text>

            <Text className="text-base font-bold text-gray-900">
              {location}
            </Text>
          </View>
        </View>

        <TouchableOpacity>
          <Text className="text-[#1A8FA0] font-semibold text-sm">View</Text>
        </TouchableOpacity>
      </View>

      {/* Fake Map Preview */}

      <View className="h-40 rounded-2xl overflow-hidden bg-slate-100">
        <View className="absolute inset-0">
          {/* map grid effect */}

          <View className="flex-1 justify-center items-center">
            <View className="w-28 h-28 rounded-full bg-teal-100 items-center justify-center">
              <View className="w-16 h-16 rounded-full bg-teal-200 items-center justify-center">
                <Ionicons name="navigate" size={28} color="#0f6e56" />
              </View>
            </View>
          </View>
        </View>

        <View className="absolute bottom-3 left-3 bg-white/90 px-3 py-2 rounded-full">
          <Text className="text-xs font-semibold text-gray-700">
            📍 {location}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default JobLocationCard;
