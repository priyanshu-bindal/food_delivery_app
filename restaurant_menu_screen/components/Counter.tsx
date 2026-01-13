import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Easing, TextStyle, ViewStyle } from 'react-native';

interface CounterProps {
    value: number | string;
    fontSize?: number;
    textColor?: string;
    speed?: 'fast' | 'slow';
}

const Digit = ({ value, fontSize, textColor, speed = 'fast' }: { value: string | number; fontSize: number; textColor: string; speed?: 'fast' | 'slow' }) => {
    const isNumber = !isNaN(Number(value)) && value !== ' ' && value !== '';
    const numericValue = isNumber ? Number(value) : 0;

    // Initialize with 0 if not a number to prevent crash, but we won't animate if it's not a number
    const animatedValue = useRef(new Animated.Value(numericValue)).current;

    useEffect(() => {
        if (isNumber) {
            Animated.spring(animatedValue, {
                toValue: numericValue,
                useNativeDriver: true,
                stiffness: speed === 'fast' ? 150 : 60,
                damping: speed === 'fast' ? 20 : 25,
                mass: 1,
            }).start();
        }
    }, [numericValue, speed, isNumber]);

    const translateY = animatedValue.interpolate({
        inputRange: [0, 9],
        outputRange: [0, -fontSize * 9], // Adjust loop for stack
    });

    if (!isNumber) {
        return (
            <View style={{ height: fontSize, justifyContent: 'center', alignItems: 'center', width: fontSize * 0.6 }}>
                <Text style={{ fontSize: fontSize * 0.8, color: textColor, fontWeight: 'bold' }}>
                    {value}
                </Text>
            </View>
        );
    }

    return (
        <View style={{ height: fontSize, overflow: 'hidden', width: fontSize * 0.6 }}>
            <Animated.View style={{ transform: [{ translateY }] }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <View key={num} style={{ height: fontSize, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: fontSize * 0.8, color: textColor, fontWeight: 'bold' }}>
                            {num}
                        </Text>
                    </View>
                ))}
            </Animated.View>
        </View>
    );
};

const Counter: React.FC<CounterProps> = ({ value, fontSize = 16, textColor = '#fff', speed = 'fast' }) => {
    const valueString = typeof value === 'number' ? value.toFixed(value % 1 === 0 ? 0 : 2) : String(value);
    const digits = valueString.split('');

    return (
        <View style={styles.container}>
            {digits.map((digit, index) => (
                <Digit
                    key={`${index}-${digits.length}`}
                    value={digit}
                    fontSize={fontSize}
                    textColor={textColor}
                    speed={speed}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Counter;
