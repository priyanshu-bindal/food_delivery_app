import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

// Components
import LocationHeader from './components/LocationHeader';
import SearchBar from './components/SearchBar';
import CategoryCarousel from './components/CategoryCarousel';
import PromoCarousel from './components/PromoCarousel';
import RestaurantList from './components/RestaurantList';
import Skeleton from '../components/Skeleton';

// Types
import type { RootStackParamList } from '../types';
import { restaurants } from './data';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeDiscoveryScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleRestaurantPress = (restaurant: any) => {
    navigation.navigate('RestaurantMenu', {
      restaurantId: restaurant.id,
      restaurant: restaurant,
    });
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#221310' }}>
      <StatusBar barStyle="light-content" />

      {/* Main Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 96 }}
      >
        {/* Location Header */}
        <LocationHeader />

        {loading ? (
          <View style={{ paddingHorizontal: 16, paddingTop: 16, gap: 24 }}>
            {/* Search Skeleton */}
            <Skeleton height={50} borderRadius={25} />

            {/* Categories Skeleton */}
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 8 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={{ alignItems: 'center', gap: 8 }}>
                  <Skeleton width={64} height={64} borderRadius={32} />
                  <Skeleton width={50} height={12} borderRadius={4} />
                </View>
              ))}
            </View>

            {/* Promo Banner Skeleton */}
            <Skeleton height={180} borderRadius={16} />

            {/* Restaurant Cards Skeleton */}
            <View style={{ gap: 24, marginTop: 16 }}>
              {[1, 2].map((i) => (
                <View key={i} style={{ gap: 12 }}>
                  <Skeleton height={200} borderRadius={16} />
                  <View style={{ gap: 8 }}>
                    <Skeleton width="70%" height={24} borderRadius={4} />
                    <Skeleton width="40%" height={16} borderRadius={4} />
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <>
            <SearchBar />
            <CategoryCarousel />
            <PromoCarousel />
            <RestaurantList
              restaurants={restaurants}
              onRestaurantPress={handleRestaurantPress}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeDiscoveryScreen;
