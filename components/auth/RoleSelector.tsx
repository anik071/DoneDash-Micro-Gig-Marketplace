import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export type Role = "poster" | "helper";

interface RoleSelectorProps {
  value: Role;
  onChange: (role: Role) => void;
}

const roles = [
  {
    value: "poster",
    icon: "📢",
    title: "Post jobs",
    subtitle: "I need tasks done",
  },
  {
    value: "helper",
    icon: "🤝",
    title: "Help out",
    subtitle: "I want to earn credits",
  },
] as const;

const RoleSelector = ({ value, onChange }: RoleSelectorProps) => {
  return (
    <View className="mb-8">
      <Text className="text-base font-medium text-gray-800 mb-3">
        I want to...
      </Text>

      <View className="flex-row gap-4">
        {roles.map((role) => {
          const selected = value === role.value;

          return (
            <TouchableOpacity
              key={role.value}
              onPress={() => onChange(role.value)}
              className="flex-1 rounded-2xl items-center py-5 px-3"
              style={{
                backgroundColor: selected ? "#FFFFFF" : "#F3F4F6",
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? "#2D7D8F" : "#E5E7EB",
              }}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-3"
                style={{
                  backgroundColor: "#EAF4F6",
                }}
              >
                <Text style={{ fontSize: 22 }}>{role.icon}</Text>
              </View>

              <Text className="text-base font-bold text-gray-900 mb-1">
                {role.title}
              </Text>

              <Text className="text-xs text-gray-500 text-center">
                {role.subtitle}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(RoleSelector);
