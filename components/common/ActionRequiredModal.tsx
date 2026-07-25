import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  title: string;
  description: string;
  primaryText: string;
  secondaryText?: string;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
};

const ActionRequiredModal = ({
  visible,
  title,
  description,
  primaryText,
  secondaryText = "Maybe Later",
  onPrimaryPress,
  onSecondaryPress,
}: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/40 justify-center px-6">
        <View className="bg-white rounded-3xl p-6">
          <View className="w-16 h-16 rounded-full bg-emerald-100 self-center items-center justify-center mb-5">
            <Ionicons name="chatbubble-ellipses" size={30} color="#0f6e56" />
          </View>

          <Text className="text-xl font-bold text-center text-slate-900">
            {title}
          </Text>

          <Text className="text-center text-slate-500 mt-3 leading-6">
            {description}
          </Text>

          <TouchableOpacity
            onPress={onPrimaryPress}
            activeOpacity={0.85}
            className="bg-emerald-700 rounded-2xl py-4 mt-8"
          >
            <Text className="text-center text-white font-semibold text-base">
              {primaryText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSecondaryPress} className="py-4">
            <Text className="text-center text-slate-500 font-medium">
              {secondaryText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ActionRequiredModal;
