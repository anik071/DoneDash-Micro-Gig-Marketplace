import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = { onLogout: () => void };

const LogoutRow = ({ onLogout }: Props) => (
  <View className="mx-4 mb-6 bg-white rounded-2xl border border-gray-100 overflow-hidden">
    <TouchableOpacity
      className="flex-row items-center justify-center gap-2 py-4"
      onPress={onLogout}
      activeOpacity={0.7}
    >
      <Ionicons name="log-out-outline" size={18} color="#ef4444" />
      <Text className="text-base font-semibold text-red-500">Log out</Text>
    </TouchableOpacity>
  </View>
);

export default LogoutRow;