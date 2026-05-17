import {TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import JobDetailScreen from '../../jobDetails'
import CompleteJobScreen from '../../completeJob'
import LeaveReviewScreen from '../../leaveReview'
const FeedScreen = () => {
  const router = useRouter()
  
  function viewJobDetails(): void {
    router.push('/jobDetails')
  }
  function CompleteJobScreen(): void {
    router.push('/completeJob')
  }
  function LeaveReviewScreen(): void {
    router.push('/leaveReview')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold text-slate-900">
          FeedScreen
        </Text>
        <TouchableOpacity>
          <Text className="text-base text-slate-700 bg-blue-500 text-white p-2 rounded" onPress={() =>viewJobDetails()}>
            Demo Job Card
          </Text>
          <Text className="text-base text-slate-700 bg-teal-500 text-white p-2 rounded" onPress={() =>CompleteJobScreen()}>
            Complete Job Card
          </Text>
           <Text className="text-base text-slate-700 bg-teal-500 text-white p-2 rounded" onPress={() =>LeaveReviewScreen()}>
            Leave a Review card
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default FeedScreen
