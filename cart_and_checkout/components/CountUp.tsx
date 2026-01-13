import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Text, Animated, StyleProp, TextStyle, View } from 'react-native';

interface CountUpProps {
    to: number;
    from?: number;
    duration?: number; // duration in seconds
    style?: StyleProp<TextStyle>;
    className?: string; // For NativeWind
    separator?: string;
    onStart?: () => void;
    onEnd?: () => void;
}

const CountUp: React.FC<CountUpProps> = ({
    to,
    from = 0,
    duration = 2,
    style,
    className,
    separator = '',
    onStart,
    onEnd,
}) => {
    const animatedValue = useRef(new Animated.Value(from)).current;
    // Initialize state with the correctly formatted 'from' or 'to' value depending on direction, 
    // but usually we start at 'from' or the current animated value.
    // For simplicity in this adaptation, we rely on the listener to update the state.

    // Need to define getDecimalPlaces and formatValue outside or memoized
    const getDecimalPlaces = useCallback((num: number): number => {
        const str = num.toString();
        if (str.includes('.')) {
            const decimals = str.split('.')[1];
            if (parseInt(decimals) !== 0) {
                return decimals.length;
            }
        }
        return 0;
    }, []);

    const formatValue = useCallback(
        (value: number) => {
            // Determine max decimals from 'from' and 'to' to ensure consistent formatting
            const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

            const options: Intl.NumberFormatOptions = {
                useGrouping: !!separator,
                minimumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
                maximumFractionDigits: maxDecimals > 0 ? maxDecimals : 0
            };

            const formattedNumber = new Intl.NumberFormat('en-US', options).format(value);
            return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
        },
        [from, to, separator, getDecimalPlaces]
    );

    const [displayValue, setDisplayValue] = useState(formatValue(from));

    useEffect(() => {
        // Calculate spring physics based on duration input
        // User logic: 
        // damping = 20 + 40 * (1 / duration);
        // stiffness = 100 * (1 / duration);

        // Safety check for duration to avoid division by zero
        const safeDuration = duration > 0 ? duration : 0.001;

        const damping = 20 + 40 * (1 / safeDuration);
        const stiffness = 100 * (1 / safeDuration);

        if (onStart) onStart();

        const listenerId = animatedValue.addListener(({ value }) => {
            setDisplayValue(formatValue(value));
        });

        Animated.spring(animatedValue, {
            toValue: to,
            useNativeDriver: false, // Must be false to listen to value updates in JS
            stiffness,
            damping,
            mass: 1,
        }).start(({ finished }) => {
            if (finished && onEnd) {
                onEnd();
            }
        });

        return () => {
            animatedValue.removeListener(listenerId);
            // animatedValue.removeAllListeners(); // Safer cleanup
        };
    }, [to, duration, onStart, onEnd, animatedValue, formatValue]);

    return (
        <Text style={style} className={className}>
            {displayValue}
        </Text>
    );
};

export default CountUp;
