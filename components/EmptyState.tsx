import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface EmptyStateProps {
    icon?: keyof typeof Ionicons.glyphMap;
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    imageSource?: any; // Optional image instead of icon
}

const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    message,
    actionLabel,
    onAction,
    imageSource,
}) => {
    return (
        <View className="flex-1 items-center justify-center p-8 bg-[#221310]">
            <View className="w-24 h-24 bg-white/5 rounded-full items-center justify-center mb-6 border border-white/10">
                {imageSource ? (
                    <Image source={imageSource} className="w-12 h-12 opacity-50" resizeMode="contain" />
                ) : (
                    <Ionicons name={icon || 'alert-circle-outline'} size={48} color="rgba(255,255,255,0.3)" />
                )}
            </View>

            <Text className="text-xl font-bold text-white text-center mb-2">{title}</Text>
            <Text className="text-slate-400 text-center text-sm leading-relaxed mb-8 px-4">
                {message}
            </Text>

            {actionLabel && onAction && (
                <TouchableOpacity
                    onPress={onAction}
                    className="bg-[#ec3713] px-8 py-3 rounded-xl active:opacity-90 shadow-lg shadow-orange-500/20"
                >
                    <Text className="text-white font-bold text-sm uppercase tracking-wide">
                        {actionLabel}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default EmptyState;
