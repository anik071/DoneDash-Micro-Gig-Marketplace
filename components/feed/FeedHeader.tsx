import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  name: string;
  avatarUri: string;
  hasNotification?: boolean;
  onNotificationPress?: () => void;
};

const FeedHeader = ({
  name,
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

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white">
      {/* Left: avatar + greeting */}
      <View className="flex-row items-center gap-2.5">
        <Image
          source={{
            uri: avatarUri || "https://i.pravatar.cc/150",
          }}
          className="w-11 h-11 rounded-full"
        />

        <Text className="text-xl font-bold text-[#0f6e56]">
          {greeting()}, <Text className="text-[#0f6e56]">{name}</Text>
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
