import { View, Text } from 'react-native';
import { ReactNode } from 'react';

type Props = { label: string; required?: boolean; children: ReactNode };

const FormField = ({ label, required = false, children }: Props) => (
  <View style={{ marginBottom: 24 }}>
    <Text style={{
      fontSize: 11, fontWeight: '600', letterSpacing: 1,
      color: '#9ca3af', marginBottom: 8,
    }}>
      {label}{required && <Text style={{ color: '#ef4444' }}> *</Text>}
    </Text>
    {children}
  </View>
);

export default FormField;