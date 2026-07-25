import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const JobDetailsHeader = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 70,
        }}
      >
        <Ionicons name="chevron-back" size={20} color="#1A8FA0" />
        <Text
          style={{
            color: "#1A8FA0",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Back
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: "#1C1C1C",
        }}
      >
        Job Details
      </Text>

      <View style={{ width: 70 }} />
    </View>
  );
};

export default JobDetailsHeader;
