import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
};

const FeedSearch = ({ value, onChangeText, onClear }: Props) => (
  <View className="px-4 pt-3 pb-1">
    <View className="flex-row items-center bg-white rounded-xl border border-gray-200 px-3 h-11">
      <Ionicons name="search-outline" size={18} color="#9ca3af" />
      <TextInput
        className="flex-1 ml-2 text-sm text-gray-800"
        placeholder="Search jobs..."
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        clearButtonMode="never"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="close-circle" size={18} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default FeedSearch;