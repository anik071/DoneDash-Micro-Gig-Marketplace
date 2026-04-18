import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const FeedScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold text-slate-900">
          FeedScreen
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default FeedScreen
