import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import type { RestaurantListProps, Restaurant } from '../../types';
import ScalePressable from '../../components/ScalePressable';
import { getSafeImageUri } from '../../utils/imageHelpers';

const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants = [
    {
      id: '1',
      name: 'The Golden Grill',
      cuisine: 'American • Steaks • Burgers',
      rating: 4.8,
      deliveryTime: '25-30 min',
      distance: '1.2 km',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBphxDUHHPhTTHFAAVHrUX0UY971kgUhIwHcctw99QdAKI3dcYGAOPUIUxmgGxypSYd1Le4PiaSBUOD9V3ztwR3L8jmAqUCuvoMisF96zZwR1rEcyk4XiDY0E96npP2fo7PjjxM0E8-SUgJZqqkWEnXsPNUOgov3w9Ru_YJZuifqhiSlcqhx9cf6WGS0Pc5MMJOtafiBoLs7HgPR8vVQtz3Iq1mZ54osCbUpIStP5lnQXytElUKJTMlrRalWUQRHC_LinHL2GCgoSU',
      hasFreeDelivery: true,
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Pasta di Roma',
      cuisine: 'Italian • Pasta • Wine',
      rating: 4.5,
      deliveryTime: '35-40 min',
      distance: '2.8 km',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBilknx9nWGnbwW-oo2BbPOETZUfmX96kYzaqJSHN8E4U2mNC7GJVdsolCVBmAnEVasaPYwFptCRGvQZ2IaJdE4Pkd7avYqr09kmvVok4_Q3hOdfVXJqoNSWWhKNhoITrblfw-pm1Szt1NihxXLhNOV5BQwR4n99VJdspsQmE3VCljGLvgq9GvI1L7ZvjRFAJdexLZ2c6SmxQo3dX13gZ8aMzCGoqrOrY7h_NXrBJ_ADCVJVproZ3xuRt6GJUUKQ4755CnzI-Uzd_s',
      hasFreeDelivery: false,
      isFavorite: false,
    },
  ],
  onRestaurantPress,
  onFavoritePress,
  onSeeAllPress,
}) => {
  const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
    return (
      <ScalePressable
        onPress={() => onRestaurantPress?.(restaurant)}
        className="mb-6"
      >
        <View className="flex-col gap-3">
          {/* Restaurant Image */}
          <View className="relative aspect-[16/9] overflow-hidden" style={{ borderRadius: 12 }}>
            <Image
              source={getSafeImageUri(restaurant.image)}
              className="w-full h-full"
              resizeMode="cover"
            />

            {/* Rating Badge */}
            <View className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-md px-2 py-1 flex-row items-center gap-1" style={{ borderRadius: 6 }}>
              <Text className="text-yellow-500 text-sm">⭐</Text>
              <Text className="text-xs font-bold text-gray-900 dark:text-text-primary">
                {restaurant.rating}
              </Text>
            </View>

            {/* Free Delivery Badge */}
            {restaurant.hasFreeDelivery && (
              <View
                className="absolute bottom-4 right-4 bg-primary px-2 py-1"
                style={{ borderRadius: 9999 }}
              >
                <Text className="text-white text-[10px] font-bold">
                  FREE DELIVERY
                </Text>
              </View>
            )}
          </View>

          {/* Restaurant Info */}
          <View className="flex-col">
            <View className="flex-row justify-between items-start">
              <Text className="text-lg font-bold flex-1" style={{ color: '#ffffff' }}>
                {restaurant.name}
              </Text>
              <TouchableOpacity onPress={() => onFavoritePress?.(restaurant)}>
                <Text className="text-lg">
                  {restaurant.isFavorite ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-sm mt-1" style={{ color: '#c99b92' }}>
              {restaurant.cuisine}
            </Text>

            <View className="flex-row items-center gap-3 mt-2">
              {/* Delivery Time */}
              <View
                className="flex-row items-center gap-1 px-2 py-1"
                style={{ borderRadius: 9999, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <Text className="text-sm">⏱️</Text>
                <Text className="text-xs font-medium" style={{ color: '#e5e7eb' }}>
                  {restaurant.deliveryTime}
                </Text>
              </View>

              {/* Distance */}
              <View
                className="flex-row items-center gap-1 px-2 py-1"
                style={{ borderRadius: 9999, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <Text className="text-sm">📍</Text>
                <Text className="text-xs font-medium" style={{ color: '#e5e7eb' }}>
                  {restaurant.distance}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScalePressable>
    );
  };

  return (
    <View className="flex-1">
      {/* Section Header */}
      <View className="flex-row items-center justify-between px-4 mt-8 mb-4">
        <Text className="text-xl font-bold" style={{ color: '#ffffff' }}>
          Restaurants Near You
        </Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text className="text-sm font-bold flex-row items-center" style={{ color: '#ec3713' }}>
            See all →
          </Text>
        </TouchableOpacity>
      </View>

      {/* Restaurant Cards */}
      <View className="px-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </View>
    </View>
  );
};

export default RestaurantList;
