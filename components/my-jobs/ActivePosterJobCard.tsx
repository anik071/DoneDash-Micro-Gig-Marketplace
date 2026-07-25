import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";

type Props = {
  item: any;
};

const ActivePosterJobCard = ({ item }: Props) => {
  const router = useRouter();
  const helper = item.helper;

  const helperName = helper
    ? `${helper.first_name ?? ""} ${helper.last_name ?? ""}`.trim()
    : "Assigned Helper";

  const initials = helperName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const openWhatsapp = () => {
    if (!helper?.whatsapp) return;

    Linking.openURL(`https://wa.me/88${helper.whatsapp}`);
  };

  const openTelegram = () => {
    if (!helper?.telegram) return;

    Linking.openURL(`https://t.me/${helper.telegram}`);
  };

  const openImo = () => {
    if (!helper?.imo) return;

    Linking.openURL(`imo://im?phone=88${helper.imo}`);
  };

  const ContactButton = ({
    enabled,
    onPress,
    icon,
    color,
  }: {
    enabled: boolean;
    onPress: () => void;
    icon: React.ReactNode;
    color: string;
  }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={!enabled}
      onPress={onPress}
      className={`w-12 h-12 rounded-full items-center justify-center ${
        enabled ? "" : "bg-slate-200"
      }`}
      style={
        enabled
          ? {
              backgroundColor: color,
            }
          : undefined
      }
    >
      {icon}
    </TouchableOpacity>
  );

  return (
    <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm">
      {/* Header */}

      <View className="flex-row justify-between items-center">
        <View
          className={`rounded-full px-3 py-1 ${
            item.status === "SUBMITTED"
              ? "bg-indigo-100"
              : item.status === "COMPLETED"
                ? "bg-emerald-100"
                : "bg-cyan-100"
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              item.status === "SUBMITTED"
                ? "text-indigo-700"
                : item.status === "COMPLETED"
                  ? "text-emerald-700"
                  : "text-cyan-700"
            }`}
          >
            {item.status === "SUBMITTED"
              ? "WORK SUBMITTED"
              : item.status === "COMPLETED"
                ? "COMPLETED"
                : "IN PROGRESS"}
          </Text>
        </View>

        <Text className="text-emerald-700 font-bold text-xl">
          ৳{item.budget}
        </Text>
      </View>

      <Text className="text-xl font-bold text-slate-900 mt-4">
        {item.title}
      </Text>

      {/* Helper */}

      <View className="flex-row items-center mt-6">
        {helper?.avatar ? (
          <Image
            source={{ uri: helper.avatar }}
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <View className="w-16 h-16 rounded-full bg-cyan-600 items-center justify-center">
            <Text className="text-white font-bold text-lg">{initials}</Text>
          </View>
        )}

        <View className="ml-4 flex-1">
          <Text className="text-lg font-bold text-slate-900">{helperName}</Text>

          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={15} color="#f59e0b" />

            <Text className="ml-1 font-semibold text-slate-700">
              {helper?.average_rating ?? 0}
            </Text>

            <Text className="text-slate-400 ml-2">
              ({helper?.completed_jobs ?? 0} jobs)
            </Text>
          </View>
        </View>
      </View>

      {/* Contact */}

      <View className="mt-7">
        <Text className="text-xs font-bold text-slate-400 mb-3 uppercase">
          Contact Helper
        </Text>

        <View className="flex-row gap-4">
          <ContactButton
            enabled={!!helper?.whatsapp}
            onPress={openWhatsapp}
            color="#25D366"
            icon={<Ionicons name="logo-whatsapp" color="white" size={22} />}
          />

          <ContactButton
            enabled={!!helper?.telegram}
            onPress={openTelegram}
            color="#229ED9"
            icon={<Ionicons name="paper-plane" color="white" size={20} />}
          />

          <ContactButton
            enabled={!!helper?.imo}
            onPress={openImo}
            color="#0d8bff"
            icon={
              <MaterialCommunityIcons
                name="chat-processing"
                color="white"
                size={22}
              />
            }
          />
        </View>
        {item.status === "SUBMITTED" && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/reviewSubmission",
                params: {
                  proposalId: item.proposal?.id,
                  jobId: item.id,
                },
              })
            }
            className="bg-indigo-600 rounded-2xl py-4 items-center mt-6"
          >
            <Text className="text-white font-bold text-base">
              Review Submitted Work
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ActivePosterJobCard;
