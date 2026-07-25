import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  item: any;
  onAccept: (proposal: any) => void;
};

const ProposalCard = ({ item, onAccept }: Props) => {
  const helper = item.profiles;

  const helperName = helper
    ? `${helper.first_name ?? ""} ${helper.last_name ?? ""}`.trim()
    : "Anonymous";

  const initials = helperName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <View className="flex-row">
        {helper?.avatar ? (
          <Image
            source={{ uri: helper.avatar }}
            className="w-14 h-14 rounded-full mr-3"
          />
        ) : (
          <View className="w-14 h-14 rounded-full bg-teal-300 justify-center items-center mr-3">
            <Text className="text-white font-bold text-lg">{initials}</Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900">
            {helperName}
          </Text>

          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={13} color="#f59e0b" />

            <Text className="ml-1 font-semibold text-gray-700">
              {helper?.average_rating ?? 0}
            </Text>

            <Text className="ml-1 text-gray-400">
              ({helper?.completed_jobs ?? 0} jobs)
            </Text>
          </View>
        </View>

        <View className="items-end">
          <View className="bg-yellow-100 px-3 py-1 rounded-full">
            <Text className="text-yellow-800 text-xs font-bold">
              {item.status}
            </Text>
          </View>

          <Text className="text-xs text-gray-400 mt-2">
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <Text numberOfLines={4} className="text-gray-600 leading-5 mt-4 mb-5">
        {item.cover_letter}
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onAccept(item)}
        className="bg-emerald-600 rounded-xl py-3 items-center"
      >
        <Text className="text-white font-semibold text-base">
          Accept {helper?.first_name ?? "Helper"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProposalCard;
