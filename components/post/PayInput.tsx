import { View, Text, TextInput } from 'react-native';

type Props = { value: string; onChange: (v: string) => void };

const PayInput = ({ value, onChange }: Props) => (
  <View style={{
    flexDirection: 'row', alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingVertical: 8,
  }}>
    <Text style={{ fontSize: 18, color: '#0f6e56', fontWeight: '600', marginRight: 6 }}>৳</Text>
    <TextInput
      style={{ flex: 1, fontSize: 15, color: '#111827' }}
      value={value}
      onChangeText={t => onChange(t.replace(/[^0-9.]/g, ''))}
      keyboardType="decimal-pad"
      placeholder="0.00"
      placeholderTextColor="#9ca3af"
    />
    <Text style={{ fontSize: 13, color: '#9ca3af' }}>per task</Text>
  </View>
);

export default PayInput;