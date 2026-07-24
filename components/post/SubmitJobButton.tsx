import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface Props {
  submitting: boolean;
  onPress: () => void;
}

const SubmitJobButton = ({ submitting, onPress }: Props) => {
  return (
    <TouchableOpacity
      disabled={submitting}
      onPress={onPress}
      style={{
        backgroundColor: submitting ? "#9ca3af" : "#2d7a3a",
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {submitting ? "Posting..." : "Post job"}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitJobButton;
