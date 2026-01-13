import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions, SafeAreaView, StatusBar, ImageBackground, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';
import { useToast } from '../context/ToastContext';

// Components
import OrderStatusTimeline from './components/OrderStatusTimeline';
import DeliveryPartnerCard from './components/DeliveryPartnerCard';

type OrderTrackingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OrderTracking'>;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const LiveOrderTrackingScreen: React.FC = () => {
    const navigation = useNavigation<OrderTrackingScreenNavigationProp>();
    const { showToast } = useToast();

    // Map Placeholder Pulse Animation
    const mapPulse = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Clear cart when tracking screen mounts (after confirmation)
        // This prevents the flash of empty cart during navigation
        const timer = setTimeout(() => {
            const { clearCart } = require('../store/cartStore').useCartStore.getState();
            clearCart();
        }, 100);

        Animated.loop(
            Animated.sequence([
                Animated.timing(mapPulse, {
                    toValue: 1.1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(mapPulse, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBack);
        return () => {
            backHandler.remove();
            clearTimeout(timer);
        };
    }, []);

    const isNavigating = useRef(false);

    const handleBack = () => {
        if (isNavigating.current) return true;
        isNavigating.current = true;

        // Show success message
        showToast('Order placed successfully 🎉', 'success', 2000);

        // Navigate to Orders tab using parent navigator
        // This safely switches to the Orders tab without triggering RESET errors
        const parent = navigation.getParent();
        if (parent) {
            parent.navigate('Orders');
        }

        return true;
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#221310' }}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Map Section */}
            <View style={{ height: SCREEN_HEIGHT * 0.45, width: '100%', position: 'relative', overflow: 'hidden' }}>
                <ImageBackground
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGVlU5G_SQnsM1kEecy92xaWVz-fWmrBrbQ_a11ALzMZZEBBw7Jxwfnp-VZDKNhvLUlJDb2Us9yA76P0fADK8VWXqO5kQS1A86Dpg2pJKCK7LAXm86_D9fw6SHS1S88U1Hx30xaIT8JWgjyt_NG_h3NHvEoaJwuRoxVELrulTKDo5Hbt0qi0LCs0e2JvNcPx7SkzmqcBA2X7iYmRDskCalaqoq_cS_mnoxCdtSoW_TB4Vjlk-q-R3eQtf3TF2CDACTezBBVKHZYgE' }}
                    style={{ flex: 1, backgroundColor: '#1a1a1a' }}
                    resizeMode="cover"
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' }}>
                        {/* Pulse Marker */}
                        <Animated.View style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            backgroundColor: 'rgba(236, 55, 19, 0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: [{ scale: mapPulse }]
                        }}>
                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#ec3713', borderWidth: 3, borderColor: '#fff' }} />
                        </Animated.View>
                    </View>
                </ImageBackground>

                {/* Header */}
                <SafeAreaView style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 }}>
                        <TouchableOpacity
                            onPress={handleBack}
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: 'rgba(255,255,255,0.1)'
                            }}
                        >
                            <Ionicons name="arrow-back" size={20} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ flex: 1, alignItems: 'center', marginRight: 40 }}>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
                                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Tracking Order</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            {/* Bottom Sheet Section */}
            <View style={{
                flex: 1,
                backgroundColor: '#221310',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                marginTop: -32,
                overflow: 'hidden'
            }}>
                <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 4 }}>
                    <View style={{ width: 48, height: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }} />
                </View>

                <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                    {/* ETA Header */}
                    <View style={{ padding: 24, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <Text style={{ color: '#9ca3af', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Estimated Arrival</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
                            <Text style={{ color: '#fff', fontSize: 36, fontWeight: '800', lineHeight: 40 }}>Arriving in 15</Text>
                            <Text style={{ color: '#9ca3af', fontSize: 20, fontWeight: '600' }}>mins</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e' }} />
                            <Text style={{ color: '#22c55e', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 }}>Live tracking enabled</Text>
                        </View>
                    </View>

                    {/* Tracking Steps */}
                    <View style={{ paddingTop: 24 }}>
                        <OrderStatusTimeline />
                    </View>

                    {/* Delivery Partner */}
                    <View style={{ paddingHorizontal: 24 }}>
                        <Text style={{ color: '#9ca3af', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Your Delivery Partner</Text>
                        <DeliveryPartnerCard />
                    </View>

                </ScrollView>
            </View>
        </View>
    );
};

export default LiveOrderTrackingScreen;
