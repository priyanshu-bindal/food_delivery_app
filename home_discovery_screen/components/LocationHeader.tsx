import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Pressable, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { LocationHeaderProps } from '../../types';

const LocationHeader: React.FC<LocationHeaderProps> = ({
  location = 'Home, 5th Ave',
  address = 'New York, NY 10001',
  onLocationPress,
  onNotificationPress,
  onProfilePress,
}) => {
  const navigation = useNavigation();
  const avatarScale = useRef(new Animated.Value(1)).current;

  const handleAvatarPressIn = () => {
    Animated.timing(avatarScale, {
      toValue: 0.92,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleAvatarPressOut = () => {
    Animated.timing(avatarScale, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View className="px-4 py-4" style={{ backgroundColor: 'rgba(34, 19, 16, 0.8)' }}>
      <View className="flex-row items-center justify-between gap-3">
        {/* Location Section */}
        <TouchableOpacity
          className="flex-row items-center gap-2 flex-1"
          onPress={onLocationPress}
        >
          <View className="w-5 h-5 items-center justify-center">
            <Text className="text-primary text-lg">📍</Text>
          </View>
          <View className="flex-col">
            <View className="flex-row items-center gap-1">
              <Text className="text-sm font-bold leading-none" style={{ color: '#ffffff' }}>
                {location}
              </Text>
              <Text className="text-xs" style={{ color: '#9ca3af' }}>▼</Text>
            </View>
            <Text className="text-[10px]" style={{ color: '#9ca3af' }}>
              {address}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Right Actions */}
        <View className="flex-row items-center gap-4">
          {/* Notifications */}
          <TouchableOpacity onPress={onNotificationPress} className="relative">
            <Text className="text-gray-700 dark:text-text-primary text-lg">🔔</Text>
            <View
              className="absolute top-0 right-0 w-2 h-2 bg-primary border-2 border-background-dark"
              style={{ borderRadius: 9999 }}
            />
          </TouchableOpacity>

          {/* Profile Avatar */}
          <Pressable
            onPress={() => {
              const parent = navigation.getParent();
              if (parent) {
                parent.navigate('Profile');
              }
            }}
            onPressIn={handleAvatarPressIn}
            onPressOut={handleAvatarPressOut}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            accessibilityHint="Navigates to your profile tab"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Animated.Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBx2XA3HDrjCWkU-93utIudr_OpksAq5tIdv3h8MtnsDyrS_Js9VPSxjJXSfazlv3QbTntQVXhsfmNScGCqOE6jbkwP3jPGK18SeHTLhwvpfUAPTo5w4jSHF19DCuqlj6ghPHSeYGtMiTzaFYDz6Mq8AF_tex8UfeuUzrtlGpT3n-T3wiKR3ZbUUg_JGGZz5OT1PMo8sZtrBdYF-lyw7qa42CCWSvKU0W1tQdecG--MFe0-yRR-JN51W5uLzCkS8598FHfyZvDXo0'
              }}
              className="w-10 h-10"
              style={{
                borderRadius: 9999,
                borderWidth: 2,
                borderColor: 'rgba(236, 55, 19, 0.2)',
                transform: [{ scale: avatarScale }]
              }}
              resizeMode="cover"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LocationHeader;
