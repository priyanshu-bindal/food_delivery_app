import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useCartStore } from '../store/cartStore';

type OrderConfirmationScreenProp = StackNavigationProp<RootStackParamList, 'OrderConfirmation'>;

const { width } = Dimensions.get('window');
const CONFIRMATION_DURATION = 2200;

const OrderConfirmationScreen: React.FC = () => {
    const navigation = useNavigation<OrderConfirmationScreenProp>();
    const { clearCart } = useCartStore();

    // Animation Values
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const checkScaleAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Clear the cart as soon as we land here (or could be after animation)
        // Doing it here ensures if they somehow go back, it's empty.
        clearCart();

        // 1. Entrance Animation
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();

        // 2. Checkmark Pop
        Animated.sequence([
            Animated.delay(400),
            Animated.spring(checkScaleAnim, {
                toValue: 1,
                friction: 6,
                useNativeDriver: true,
            }),
            // 3. Subtle Pulse
            Animated.timing(pulseAnim, {
                toValue: 1.1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start();

        // 4. Auto Navigation
        const timer = setTimeout(() => {
            navigation.replace('OrderTracking', { orderId: 'new_order' });
        }, CONFIRMATION_DURATION);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#221310" />

            <Animated.View
                style={[
                    styles.content,
                    {
                        opacity: opacityAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
            >
                {/* Pulsing Circle Background */}
                <Animated.View style={[styles.circle, { transform: [{ scale: pulseAnim }] }]}>
                    <Animated.View style={[styles.checkContainer, { transform: [{ scale: checkScaleAnim }] }]}>
                        <Ionicons name="checkmark" size={64} color="#221310" />
                    </Animated.View>
                </Animated.View>

                <Text style={styles.title}>Order Confirmed!</Text>
                <Text style={styles.subtitle}>Your food is being prepared</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#221310',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
    },
    circle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#ec3713',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        shadowColor: '#ec3713',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
    },
    checkContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: '500',
    },
});

export default OrderConfirmationScreen;
