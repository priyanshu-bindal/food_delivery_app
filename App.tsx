import React, { useRef, useEffect } from 'react';
import { View, Animated, ActivityIndicator, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

// Store
import { useAuthStore } from './store/authStore';

// Context
import { ToastProvider } from './context/ToastContext';

// Screens
import HomeDiscoveryScreen from './home_discovery_screen';
import RestaurantMenuScreen from './restaurant_menu_screen';
import CartScreen from './cart_and_checkout';
import LiveOrderTrackingScreen from './live_order_tracking';
import UserProfileScreen from './user_profile_and_history';
import OrdersScreen from './orders_screen';
// SavedScreen removed
import OrderConfirmationScreen from './order_confirmation';
import ApplyCouponsScreen from './apply_coupons';
import AuthScreen from './auth';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeDiscoveryScreen} />
      <Stack.Screen name="RestaurantMenu" component={RestaurantMenuScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="OrderTracking" component={LiveOrderTrackingScreen} />
      <Stack.Screen name="ApplyCoupons" component={ApplyCouponsScreen} />
    </Stack.Navigator>
  );
}

const AnimatedTabIcon = ({ focused, name, color, size }: { focused: boolean; name: any; color: string; size: number }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focused) {
      // Pop animation: 0.9 -> 1.1 -> 1
      scale.setValue(0.9);
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <MaterialIcons name={name} size={size} color={color} />
    </Animated.View>
  );
};

export default function App() {
  const { isAuthenticated, isLoading, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#221310', alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#ec3713" />
      </View>
    );
  }

  return (
    <ToastProvider>
      {isAuthenticated ? (
        <NavigationContainer theme={DarkTheme}>
          <StatusBar style="light" />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: '#0F0F0F',
                borderTopColor: 'rgba(255, 255, 255, 0.05)',
                borderTopWidth: 1,
                paddingBottom: 8,
                paddingTop: 8,
                height: 65,
              },
              tabBarActiveTintColor: '#ec3713',
              tabBarInactiveTintColor: '#64748B',
              tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginTop: 4,
              },
            }}
          >
            <Tab.Screen
              name="Explore"
              component={HomeStack}
              options={{
                tabBarLabel: 'EXPLORE',
                tabBarIcon: ({ color, size, focused }) => (
                  <AnimatedTabIcon focused={focused} name="explore" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Orders"
              component={OrdersScreen}
              options={{
                tabBarLabel: 'ORDERS',
                tabBarIcon: ({ color, size, focused }) => (
                  <AnimatedTabIcon focused={focused} name="receipt-long" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Offers"
              component={ApplyCouponsScreen}
              options={{
                tabBarLabel: 'OFFERS',
                tabBarIcon: ({ color, size, focused }) => (
                  <AnimatedTabIcon focused={focused} name="local-offer" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={UserProfileScreen}
              options={{
                tabBarLabel: 'PROFILE',
                tabBarIcon: ({ color, size, focused }) => (
                  <AnimatedTabIcon focused={focused} name="person" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <AuthScreen />
      )}
    </ToastProvider>
  );
}
