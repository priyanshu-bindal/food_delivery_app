import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
}

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = 'explore',
  onTabPress,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'explore',
      label: 'Explore',
      icon: '🧭',
      isActive: activeTab === 'explore',
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: '🛍️',
      isActive: activeTab === 'orders',
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: '🔖',
      isActive: activeTab === 'saved',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      isActive: activeTab === 'profile',
    },
  ];

  return (
    <View className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-[#221310] border-t border-gray-200 dark:border-white/5 px-6 py-3 pb-6 z-50">
      <View className="flex-row items-center justify-between">
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onTabPress?.(item.id)}
            className="flex-col items-center gap-1"
          >
            <Text
              className={`text-lg ${
                item.isActive ? 'text-primary' : 'text-gray-400'
              }`}
            >
              {item.icon}
            </Text>
            <Text
              className={`text-[10px] font-medium ${
                item.isActive ? 'text-primary font-bold' : 'text-gray-400'
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomNavigation;
