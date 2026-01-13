import React, { useRef } from 'react';
import { Pressable, Animated, ViewStyle, PressableProps, StyleProp } from 'react-native';

interface ScalePressableProps extends PressableProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    scaleTo?: number;
    duration?: number;
    activeOpacity?: number; // Optional, to combine scale with opacity
    className?: string;
}

const ScalePressable: React.FC<ScalePressableProps> = ({
    children,
    style,
    scaleTo = 0.96,
    duration = 75,
    activeOpacity = 0.7,
    onPressIn,
    onPressOut,
    ...props
}) => {
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    const handlePressIn = (event: any) => {
        Animated.parallel([
            Animated.timing(scale, {
                toValue: scaleTo,
                duration: duration,
                useNativeDriver: true,
            }),
            activeOpacity !== undefined ? Animated.timing(opacity, {
                toValue: activeOpacity,
                duration: duration,
                useNativeDriver: true,
            }) : null,
        ].filter(Boolean) as Animated.CompositeAnimation[]).start();

        onPressIn?.(event);
    };

    const handlePressOut = (event: any) => {
        Animated.parallel([
            Animated.timing(scale, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
            }),
            activeOpacity !== undefined ? Animated.timing(opacity, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
            }) : null,
        ].filter(Boolean) as Animated.CompositeAnimation[]).start();

        onPressOut?.(event);
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            {...props}
        >
            <Animated.View style={[style, { transform: [{ scale }], opacity: activeOpacity !== undefined ? opacity : 1 }]}>
                {children}
            </Animated.View>
        </Pressable>
    );
};

export default ScalePressable;
