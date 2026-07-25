import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  item: any;
  onAccept: (id: string) => void;
};

const ProposalCard = ({ item, onAccept }: Props) => {
  const helper = item.profiles;

  const helperName = helper
    ? `${helper.first_name ?? ""} ${helper.last_name ?? ""}`.trim()
    : "Anonymous";

  const initials = helperName
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {/* Helper Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        {helper?.avatar ? (
          <Image
            source={{ uri: helper.avatar }}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              marginRight: 12,
            }}
          />
        ) : (
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: "#9cc7d1",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              {initials}
            </Text>
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#111827",
            }}
          >
            {helperName}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Ionicons name="star" size={13} color="#f59e0b" />

            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: "#374151",
                marginLeft: 4,
              }}
            >
              {helper?.average_rating ?? 0}
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: "#9ca3af",
                marginLeft: 4,
              }}
            >
              ({helper?.completed_jobs ?? 0} jobs)
            </Text>
          </View>
        </View>

        {/* Proposed Amount */}
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: "#0f6e56",
            }}
          >
            ৳{item.proposed_amount}
          </Text>

          <Text
            style={{
              fontSize: 10,
              fontWeight: "600",
              color: "#9ca3af",
              letterSpacing: 0.5,
            }}
          >
            PROPOSED PAY
          </Text>
        </View>
      </View>

      {/* Message */}

      <Text
        style={{
          fontSize: 13,
          color: "#4b5563",
          lineHeight: 19,
          marginBottom: 14,
        }}
        numberOfLines={4}
      >
        {item.message || "No message provided."}
      </Text>

      {/* Accept Button */}

      <TouchableOpacity
        onPress={() => onAccept(item.id)}
        style={{
          backgroundColor: "#0f6e56",
          borderRadius: 12,
          paddingVertical: 13,
          alignItems: "center",
        }}
        activeOpacity={0.85}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          Accept {helper?.first_name ?? "Helper"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProposalCard;
