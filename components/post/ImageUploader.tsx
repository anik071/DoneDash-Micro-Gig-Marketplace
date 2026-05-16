import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

type Props = { images: string[]; onChange: (imgs: string[]) => void };

const MAX = 5;

const ImageUploader = ({ images, onChange }: Props) => {
  const pick = async () => {
    if (images.length >= MAX) {
      Alert.alert('Limit reached', `You can upload up to ${MAX} images.`);
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: MAX - images.length,
    });
    if (!result.canceled) {
      const uris = result.assets.map(a => a.uri);
      onChange([...images, ...uris].slice(0, MAX));
    }
  };

  const remove = (uri: string) => onChange(images.filter(i => i !== uri));

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {images.map(uri => (
        <View key={uri} style={{ width: 90, height: 90, borderRadius: 10, overflow: 'hidden' }}>
          <Image source={{ uri }} style={{ width: '100%', height: '100%' }} />
          <TouchableOpacity
            onPress={() => remove(uri)}
            style={{
              position: 'absolute', top: 4, right: 4,
              backgroundColor: 'rgba(0,0,0,0.55)',
              borderRadius: 99, padding: 2,
            }}
          >
            <Ionicons name="close" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}
      {images.length < MAX && (
        <TouchableOpacity
          onPress={pick}
          style={{
            width: 90, height: 90, borderRadius: 10,
            borderWidth: 1.5, borderColor: '#d1d5db',
            borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center',
            backgroundColor: '#f9fafb',
          }}
        >
          <Ionicons name="camera-outline" size={22} color="#9ca3af" />
          <Text style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>ADD MORE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImageUploader;