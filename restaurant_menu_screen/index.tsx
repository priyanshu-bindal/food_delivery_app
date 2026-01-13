import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Counter from './components/Counter';
import Skeleton from '../components/Skeleton';
import ScalePressable from '../components/ScalePressable';
import { getSafeImageUri } from '../utils/imageHelpers';

// Store
import { useCartStore } from '../store/cartStore';

// Types
import type { RootStackParamList, MenuItem } from '../types';

type RestaurantMenuRouteProp = RouteProp<RootStackParamList, 'RestaurantMenu'>;
type RestaurantMenuNavigationProp = StackNavigationProp<RootStackParamList, 'RestaurantMenu'>;

const RestaurantMenuScreen: React.FC = () => {
  const route = useRoute<RestaurantMenuRouteProp>();
  const navigation = useNavigation<RestaurantMenuNavigationProp>();
  const { cartItems, totalItems, totalPrice, addItem, removeItem, decreaseQty } = useCartStore();
  const [loading, setLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState('Best Sellers');

  // Floating Cart Animations
  const cartSlideAnim = useRef(new Animated.Value(100)).current; // Start off-screen
  const cartScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Slide up cart when items > 0
  useEffect(() => {
    if (totalItems > 0 && !loading) {
      Animated.spring(cartSlideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 12,
        bounciness: 4,
      }).start();
    } else {
      Animated.timing(cartSlideAnim, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [totalItems, loading]);

  // Bump effect on quantity change
  useEffect(() => {
    if (totalItems > 0) {
      Animated.sequence([
        Animated.timing(cartScaleAnim, {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(cartScaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [totalItems]);


  const restaurant = route.params?.restaurant || {
    id: 'r1',
    name: 'The Gourmet Hub',
    cuisine: 'Artisan Italian & Mediterranean Cuisine',
    rating: 4.5,
    deliveryTime: '25',
    distance: '1.2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeF4hj9j_NcMaUeZMOErlc4BjWvNVacdl7tCSWcgTUkhpC2nmrWWLbO3j9G7PWw7JQvkfB4KqcEr0vCilQgIm7tXdnrN3ObAPG_khUfI_Ec2CMbODGhEnegCH6tK2ceGd6fXrrowILF77FxHOKRTCWMby58P6FO2bgc4NOGJk_TqfWCQETZYPt4g713I_nxrRqJj-8jVKKwQjPlR_4_ieD3-raCbPes0B9KMa-pQTzvddK1dvLqURqcKCQxNCl_keepha4d6ovSI',
  };

  const tabs = ['Best Sellers', 'Main Course', 'Appetizers', 'Desserts'];

  const bestSellers: MenuItem[] = [
    {
      id: '1',
      name: 'Truffle Mushroom Risotto',
      description: 'Creamy arborio rice with seasonal wild mushrooms and white truffle oil drizzle.',
      price: 18.50,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmQtXNgFp_CgW8QW2VgpT0WQvJZgNxmhq3bC4lwS-JpPtcpU2v_Ht9XBfXKAiukQiA46xZUEPO0ETkAkb3dbngWLc7BohFB5GdzxStM0tAhg18Opimy8-FRrqf-Q3gYR9KREibDFck2KAn_RUvRmfJVwmxcp8XQP_QcJQZsPKq6oh5xgVFtGP91B5LKLCU78thobKIYrA2M5DAVGCjXsRHqu1ZaVhOiSCWZ3w_5f4pj3W1gC_D_JCgLFIdSHJQ392lA-ZV0dujMAA',
      isVegetarian: true,
      category: 'Best Sellers',
      isPopular: true,
      restaurantId: 'r1',
    },
  ];

  const mainCourse: MenuItem[] = [
    {
      id: '3',
      name: 'Penne Alla Vodka',
      description: 'Classic tomato cream sauce with shallots.',
      price: 16.00,
      isVegetarian: true,
      category: 'Main Course',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeF4hj9j_NcMaUeZMOErlc4BjWvNVacdl7tCSWcgTUkhpC2nmrWWLbO3j9G7PWw7JQvkfB4KqcEr0vCilQgIm7tXdnrN3ObAPG_khUfI_Ec2CMbODGhEnegCH6tK2ceGd6fXrrowILF77FxHOKRTCWMby58P6FO2bgc4NOGJk_TqfWCQETZYPt4g713I_nxrRqJj-8jVKKwQjPlR_4_ieD3-raCbPes0B9KMa-pQTzvddK1dvLqURqcKCQxNCl_keepha4d6ovSI',
      restaurantId: 'r1',
    },
    {
      id: '4',
      name: 'Lamb Shank Confiti',
      description: 'Slow roasted for 12 hours with root veggies.',
      price: 32.00,
      isVegetarian: false,
      category: 'Main Course',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeF4hj9j_NcMaUeZMOErlc4BjWvNVacdl7tCSWcgTUkhpC2nmrWWLbO3j9G7PWw7JQvkfB4KqcEr0vCilQgIm7tXdnrN3ObAPG_khUfI_Ec2CMbODGhEnegCH6tK2ceGd6fXrrowILF77FxHOKRTCWMby58P6FO2bgc4NOGJk_TqfWCQETZYPt4g713I_nxrRqJj-8jVKKwQjPlR_4_ieD3-raCbPes0B9KMa-pQTzvddK1dvLqURqcKCQxNCl_keepha4d6ovSI',
      restaurantId: 'r1',
    },
  ];

  const getItemQuantity = (itemId: string) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem?.quantity || 0;
  };

  const renderBestSellerItem = (item: MenuItem) => {
    const quantity = getItemQuantity(item.id);

    return (
      <View key={item.id} className="flex-row gap-4 items-start py-6 first:pt-0" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.05)' }}>
        <View className="flex-1">
          {/* Veg/Non-Veg Indicator */}
          <View className="flex-row items-center gap-1.5 mb-1.5">
            <View style={{ width: 12, height: 12, borderWidth: 1, borderColor: item.isVegetarian ? '#22c55e' : '#ef4444', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: item.isVegetarian ? '#22c55e' : '#ef4444' }} />
            </View>
            <Text style={{ fontSize: 10, fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.5 }}>
              {item.isVegetarian ? 'Veg' : 'Non-Veg'}
            </Text>
          </View>

          <Text className="font-bold text-base text-white">{item.name}</Text>
          <Text className="text-white font-extrabold mt-1">${item.price.toFixed(2)}</Text>
          <Text className="text-slate-400 text-xs mt-2 leading-relaxed">{item.description}</Text>
        </View>

        {/* Image with Add Button */}
        <View className="relative flex-shrink-0">
          <Image
            source={getSafeImageUri(item.image)}
            style={{ width: 112, height: 112, borderRadius: 16 }}
            resizeMode="cover"
          />
          {quantity === 0 ? (
            <ScalePressable
              onPress={() => addItem(item)}
              style={{
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: [{ translateX: -40 }],
                backgroundColor: '#FACC15',
                paddingHorizontal: 24,
                paddingVertical: 8,
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: '900', textTransform: 'uppercase', color: '#000' }}>Add</Text>
              <Ionicons name="add" size={14} color="#000" />
            </ScalePressable>
          ) : (
            <View
              style={{
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: [{ translateX: -40 }],
                backgroundColor: '#fff',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <ScalePressable onPress={() => quantity === 1 ? removeItem(item.id) : decreaseQty(item.id)}>
                <Ionicons name="remove" size={14} color="#000" />
              </ScalePressable>
              {/* Rolling counter for quantity is good, but user said price rolling is bad. Quantity rolling is fine/implied by "Counter component usage" */}
              <Counter value={quantity} fontSize={16} textColor="#000" speed="fast" />
              <ScalePressable onPress={() => addItem(item)}>
                <Ionicons name="add" size={14} color="#000" />
              </ScalePressable>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderMainCourseItem = (item: MenuItem) => {
    return (
      <View key={item.id} className="py-5 flex-row justify-between items-center" style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.05)' }}>
        <View className="flex-1 pr-4">
          <View className="flex-row items-center gap-1.5 mb-1">
            <View style={{ width: 12, height: 12, borderWidth: 1, borderColor: item.isVegetarian ? '#22c55e' : '#ef4444', borderRadius: 2, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: item.isVegetarian ? '#22c55e' : '#ef4444' }} />
            </View>
          </View>

          <Text className="font-bold text-white">{item.name}</Text>
          <Text className="text-slate-500 text-xs mt-1">{item.description}</Text>
          <Text className="text-white font-bold mt-1">${item.price.toFixed(2)}</Text>
        </View>

        <ScalePressable
          onPress={() => addItem(item)}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderWidth: 1,
            borderColor: 'rgba(250, 204, 21, 0.2)',
            padding: 8,
            borderRadius: 12,
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="add" size={20} color="#FACC15" />
        </ScalePressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F0F' }} edges={['right', 'left']}>
      {/* Fixed Top Navigation */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(15, 15, 15, 0.9)', paddingTop: 60, paddingBottom: 16, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.05)' }}>
        <ScalePressable
          onPress={() => navigation.goBack()}
          style={{ width: 40, height: 40, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </ScalePressable>

        <View className="flex-1 px-4">
          <Text className="text-white text-lg font-bold text-center" numberOfLines={1}>{restaurant.name}</Text>
        </View>

        <ScalePressable style={{ width: 40, height: 40, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="share-outline" size={20} color="#fff" />
        </ScalePressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 128 }}>
        {loading ? (
          <View style={{ paddingTop: 120, paddingHorizontal: 16, gap: 24 }}>
            {/* Hero Skeleton */}
            <Skeleton height={200} borderRadius={16} />

            {/* Info Block Skeleton */}
            <View style={{ gap: 12 }}>
              <Skeleton width="60%" height={32} borderRadius={8} />
              <Skeleton width="40%" height={16} borderRadius={4} />
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Skeleton width={80} height={60} borderRadius={12} />
                <Skeleton width={80} height={60} borderRadius={12} />
                <Skeleton width={80} height={60} borderRadius={12} />
              </View>
            </View>

            {/* Menu Items Skeleton */}
            <View style={{ marginTop: 24, gap: 24 }}>
              {[1, 2, 3].map((i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 16 }}>
                  <View style={{ flex: 1, gap: 8 }}>
                    <Skeleton width="80%" height={20} borderRadius={4} />
                    <Skeleton width="40%" height={16} borderRadius={4} />
                    <Skeleton width="100%" height={12} borderRadius={4} />
                  </View>
                  <Skeleton width={112} height={112} borderRadius={16} />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <>
            {/* Hero Image */}
            <View style={{ paddingTop: 120 }}>
              <View style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
                <View style={{ minHeight: 300, position: 'relative', overflow: 'hidden', borderRadius: 0 }}>
                  <Image
                    source={getSafeImageUri(restaurant.image)}
                    style={{ width: '100%', height: 300, position: 'absolute' }}
                    resizeMode="cover"
                  />
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />

                  <View style={{ flex: 1, justifyContent: 'flex-end', padding: 24, gap: 8 }}>
                    <View className="flex-row items-center gap-2">
                      <View style={{ backgroundColor: '#FACC15', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }}>
                        <Text style={{ fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.5, color: '#000' }}>Top Rated</Text>
                      </View>
                    </View>
                    <Text style={{ color: '#fff', fontSize: 30, fontWeight: '800', lineHeight: 36 }}>{restaurant.name}</Text>
                    <Text className="text-slate-400 text-sm">{restaurant.cuisine}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Quick Stats */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 16, paddingVertical: 16, marginTop: -24, position: 'relative', zIndex: 10 }}>
              <View style={{ flex: 1, minWidth: 100, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: '#1A1A1A', padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }}>
                <View className="flex-row items-center gap-1">
                  <Text style={{ fontSize: 20, fontWeight: '700', color: '#FACC15' }}>{restaurant.rating}</Text>
                  <Ionicons name="star" size={14} color="#FACC15" />
                </View>
                <Text style={{ fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, color: '#64748b' }}>Rating</Text>
              </View>

              <View style={{ flex: 1, minWidth: 100, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: '#1A1A1A', padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{restaurant.deliveryTime}</Text>
                <Text style={{ fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, color: '#64748b' }}>Mins</Text>
              </View>

              <View style={{ flex: 1, minWidth: 100, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: '#1A1A1A', padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>{restaurant.distance}</Text>
                <Text style={{ fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, color: '#64748b' }}>km away</Text>
              </View>
            </View>

            {/* Search Bar */}
            <View className="px-4 pb-4">
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 }}>
                <Ionicons name="search" size={20} color="#64748b" />
                <TextInput
                  placeholder="Search for dishes..."
                  placeholderTextColor="#64748b"
                  style={{ flex: 1, fontSize: 14, color: '#fff', padding: 0 }}
                />
              </View>
            </View>

            {/* Sticky Tabs */}
            <View style={{ backgroundColor: '#0F0F0F', borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.05)' }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 24 }}>
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setSelectedTab(tab)}
                    style={{
                      paddingBottom: 12,
                      paddingTop: 16,
                      borderBottomWidth: 2,
                      borderBottomColor: selectedTab === tab ? '#FACC15' : 'transparent',
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: '700', color: selectedTab === tab ? '#FACC15' : '#64748b' }}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Menu Sections */}
            {selectedTab === 'Best Sellers' && (
              <View>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800', paddingHorizontal: 16, paddingBottom: 16, paddingTop: 24 }}>Best Sellers</Text>
                <View className="px-4">
                  {bestSellers.map(renderBestSellerItem)}
                </View>
              </View>
            )}

            {selectedTab === 'Main Course' && (
              <View>
                <View className="flex-row items-center justify-between px-4 pb-4 pt-8">
                  <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>Main Course</Text>
                  <Text style={{ color: '#64748b', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' }}>12 Items</Text>
                </View>
                <View className="px-4">
                  {mainCourse.map(renderMainCourseItem)}
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Floating Cart Bar */}
      {totalItems > 0 && !loading && (
        <Animated.View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 32, zIndex: 50, pointerEvents: 'box-none', transform: [{ translateY: cartSlideAnim }] }}>
          <Animated.View style={{ maxWidth: 448, marginHorizontal: 'auto', pointerEvents: 'auto', transform: [{ scale: cartScaleAnim }] }}>
            <View style={{ backgroundColor: '#1F1F1F', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 16 }}>
              <View className="flex-row items-center gap-3 pl-2">
                <View style={{ backgroundColor: 'rgba(250, 204, 21, 0.2)', padding: 8, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="basket" size={20} color="#FACC15" />
                </View>
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Counter value={totalItems} fontSize={10} textColor="#64748b" speed="fast" />
                    <Text style={{ color: '#64748b', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>Item Added</Text>
                  </View>
                  <View className="flex-row items-center">
                    {/* Prices should fade or cross-dissolve instead. I'll rely on React's key change or just standard text update for now as specific 'cross-dissolve' logic is complex without a library. Or I can wrap it in an Animate.Viwe with opacity change. For now I'll stick to standard update but keep quantity animated via Counter. */}
                    <Text className="text-white font-extrabold">${totalPrice.toFixed(2)}</Text>
                    <Text style={{ color: '#64748b', fontWeight: '500', fontSize: 12, marginLeft: 4 }}>+ Taxes</Text>
                  </View>
                </View>
              </View>

              <ScalePressable
                onPress={() => navigation.navigate('Cart')}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FACC15', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 12, shadowColor: '#FACC15', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 }}
              >
                <Text style={{ fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5, color: '#000' }}>View Cart</Text>
                <Ionicons name="arrow-forward" size={18} color="#000" />
              </ScalePressable>
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default RestaurantMenuScreen;



