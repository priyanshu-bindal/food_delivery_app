import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type?: ToastType;
    onHide: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onHide, duration = 3000 }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: -20,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                onHide();
            });
        }, duration);

        return () => clearTimeout(timer);
    }, []);

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return '#10b981'; // Emerald 500
            case 'error':
                return '#ef4444'; // Red 500
            default:
                return '#3b82f6'; // Blue 500
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return 'checkmark-circle';
            case 'error':
                return 'alert-circle';
            default:
                return 'information-circle';
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor: getBackgroundColor(), opacity, transform: [{ translateY }] },
            ]}
        >
            <Ionicons name={getIcon()} size={20} color="#fff" />
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 60, // Safe area top offset
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
        zIndex: 9999,
        gap: 12,
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        flex: 1,
    },
});

export default Toast;
