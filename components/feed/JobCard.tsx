import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BADGE_STYLES: Record<string, string> = {
  Physical: "bg-teal-50 text-teal-800",
  Academic: "bg-blue-50 text-blue-800",
  Tutoring: "bg-amber-50 text-amber-800",
  Delivery: "bg-orange-50 text-orange-800",
  Digital: "bg-purple-50 text-purple-800",
};

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

const JobCard = ({ job }: Props) => {
  const router = useRouter();

  const poster = job.profiles;

  const previewImage =
    job.images && job.images.length > 0 ? job.images[0] : null;

  const badgeStyle = BADGE_STYLES[job.category] ?? "bg-gray-100 text-gray-700";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/jobDetails?id=${job.id}`)}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100"
    >
      {previewImage && (
        <Image
          source={{ uri: previewImage }}
          className="w-full h-44 rounded-2xl mb-4"
          resizeMode="cover"
        />
      )}

      <View className="p-4">
        {/* Top */}
        <View className="flex-row justify-between items-start mb-2">
          <View className={`px-3 py-1 rounded-full ${badgeStyle}`}>
            <Text className="text-xs font-semibold tracking-wider">
              {job.category.toUpperCase()}
            </Text>
          </View>

          <View className="items-end">
            {job.budget && (
              <Text className="text-lg font-bold text-teal-700">
                ৳ {job.budget}
              </Text>
            )}
          </View>
        </View>

        {/* Title */}

        <Text className="text-[15px] font-semibold text-gray-900 mb-3 leading-snug">
          {job.title}
        </Text>

        {/* Footer */}

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-2">
            <Image
              source={{
                uri: poster?.avatar || "https://i.pravatar.cc/150",
              }}
              className="w-7 h-7 rounded-full"
            />

            <Text className="text-[13px] font-medium text-gray-700">
              {poster?.first_name} {poster?.last_name}
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <Ionicons name="time-outline" size={13} color="#9ca3af" />

            <Text className="text-xs text-gray-400">
              {getPostedAgo(job.created_at)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
