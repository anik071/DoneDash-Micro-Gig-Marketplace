import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  firstName: string;
  fullName: string;
  avatarUri?: string | null;
  hasNotification?: boolean;
  onNotificationPress?: () => void;
};

// Helper function to extract initials safely
const getInitials = (name?: string) => {
  if (!name) return "";

  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const FeedHeader = ({
  firstName,
  fullName,
  avatarUri,
  hasNotification = false,
  onNotificationPress,
}: Props) => {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const initials = getInitials(fullName);

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white">
      <View className="flex-row items-center gap-2.5">
        {avatarUri ? (
          <Image
            source={{ uri: avatarUri }}
            className="w-11 h-11 rounded-full"
          />
        ) : (
          <View className="w-11 h-11 rounded-full bg-teal-800 items-center justify-center">
            <Text className="text-white text-base font-bold tracking-wider">
              {initials}
            </Text>
          </View>
        )}

        <Text className="text-xl font-bold text-[#0f6e56]">
          {greeting()}, <Text className="text-[#0f6e56]">{firstName}</Text>
        </Text>
      </View>

      {/* Right: notification bell */}
      <TouchableOpacity
        onPress={onNotificationPress}
        className="relative p-1"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="notifications-outline" size={26} color="#0f6e56" />
        {hasNotification && (
          <View className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default FeedHeader;
