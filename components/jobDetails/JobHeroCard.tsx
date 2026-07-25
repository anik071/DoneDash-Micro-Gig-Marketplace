import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import JobGallery from "./JobGallery";
const TEAL = "#1A8FA0";
const TEXT_DARK = "#1C1C1C";
const TEXT_GRAY = "#6B7280";

type Props = {
  job: any;
};

const getPostedAgo = (date: string) => {
  const now = new Date();
  const created = new Date(date);

  const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diff < 60) return "Just now";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const JobHeroCard = ({ job }: Props) => {
  const poster = job.profiles;

  const posterName = poster
    ? `${poster.first_name ?? ""} ${poster.last_name ?? ""}`.trim()
    : "Anonymous";

  const initials = posterName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
      }}
    >
      {/* Images */}

      <JobGallery images={job.images ?? []} />

      {/* Top */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <View
          style={{
            backgroundColor: "#B2E0EC",
            paddingHorizontal: 16,
            paddingVertical: 7,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "#0E6878",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {(job.category || "General").toUpperCase()}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#D1D5DB",
            borderRadius: 20,
            paddingHorizontal: 12,
            gap: 6,
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: TEAL,
            }}
          />

          <Text>Open</Text>
        </View>
      </View>

      {/* Title */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 18,
            fontWeight: "700",
            color: TEXT_DARK,
            marginRight: 10,
          }}
        >
          {job.title}
        </Text>

        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: TEAL,
            }}
          >
            ৳{job.budget}
          </Text>

          <Text
            style={{
              color: TEXT_GRAY,
              fontSize: 11,
            }}
          >
            FIXED
          </Text>
        </View>
      </View>

      {/* Poster */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F3F4F6",
          padding: 14,
          borderRadius: 14,
          marginBottom: 20,
        }}
      >
        {poster?.avatar ? (
          <Image
            source={{ uri: poster.avatar }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
            }}
          />
        ) : (
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "#7BA7B5",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
              }}
            >
              {initials}
            </Text>
          </View>
        )}

        <View style={{ marginLeft: 12 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: TEXT_DARK,
            }}
          >
            {posterName}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="star" size={14} color="#F59E0B" />

            <Text style={{ marginLeft: 4 }}>4.9</Text>
          </View>
        </View>
      </View>

      {/* Description */}

      <Text
        style={{
          fontWeight: "700",
          color: TEXT_GRAY,
          marginBottom: 8,
          fontSize: 12,
        }}
      >
        DESCRIPTION
      </Text>

      <Text
        style={{
          color: TEXT_DARK,
          lineHeight: 24,
          fontSize: 15,
        }}
      >
        {job.description}
      </Text>

      {/* Posted */}

      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F3F4F6",
          padding: 12,
          borderRadius: 12,
          alignSelf: "flex-start",
        }}
      >
        <Ionicons name="time-outline" size={16} color={TEAL} />

        <Text style={{ marginLeft: 8 }}>{getPostedAgo(job.created_at)}</Text>
      </View>
    </View>
  );
};

export default JobHeroCard;
