import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  item: any;
  onComplete?: (item: any) => void;
};
const HelperJobCard = ({ item, onComplete }: Props) => {
  const proposalStatus = item.status;
  const job = item.job;
  const poster = job?.poster;

  const posterName = poster
    ? `${poster.first_name ?? ""} ${poster.last_name ?? ""}`.trim()
    : "Poster";

  const initials = posterName
    .split(" ")
    .map((x: string) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const statusColor = () => {
    switch (proposalStatus) {
      case "PENDING":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          label: "Waiting",
        };

      case "ACCEPTED":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          label: "Accepted",
        };

      case "REJECTED":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          label: "Rejected",
        };

      case "WITHDRAWN":
        return {
          bg: "bg-gray-200",
          text: "text-gray-600",
          label: "Withdrawn",
        };

      default:
        return {
          bg: "bg-slate-100",
          text: "text-slate-700",
          label: proposalStatus,
        };
    }
  };

  const badge = statusColor();

  const openWhatsapp = () => {
    if (!poster?.whatsapp) return;

    Linking.openURL(`https://wa.me/88${poster.whatsapp}`);
  };

  const openTelegram = () => {
    if (!poster?.telegram) return;

    Linking.openURL(`https://t.me/${poster.telegram}`);
  };

  const openImo = () => {
    if (!poster?.imo) return;

    Linking.openURL(`imo://im?phone=88${poster.imo}`);
  };

  const ContactIcon = ({ enabled, icon, color, onPress }: any) => (
    <TouchableOpacity
      disabled={!enabled}
      onPress={onPress}
      className={`w-12 h-12 rounded-full items-center justify-center ${
        enabled ? "bg-emerald-600" : "bg-gray-200"
      }`}
    >
      {icon(color)}
    </TouchableOpacity>
  );

  return (
    <View className="bg-white rounded-3xl p-5 mb-4">
      <View className="flex-row justify-between items-center">
        <View className={`px-3 py-1 rounded-full ${badge.bg}`}>
          <Text className={`font-bold text-xs ${badge.text}`}>
            {badge.label}
          </Text>
        </View>

        <Text className="text-emerald-700 text-xl font-bold">
          ৳{job?.budget}
        </Text>
      </View>

      <Text className="text-lg font-bold text-gray-900 mt-4">{job?.title}</Text>

      <Text className="text-gray-500 mt-2">{job?.location}</Text>

      {proposalStatus === "PENDING" && (
        <View className="mt-5 bg-amber-50 rounded-2xl p-4">
          <Text className="text-amber-700 font-semibold">
            Waiting for the poster to review your proposal.
          </Text>
        </View>
      )}

      {proposalStatus === "REJECTED" && (
        <View className="mt-5 bg-red-50 rounded-2xl p-4">
          <Text className="text-red-700 font-semibold">
            This proposal wasn't selected.
          </Text>
        </View>
      )}

      {proposalStatus === "WITHDRAWN" && (
        <View className="mt-5 bg-slate-100 rounded-2xl p-4">
          <Text className="text-slate-600 font-semibold">
            You withdrew this proposal.
          </Text>
        </View>
      )}

      {proposalStatus === "ACCEPTED" && (
        <>
          <View className="border-t border-slate-100 mt-5 pt-5">
            <Text className="text-xs text-gray-400 uppercase">Poster</Text>

            <View className="flex-row items-center mt-3">
              {poster?.avatar ? (
                <Image
                  source={{ uri: poster.avatar }}
                  className="w-14 h-14 rounded-full"
                />
              ) : (
                <View className="w-14 h-14 rounded-full bg-emerald-600 items-center justify-center">
                  <Text className="text-white font-bold">{initials}</Text>
                </View>
              )}

              <View className="ml-4 flex-1">
                <Text className="font-bold text-lg text-gray-900">
                  {posterName}
                </Text>

                <View className="flex-row items-center mt-1">
                  <Ionicons name="star" size={14} color="#f59e0b" />

                  <Text className="ml-1 font-semibold">
                    {poster?.average_rating ?? 0}
                  </Text>

                  <Text className="ml-2 text-gray-400">
                    ({poster?.completed_jobs ?? 0})
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="flex-row justify-around mt-6">
            <ContactIcon
              enabled={!!poster?.whatsapp}
              onPress={openWhatsapp}
              color="white"
              icon={(color: string) => (
                <Ionicons name="logo-whatsapp" size={22} color={color} />
              )}
            />

            <ContactIcon
              enabled={!!poster?.telegram}
              onPress={openTelegram}
              color="white"
              icon={(color: string) => (
                <Ionicons name="paper-plane" size={20} color={color} />
              )}
            />

            <ContactIcon
              enabled={!!poster?.imo}
              onPress={openImo}
              color="white"
              icon={(color: string) => (
                <MaterialCommunityIcons name="chat" size={22} color={color} />
              )}
            />
          </View>
          {job?.status === "IN PROGRESS" && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => onComplete?.(item)}
              className="mt-6 bg-emerald-600 rounded-2xl py-4 items-center"
            >
              <Text className="text-white font-bold text-base">
                Complete Job
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default HelperJobCard;
