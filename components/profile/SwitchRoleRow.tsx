import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { userRoleStore } from '../../store/userRoleStore';


const SwitchRoleRow = () => {
      const { isHelper, toggle } = userRoleStore();

  return (<View className="mx-4 mb-3 bg-gray-100 rounded-2xl p-4 flex-row items-center gap-3">
    <View className="bg-white w-10 h-10 rounded-xl items-center justify-center">
      <Ionicons name="swap-horizontal-outline" size={20} color="#0f6e56" />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-bold text-gray-900">
        {isHelper ? 'Switch to Poster' : 'Switch to Runner'}
      </Text>
      <Text className="text-xs text-gray-500 mt-0.5">
        {isHelper ? 'Post jobs and hire helpers' : 'Toggle your profile to earn money'}
      </Text>
    </View>
    <Switch
      value={isHelper}
      onValueChange={toggle}
      trackColor={{ false: '#d1d5db', true: '#0f6e56' }}
      thumbColor="#fff"
    />
  </View>)
}

export default SwitchRoleRow;