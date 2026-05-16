import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import NotificationCard from '../../../components/alerts/NotificationCard';
import { DUMMY_NOTIFICATIONS, Notification } from '../../../constants/dummyNotifications';

const AlertsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>(DUMMY_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>

      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#f1f5f9',
      }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#0f6e56' }}>
          Notifications
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#0f6e56' }}>
              Read all
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Unread badge summary */}
      {unreadCount > 0 && (
        <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>
            You have{' '}
            <Text style={{ fontWeight: '700', color: '#0f6e56' }}>{unreadCount} unread</Text>
            {' '}notification{unreadCount > 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NotificationCard notification={item} onPress={markAsRead} />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingTop: 80 }}>
            <Ionicons name="notifications-off-outline" size={48} color="#d1d5db" />
            <Text style={{ color: '#9ca3af', fontSize: 15, marginTop: 12 }}>
              No notifications yet
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default AlertsScreen;