import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../store/authStore';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const AuthScreen = () => {
    const { loginWithGoogle, continueAsGuest } = useAuthStore();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Animation Values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleGoogleLogin = async () => {
        setIsLoggingIn(true);
        await loginWithGoogle();
        // setIsLoggingIn(false); // No need to set false as screen will unmount/switch
    };

    return (
        <View className="flex-1 bg-[#221310] items-center justify-center relative">
            <StatusBar style="light" />

            {/* Background Pattern/Gradient could go here */}
            <View className="absolute top-0 left-0 right-0 h-1/2 bg-[#ec3713]/5 rounded-b-[100px]" />

            <Animated.View
                style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
                className="w-full px-8 items-center"
            >
                {/* Logo / Icon */}
                <View className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 mb-8 shadow-2xl shadow-[#ec3713]/20">
                    <Image
                        source={require('../assets/avatar.jpg')}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Text */}
                <Text className="text-3xl font-bold text-white text-center mb-3">Welcome to BETOR</Text>
                <Text className="text-slate-400 text-center text-base mb-12 leading-relaxed">
                    Order your favorite meals, track them in real-time, and enjoy exclusive deals.
                </Text>

                {/* Buttons */}
                <View className="w-full gap-4">
                    {/* Google Button */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handleGoogleLogin}
                        disabled={isLoggingIn}
                        className="bg-white h-14 rounded-xl flex-row items-center justify-center relative overflow-hidden"
                    >
                        {isLoggingIn ? (
                            <ActivityIndicator color="#000" />
                        ) : (
                            <>
                                <View className="absolute left-4">
                                    <Ionicons name="logo-google" size={24} color="#000" />
                                </View>
                                <Text className="text-black font-bold text-base">Continue with Google</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Guest Button */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={continueAsGuest}
                        disabled={isLoggingIn}
                        className="h-14 rounded-xl items-center justify-center"
                    >
                        <Text className="text-slate-400 font-bold text-sm tracking-wide">Continue as Guest</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>

            {/* Footer Info */}
            <View className="absolute bottom-10">
                <Text className="text-white/20 text-xs text-center">
                    By continuing, you agree to our Terms & Privacy
                </Text>
            </View>
        </View>
    );
};

export default AuthScreen;
