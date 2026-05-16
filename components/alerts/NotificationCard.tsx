import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Notification, NotificationType } from '../../constants/dummyNotifications';

const CONFIG: Record<NotificationType, { icon: string; bg: string; iconColor: string; accent: string }> = {
  gig:      { icon: 'briefcase',        bg: '#dff0f5', iconColor: '#0f6e56', accent: '#0f6e56' },
  payment:  { icon: 'cash',             bg: '#dcf5e7', iconColor: '#1a7a3c', accent: '#1a7a3c' },
  profile:  { icon: 'person',           bg: '#e8e8ee', iconColor: '#4b5563', accent: '#4b5563' },
  review:   { icon: 'star',             bg: '#fef3c7', iconColor: '#d97706', accent: '#d97706' },
  recap:    { icon: 'megaphone',        bg: '#e8e8ee', iconColor: '#4b5563', accent: '#4b5563' },
  proposal: { icon: 'document-text',   bg: '#ede9fe', iconColor: '#6d28d9', accent: '#6d28d9' },
};

type Props = {
  notification: Notification;
  onPress: (id: string) => void;
};

const NotificationCard = ({ notification, onPress }: Props) => {
  const { icon, bg, iconColor, accent } = CONFIG[notification.type];
  const unread = !notification.read;

  return (
    <TouchableOpacity
      onPress={() => onPress(notification.id)}
      activeOpacity={0.75}
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        borderLeftWidth: unread ? 3 : 0,
        borderLeftColor: unread ? accent : 'transparent',
        opacity: unread ? 1 : 0.6,
      }}
    >
      {/* Icon */}
      <View style={{
        width: 46, height: 46, borderRadius: 12,
        backgroundColor: bg,
        alignItems: 'center', justifyContent: 'center',
        marginRight: 12, flexShrink: 0,
      }}>
        <Ionicons name={icon as any} size={22} color={iconColor} />
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
          <Text style={{
            fontSize: 14,
            fontWeight: unread ? '700' : '600',
            color: '#111827',
            flex: 1,
            marginRight: 8,
          }}>
            {notification.title}
          </Text>
          <Text style={{ fontSize: 11, color: '#9ca3af', marginTop: 1, flexShrink: 0 }}>
            {notification.time}
          </Text>
        </View>
        <Text style={{ fontSize: 13, color: '#6b7280', lineHeight: 18 }}>
          {notification.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;