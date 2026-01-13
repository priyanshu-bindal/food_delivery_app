import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DeliveryPartnerCard: React.FC = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.card,
                {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <View style={styles.driverInfo}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                            style={styles.avatarImage}
                        />
                        <View style={styles.initialsOverlay}>
                            <Text style={styles.initialsText}>JD</Text>
                        </View>
                    </View>
                    <View style={styles.badge}>
                        <Ionicons name="star" size={10} color="#000" />
                        <Text style={styles.ratingText}>4.8</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.vehicle}>Red Scooter • KA 01 AB 1234</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.callButton}>
                    <Ionicons name="call" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.messageButton}>
                    <Ionicons name="chatbubble-ellipses" size={20} color="rgba(255,255,255,0.7)" />
                    <Text style={[styles.buttonText, { color: 'rgba(255,255,255,0.7)' }]}>Message</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 24,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2d3748',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    initialsOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    initialsText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 18,
    },
    badge: {
        position: 'absolute',
        bottom: -4,
        alignSelf: 'center',
        backgroundColor: '#FACC15',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 999,
        gap: 2,
    },
    ratingText: {
        color: '#000',
        fontSize: 10,
        fontWeight: '800',
    },
    name: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 4,
    },
    vehicle: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    callButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ec3713',
        paddingVertical: 12,
        borderRadius: 16,
        gap: 8,
    },
    messageButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Reduced opacity bg
        paddingVertical: 12,
        borderRadius: 16,
        gap: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
});

export default DeliveryPartnerCard;
