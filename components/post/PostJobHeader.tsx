import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const PostJobHeader = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderBottomWidth: 0.5,
        borderBottomColor: "#e5e7eb",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text
          style={{
            fontSize: 15,
            color: "#0f6e56",
            fontWeight: "500",
          }}
        >
          Cancel
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#111827",
        }}
      >
        Post a job
      </Text>

      <View style={{ width: 50 }} />
    </View>
  );
};

export default PostJobHeader;
