import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getSafeImageUri } from '../../utils/imageHelpers';

interface RestaurantHeaderProps {
  restaurant: {
    id: string;
    name: string;
    image: string;
    rating: number;
    deliveryTime: string;
    distance: string;
  };
  onBackPress: () => void;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  restaurant,
  onBackPress,
}) => {
  return (
    <View className="relative">
      {/* Hero Image */}
      <View className="h-48">
        <Image
          source={getSafeImageUri(restaurant.image)}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Back Button */}
        <TouchableOpacity
          onPress={onBackPress}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 dark:bg-black/70 items-center justify-center"
          style={{ borderRadius: 9999 }}
        >
          <Text className="text-lg">←</Text>
        </TouchableOpacity>
      </View>

      {/* Restaurant Info */}
      <View className="bg-background-dark px-4 py-4">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {restaurant.name}
            </Text>
            <View className="flex-row items-center gap-4 mt-2">
              <View className="flex-row items-center gap-1">
                <Text className="text-yellow-500 text-sm">⭐</Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-white">
                  {restaurant.rating}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-sm">⏱️</Text>
                <Text className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.deliveryTime}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-sm">📍</Text>
                <Text className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.distance}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RestaurantHeader;
