import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  profile: any;
};

const PosterCard = ({ profile }: Props) => {
  const name =
    `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim();

  const initials = name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View className="mt-6 bg-white border border-slate-200 rounded-3xl p-5">
      <Text className="text-xs font-bold tracking-[2px] text-gray-400 mb-4">
        POSTED BY
      </Text>

      <View className="flex-row">
        {profile?.avatar ? (
          <Image
            source={{ uri: profile.avatar }}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <View className="w-16 h-16 rounded-full bg-teal-600 items-center justify-center">
            <Text className="text-white text-xl font-bold">{initials}</Text>
          </View>
        )}

        <View className="ml-4 flex-1">
          <Text className="text-xl font-bold text-slate-900">{name}</Text>

          {!!profile?.university && (
            <Text className="text-sm text-gray-500 mt-1">
              {profile.university}
            </Text>
          )}

          {!!profile?.department && (
            <Text className="text-sm text-gray-500">{profile.department}</Text>
          )}

          <View className="flex-row mt-4 justify-between">
            <View className="items-center">
              <Ionicons name="star" size={18} color="#f59e0b" />

              <Text className="font-bold text-base mt-1">
                {profile?.average_rating ?? 0}
              </Text>

              <Text className="text-xs text-gray-400">Rating</Text>
            </View>

            <View className="items-center">
              <Ionicons name="checkmark-circle" size={18} color="#16a34a" />

              <Text className="font-bold text-base mt-1">
                {profile?.completed_jobs ?? 0}
              </Text>

              <Text className="text-xs text-gray-400">Jobs Done</Text>
            </View>

            <View className="items-center">
              <Ionicons name="shield-checkmark" size={18} color="#0f766e" />

              <Text className="font-bold text-base mt-1">Verified</Text>

              <Text className="text-xs text-gray-400">User</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PosterCard;
