import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
  badge: string;
  rating: number;
  reviewCount: number;
  avatarUri?: string | null;
  badgeColor?: string;
};

// Helper function to extract initials safely
const getInitials = (name: string) => {
  if (!name) return "";

  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const ProfileCard = ({
  name,
  badge,
  rating,
  reviewCount,
  avatarUri,
  badgeColor = "#0f6e56",
}: Props) => {
  const initials = getInitials(name);

  return (
    <View className="bg-white rounded-2xl p-4 mx-4 mb-3 flex-row items-center gap-4 border border-gray-100">
      {avatarUri ? (
        <Image source={{ uri: avatarUri }} className="w-16 h-16 rounded-full" />
      ) : (
        <View className="w-16 h-16 rounded-full bg-teal-800 items-center justify-center">
          <Text className="text-white text-xl font-bold tracking-wider">
            {initials}
          </Text>
        </View>
      )}

      <View className="flex-1">
        <View className="flex-row items-center gap-2 flex-wrap">
          <Text className="text-lg font-bold text-gray-900">{name}</Text>
          <View
            style={{
              backgroundColor: badgeColor + "18",
              borderRadius: 6,
              paddingHorizontal: 8,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "700",
                color: badgeColor,
                letterSpacing: 0.5,
              }}
            >
              {badge}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1 mt-1">
          <Ionicons name="star" size={14} color="#f59e0b" />
          <Text className="text-sm font-semibold text-gray-800">{rating}</Text>
          <Text className="text-sm text-gray-400">({reviewCount} reviews)</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
