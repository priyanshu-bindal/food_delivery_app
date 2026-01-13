import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';
import { useCartStore } from '../store/cartStore';
import Skeleton from '../components/Skeleton';
import { getSafeImageUri } from '../utils/imageHelpers';

import ScalePressable from '../components/ScalePressable';

// Shared Skeleton imported instead

const HAS_ORDERS = true;

const OrdersScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { clearCart, addItem } = useCartStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1000ms fake loading
        return () => clearTimeout(timer);
    }, []);

    const ongoingOrder = {
        id: '101',
        restaurant: 'The Gourmet Hub',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeF4hj9j_NcMaUeZMOErlc4BjWvNVacdl7tCSWcgTUkhpC2nmrWWLbO3j9G7PWw7JQvkfB4KqcEr0vCilQgIm7tXdnrN3ObAPG_khUfI_Ec2CMbODGhEnegCH6tK2ceGd6fXrrowILF77FxHOKRTCWMby58P6FO2bgc4NOGJk_TqfWCQETZYPt4g713I_nxrRqJj-8jVKKwQjPlR_4_ieD3-raCbPes0B9KMa-pQTzvddK1dvLqURqcKCQxNCl_keepha4d6ovSI',
        status: 'On the way',
        eta: '15 mins',
        items: 'Truffle Mushroom Risotto x 2, Herb Crusted Salmon',
    };

    const pastOrders = [
        {
            id: '99',
            restaurantId: '1', // Adding restaurantId for reorder
            restaurant: 'Spice Avenue',
            date: 'Jan 10, 2024, 7:30 PM',
            total: 45.00,
            status: 'Delivered',
            itemsStr: 'Butter Chicken, Naan x 3',
            items: [
                {
                    id: '101',
                    name: 'Butter Chicken',
                    price: 36.00,
                    quantity: 1,
                    restaurantId: '1',
                    // Adding minimal required fields to match MenuItem type if needed
                    description: 'Rich tomato gravy',
                    isVeg: false,
                    category: 'Main Course',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeF4hj9j_NcMaUeZMOErlc4BjWvNVacdl7tCSWcgTUkhpC2nmrWWLbO3j9G7PWw7JQvkfB4KqcEr0vCilQgIm7tXdnrN3ObAPG_khUfI_Ec2CMbODGhEnegCH6tK2ceGd6fXrrowILF77FxHOKRTCWMby58P6FO2bgc4NOGJk_TqfWCQETZYPt4g713I_nxrRqJj-8jVKKwQjPlR_4_ieD3-raCbPes0B9KMa-pQTzvddK1dvLqURqcKCQxNCl_keepha4d6ovSI' // Placeholder
                },
                {
                    id: '102',
                    name: 'Naan',
                    price: 3.00,
                    quantity: 3,
                    restaurantId: '1',
                    description: 'Soft indian bread',
                    isVeg: true,
                    category: 'Breads',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeF4hj9j_NcMaUeZMOErlc4BjWvNVacdl7tCSWcgTUkhpC2nmrWWLbO3j9G7PWw7JQvkfB4KqcEr0vCilQgIm7tXdnrN3ObAPG_khUfI_Ec2CMbODGhEnegCH6tK2ceGd6fXrrowILF77FxHOKRTCWMby58P6FO2bgc4NOGJk_TqfWCQETZYPt4g713I_nxrRqJj-8jVKKwQjPlR_4_ieD3-raCbPes0B9KMa-pQTzvddK1dvLqURqcKCQxNCl_keepha4d6ovSI'
                }
            ]
        },
        {
            id: '95',
            restaurantId: '2',
            restaurant: 'Sushi World',
            date: 'Jan 05, 2024, 1:15 PM',
            total: 32.50,
            status: 'Delivered',
            itemsStr: 'Salmon Roll, Miso Soup',
            items: [
                {
                    id: '201',
                    name: 'Salmon Roll',
                    price: 24.50,
                    quantity: 1,
                    restaurantId: '2',
                    description: 'Fresh salmon',
                    isVeg: false,
                    category: 'Sushi',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaGlC3bwsOdd4EPDrcRlKseUa_xKNK9obQ-1_GXeauyFzsJ66vzgmFjFcCPHaC8jFSo20nwE6VRw3nlXbj67_XfwJGUVF-yopBWY4O5SzE6vKZWH3sqCX92SbR8MompVQeS8qx70_NL9ZDifz8zLoFSVs-SssjpBMIRzKDmOQ9f63VEsRTaSeHs2oi2FgIpn2ioyrhSu4f5QQ3Jk0hu-60LL4MlAHVKScoMx04-xzwEFybf-73ugNQhgpRY2_1LVewjWhQJqN9K6w'
                },
                {
                    id: '202',
                    name: 'Miso Soup',
                    price: 8.00,
                    quantity: 1,
                    restaurantId: '2',
                    description: 'Soybean soup',
                    isVeg: true,
                    category: 'Soups',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaGlC3bwsOdd4EPDrcRlKseUa_xKNK9obQ-1_GXeauyFzsJ66vzgmFjFcCPHaC8jFSo20nwE6VRw3nlXbj67_XfwJGUVF-yopBWY4O5SzE6vKZWH3sqCX92SbR8MompVQeS8qx70_NL9ZDifz8zLoFSVs-SssjpBMIRzKDmOQ9f63VEsRTaSeHs2oi2FgIpn2ioyrhSu4f5QQ3Jk0hu-60LL4MlAHVKScoMx04-xzwEFybf-73ugNQhgpRY2_1LVewjWhQJqN9K6w'
                }
            ]
        },
        {
            id: '92',
            restaurantId: '3',
            restaurant: 'Pizza Paradise',
            date: 'Jan 01, 2024, 8:45 PM',
            total: 28.00,
            status: 'Cancelled',
            itemsStr: 'Pepperoni Large',
            items: [
                {
                    id: '301',
                    name: 'Pepperoni Large',
                    price: 28.00,
                    quantity: 1,
                    restaurantId: '3',
                    description: 'Spicy pepperoni',
                    isVeg: false,
                    category: 'Pizza',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeF4hj9j_NcMaUeZMOErlc4BjWvNVacdl7tCSWcgTUkhpC2nmrWWLbO3j9G7PWw7JQvkfB4KqcEr0vCilQgIm7tXdnrN3ObAPG_khUfI_Ec2CMbODGhEnegCH6tK2ceGd6fXrrowILF77FxHOKRTCWMby58P6FO2bgc4NOGJk_TqfWCQETZYPt4g713I_nxrRqJj-8jVKKwQjPlR_4_ieD3-raCbPes0B9KMa-pQTzvddK1dvLqURqcKCQxNCl_keepha4d6ovSI'
                }
            ]
        },
    ];

    const handleReorder = (order: typeof pastOrders[0]) => {
        clearCart();
        order.items.forEach(item => {
            // Add item multiple times based on quantity, or improved logic if addItem supported quantity. 
            // The existing addItem increments by 1. So loop.
            for (let i = 0; i < item.quantity; i++) {
                addItem(item as any); // Type assertion as mock items might slightly differ from full MenuItem
            }
        });
        (navigation as any).navigate('Explore', { screen: 'Cart' });
    };

    if (!HAS_ORDERS) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, paddingBottom: 100 }}>
                    <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(236, 55, 19, 0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                        <Ionicons name="receipt-outline" size={64} color="#ec3713" />
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 8, textAlign: 'center' }}>No orders yet</Text>
                    <Text style={{ fontSize: 16, color: '#94a3b8', textAlign: 'center', marginBottom: 32, lineHeight: 24 }}>Your past orders will appear here once you make a purchase.</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomeScreen')}
                        style={{ backgroundColor: '#ec3713', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 9999, width: '100%', alignItems: 'center' }}
                    >
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Browse Restaurants</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
            <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.05)' }}>
                <Text style={{ fontSize: 24, fontWeight: '800', color: '#fff' }}>Orders</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {isLoading ? (
                    <View>
                        <View style={{ marginBottom: 32 }}>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Ongoing Order</Text>
                            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 24, padding: 16, borderWidth: 1, borderColor: '#ec3713' }}>
                                <View style={{ gap: 16 }}>
                                    <Skeleton height={48} borderRadius={12} style={{ opacity: 0.5 }} />
                                    <Skeleton height={40} borderRadius={12} style={{ opacity: 0.5 }} />
                                </View>
                            </View>
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Past Orders</Text>
                        {/* Past Orders Skeleton List */}
                        <View style={{ gap: 16 }}>
                            {[1, 2, 3].map((key) => (
                                <View key={key} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 16, padding: 16 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <View style={{ gap: 8 }}>
                                            <Skeleton width={120} height={20} borderRadius={4} />
                                            <Skeleton width={80} height={14} borderRadius={4} />
                                        </View>
                                        <Skeleton width={60} height={20} borderRadius={4} />
                                    </View>
                                    <Skeleton width="100%" height={14} borderRadius={4} style={{ marginBottom: 16 }} />
                                    <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', marginBottom: 12 }} />
                                    <View style={{ alignItems: 'center' }}>
                                        <Skeleton width={80} height={16} borderRadius={4} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : (
                    <>
                        {/* Section 1: Ongoing Order */}
                        {ongoingOrder && (
                            <View style={{ marginBottom: 32 }}>
                                <Text style={{ fontSize: 12, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Ongoing Order</Text>
                                <ScalePressable
                                    onPress={() => (navigation as any).navigate('Explore', { screen: 'OrderTracking', params: { orderId: ongoingOrder.id } })}
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 24, padding: 16, borderWidth: 1, borderColor: '#ec3713' }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <Image
                                            source={getSafeImageUri(ongoingOrder.image)}
                                            style={{ width: 48, height: 48, borderRadius: 12 }}
                                            resizeMode="cover"
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>{ongoingOrder.restaurant}</Text>
                                            <Text style={{ color: '#ec3713', fontSize: 14, fontWeight: '600', marginTop: 2 }}>{ongoingOrder.status} • {ongoingOrder.eta}</Text>
                                        </View>
                                    </View>

                                    <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginBottom: 16 }} />

                                    <View
                                        style={{ backgroundColor: '#ec3713', paddingVertical: 12, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
                                    >
                                        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>Track Order</Text>
                                        <Ionicons name="arrow-forward" size={16} color="#fff" />
                                    </View>
                                </ScalePressable>
                            </View>
                        )}

                        {/* Section 2: Past Orders */}
                        <View>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Past Orders</Text>

                            <View style={{ gap: 16 }}>
                                {pastOrders.map((order) => (
                                    <ScalePressable key={order.id} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 16, padding: 16 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                            <View>
                                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>{order.restaurant}</Text>
                                                <Text style={{ color: '#94a3b8', fontSize: 12 }}>{order.date}</Text>
                                            </View>
                                            <View style={{ alignItems: 'flex-end' }}>
                                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>${order.total.toFixed(2)}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                                                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: order.status === 'Delivered' ? '#22c55e' : '#ef4444' }} />
                                                    <Text style={{ color: order.status === 'Delivered' ? '#22c55e' : '#ef4444', fontSize: 12, fontWeight: '600' }}>{order.status}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <Text style={{ color: '#64748b', fontSize: 13, marginBottom: 16, lineHeight: 20 }} numberOfLines={1}>{order.itemsStr}</Text>

                                        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', marginBottom: 12 }} />

                                        <TouchableOpacity
                                            onPress={() => handleReorder(order)}
                                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                                        >
                                            <Text style={{ color: '#ec3713', fontWeight: '700', fontSize: 14, textTransform: 'uppercase' }}>Reorder</Text>
                                            <Ionicons name="refresh" size={16} color="#ec3713" />
                                        </TouchableOpacity>
                                    </ScalePressable>
                                ))}
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrdersScreen;
