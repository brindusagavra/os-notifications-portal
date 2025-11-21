
export type NotificationType = 'message' | 'stock' | 'security';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: number;
}

export interface UserPreferences {
  message: boolean;
  stock: boolean;
  security: boolean;
}

// Initial Mock Data
let notifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome!',
    message: 'Welcome to your new portal.',
    type: 'security',
    read: false,
    timestamp: Date.now(),
  },
  {
    id: '2',
    title: 'Stock Alert: GOOGL',
    message: 'GOOGL is up 5% today.',
    type: 'stock',
    read: false,
    timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
  },
];

let preferences: UserPreferences = {
  message: true,
  stock: true,
  security: true,
};

export const store = {
  getNotifications: () => notifications.sort((a, b) => b.timestamp - a.timestamp),
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    // Check if the user has enabled this notification type
    if (!preferences[notification.type]) {
      return null;
    }

    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
      read: false,
    };
    notifications.push(newNotification);
    return newNotification;
  },
  markAsRead: (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
  },
  getPreferences: () => preferences,
  updatePreferences: (newPreferences: Partial<UserPreferences>) => {
    preferences = { ...preferences, ...newPreferences };
    return preferences;
  },
};
