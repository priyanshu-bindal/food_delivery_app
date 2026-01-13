import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const STEPS = [
    { id: 1, title: 'Order Confirmed', time: '10:30 AM', status: 'completed' },
    { id: 2, title: 'Preparing', time: '10:35 AM', status: 'completed' },
    { id: 3, title: 'Picked Up', time: '10:50 AM', status: 'completed' },
    { id: 4, title: 'On the way to you', time: '11:00 AM', status: 'active' },
    { id: 5, title: 'Delivered', time: 'Est. 11:15 AM', status: 'pending' },
];

const OrderStatusTimeline: React.FC = () => {
    const progressHeight = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // 1. Animate Line Height (Mount)
        Animated.timing(progressHeight, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false, // Height doesn't support native driver
        }).start();

        // 2. Pulse Animation (Continuous)
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Order Status</Text>

            <View style={styles.timelineContainer}>
                {/* Continuous Line Background */}
                <View style={styles.lineBackground} />

                {/* Animated Progress Line */}
                <Animated.View
                    style={[
                        styles.lineProgress,
                        {
                            height: progressHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '75%'], // Adjust based on active step
                            }),
                        },
                    ]}
                />

                {STEPS.map((step, index) => {
                    const isActive = step.status === 'active';
                    const isCompleted = step.status === 'completed';
                    const isPending = step.status === 'pending';

                    return (
                        <View key={step.id} style={styles.stepContainer}>
                            {/* Dot Indicator */}
                            <View style={styles.iconContainer}>
                                {isActive ? (
                                    <Animated.View style={[styles.activeDot, { transform: [{ scale: pulseAnim }] }]}>
                                        <View style={styles.innerDot} />
                                    </Animated.View>
                                ) : (
                                    <View
                                        style={[
                                            styles.dot,
                                            isCompleted ? styles.completedDot : styles.pendingDot,
                                        ]}
                                    >
                                        {isCompleted && <Ionicons name="checkmark" size={12} color="#fff" />}
                                    </View>
                                )}
                            </View>

                            {/* Text Content */}
                            <View style={styles.contentContainer}>
                                <Text
                                    style={[
                                        styles.title,
                                        isPending && styles.pendingText,
                                        isActive && styles.activeText,
                                    ]}
                                >
                                    {step.title}
                                </Text>
                                <Text style={styles.time}>{step.time}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    header: {
        color: '#9ca3af',
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 24,
    },
    timelineContainer: {
        position: 'relative',
    },
    lineBackground: {
        position: 'absolute',
        left: 13, // Adjusted for larger dot (30px / 2 - 2px / 2)
        top: 15,
        bottom: 34, // Don't go past last dot
        width: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    lineProgress: {
        position: 'absolute',
        left: 13,
        top: 15,
        width: 2,
        backgroundColor: '#ec3713',
    },
    stepContainer: {
        flexDirection: 'row',
        marginBottom: 32,
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 28, // Increased width container
        alignItems: 'center',
        marginRight: 16,
    },
    dot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    completedDot: {
        backgroundColor: '#22c55e',
        borderColor: '#22c55e',
    },
    pendingDot: {
        backgroundColor: '#221310',
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    activeDot: {
        width: 30, // Increased active dot size
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(236, 55, 19, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerDot: {
        width: 14, // Increased inner dot
        height: 14,
        borderRadius: 7,
        backgroundColor: '#ec3713',
    },
    contentContainer: {
        flex: 1,
        marginTop: 4, // Align text with dot center
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500', // Default font weight
        marginBottom: 4,
    },
    activeText: {
        color: '#ec3713',
        fontWeight: '700', // Bold active text
    },
    pendingText: {
        color: 'rgba(255, 255, 255, 0.4)',
    },
    time: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default OrderStatusTimeline;
