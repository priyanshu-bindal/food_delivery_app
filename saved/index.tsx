import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Pressable,
    Easing,
    Platform,
    Animated,
    Image,
    StatusBar,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { TabParamList, Restaurant } from '../types';

// Mock Data for Populated State
const SAVED_RESTAURANTS: Restaurant[] = [
    {
        id: 'r1',
        name: 'The Gourmet Hub',
        cuisine: 'Artisan Italian',
        rating: 4.5,
        deliveryTime: '25 min',
        distance: '1.2 km',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeF4hj9j_NcMaUeZMOErlc4BjWvNVacdl7tCSWcgTUkhpC2nmrWWLbO3j9G7PWw7JQvkfB4KqcEr0vCilQgIm7tXdnrN3ObAPG_khUfI_Ec2CMbODGhEnegCH6tK2ceGd6fXrrowILF77FxHOKRTCWMby58P6FO2bgc4NOGJk_TqfWCQETZYPt4g713I_nxrRqJj-8jVKKwQjPlR_4_ieD3-raCbPes0B9KMa-pQTzvddK1dvLqURqcKCQxNCl_keepha4d6ovSI',
        hasFreeDelivery: true,
    },
    {
        id: 'r2',
        name: 'Sushi Master',
        cuisine: 'Japanese & Seafood',
        rating: 4.8,
        deliveryTime: '40 min',
        distance: '3.5 km',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaGlC3bwsOdd4EPDrcRlKseUa_xKNK9obQ-1_GXeauyFzsJ66vzgmFjFcCPHaC8jFSo20nwE6VRw3nlXbj67_XfwJGUVF-yopBWY4O5SzE6vKZWH3sqCX92SbR8MompVQeS8qx70_NL9ZDifz8zLoFSVs-SssjpBMIRzKDmOQ9f63VEsRTaSeHs2oi2FgIpn2ioyrhSu4f5QQ3Jk0hu-60LL4MlAHVKScoMx04-xzwEFybf-73ugNQhgpRY2_1LVewjWhQJqN9K6w',
        isFavorite: true,
    },
];

type SavedScreenNavigationProp = StackNavigationProp<TabParamList, 'Saved'>;

const { width } = Dimensions.get('window');

const SavedScreen: React.FC = () => {
    const navigation = useNavigation<SavedScreenNavigationProp>();
    const isFocused = useIsFocused();

    // Toggle this to test populated/empty states
    const [hasSavedItems, setHasSavedItems] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // Animations
    const iconScaleAnim = useRef(new Animated.Value(0)).current;
    const iconFadeAnim = useRef(new Animated.Value(0)).current;
    const textSlideAnim = useRef(new Animated.Value(20)).current;
    const textFadeAnim = useRef(new Animated.Value(0)).current;
    const buttonScaleAnim = useRef(new Animated.Value(0)).current;
    const listFadeAnim = useRef(new Animated.Value(0)).current;
    const listSlideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        if (isFocused) {
            if (!hasSavedItems) {
                // Run Empty State Animation
                Animated.stagger(100, [
                    Animated.parallel([
                        Animated.spring(iconScaleAnim, {
                            toValue: 1,
                            tension: 50,
                            friction: 7,
                            useNativeDriver: true,
                        }),
                        Animated.timing(iconFadeAnim, {
                            toValue: 1,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(textSlideAnim, {
                            toValue: 0,
                            duration: 500,
                            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                            useNativeDriver: true,
                        }),
                        Animated.timing(textFadeAnim, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                    ]),
                    Animated.spring(buttonScaleAnim, {
                        toValue: 1,
                        tension: 40,
                        friction: 7,
                        useNativeDriver: true,
                    }),
                ]).start();
            } else {
                // Run Populated State Animation
                Animated.parallel([
                    Animated.timing(listFadeAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.spring(listSlideAnim, {
                        toValue: 0,
                        tension: 50,
                        friction: 9,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        } else {
            // Reset animations on blur for re-entry
            iconScaleAnim.setValue(0);
            iconFadeAnim.setValue(0);
            textSlideAnim.setValue(20);
            textFadeAnim.setValue(0);
            buttonScaleAnim.setValue(0);
            listFadeAnim.setValue(0);
            listSlideAnim.setValue(30);
        }
    }, [isFocused, hasSavedItems]);

    const handleExplore = () => {
        // Navigate to Explore Tab
        navigation.navigate('Explore');
    };

    const SavedRestaurantCard = ({ item, index }: { item: Restaurant; index: number }) => {
        const scaleAnim = useRef(new Animated.Value(1)).current;

        const onPressIn = () => {
            Animated.spring(scaleAnim, {
                toValue: 0.96,
                useNativeDriver: true,
                speed: 20,
                bounciness: 0,
            }).start();
        };

        const onPressOut = () => {
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                speed: 20,
                bounciness: 4,
            }).start();
        };

        return (
            <Pressable
                onPress={() => {
                    // Slight delay to allow animation to feel "completed" before nav logic might block JS thread
                    requestAnimationFrame(() => {
                        navigation.navigate('Explore', {
                            screen: 'RestaurantMenu',
                            params: { restaurant: item }
                        } as any);
                    });
                }}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })} // Add opacity feedback too
            >
                <Animated.View
                    style={[
                        styles.cardContainer,
                        { transform: [{ scale: scaleAnim }] }
                    ]}
                >
                    <View style={{ position: 'relative' }}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.heartContainer}>
                            <Ionicons name="heart" size={18} color="#EC3713" />
                        </View>
                        {item.hasFreeDelivery && (
                            <View style={styles.badgeContainer}>
                                <Text style={styles.badgeText}>Free Delivery</Text>
                            </View>
                        )}
                    </View>

                    <View style={{ padding: 16, backgroundColor: '#1A1A1A' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                            <Text style={styles.restaurantName} numberOfLines={1}>{item.name}</Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>{item.rating}</Text>
                                <Ionicons name="star" size={12} color="#fff" />
                            </View>
                        </View>

                        <Text style={styles.cuisineText}>{item.cuisine}</Text>

                        <View style={styles.metaContainer}>
                            <View style={styles.metaItem}>
                                <Ionicons name="time-outline" size={14} color="#64748b" />
                                <Text style={styles.metaText}>{item.deliveryTime}</Text>
                            </View>
                            <View style={styles.metaDivider} />
                            <View style={styles.metaItem}>
                                <Ionicons name="location-outline" size={14} color="#64748b" />
                                <Text style={styles.metaText}>{item.distance}</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </Pressable>
        );
    };

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="light-content" backgroundColor="#221310" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Saved</Text>

                {/* Test Controls Menu */}
                <View style={{ position: 'relative', zIndex: 100 }}>
                    <TouchableOpacity
                        onPress={() => setShowMenu(!showMenu)}
                        style={{
                            padding: 8,
                            backgroundColor: 'rgba(34, 197, 94, 0.2)', // Green background for visibility
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: 'rgba(34, 197, 94, 0.3)'
                        }}
                    >
                        <Ionicons name="ellipsis-vertical" size={20} color="#4ade80" />
                    </TouchableOpacity>

                    {showMenu && (
                        <View style={styles.menuDropdown}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => {
                                    setHasSavedItems(false);
                                    setShowMenu(false);
                                }}
                            >
                                <Ionicons name="trash-outline" size={18} color="#fff" />
                                <Text style={styles.menuText}>Clear Test</Text>
                            </TouchableOpacity>
                            <View style={styles.menuDivider} />
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={() => {
                                    setHasSavedItems(true);
                                    setShowMenu(false);
                                }}
                            >
                                <Ionicons name="duplicate-outline" size={18} color="#fff" />
                                <Text style={styles.menuText}>Fill Test</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.content}>
                {!hasSavedItems ? (
                    // Empty State
                    <View style={styles.emptyStateContainer}>
                        <Animated.View
                            style={{
                                opacity: iconFadeAnim,
                                transform: [{ scale: iconScaleAnim }],
                                marginBottom: 24,
                            }}
                        >
                            <View style={styles.iconCircle}>
                                <Ionicons name="heart" size={48} color="#EC3713" />
                            </View>
                        </Animated.View>

                        <Animated.View
                            style={{
                                opacity: textFadeAnim,
                                transform: [{ translateY: textSlideAnim }],
                                alignItems: 'center',
                                width: '100%',
                                paddingHorizontal: 32,
                            }}
                        >
                            <Text style={styles.emptyTitle}>No saved restaurants yet</Text>
                            <Text style={styles.emptySubtitle}>
                                Tap the heart icon on restaurants to save them for later
                            </Text>
                        </Animated.View>

                        <Animated.View
                            style={{
                                transform: [{ scale: buttonScaleAnim }],
                                marginTop: 32,
                            }}
                        >
                            <TouchableOpacity
                                onPress={handleExplore}
                                activeOpacity={0.8}
                                style={styles.ctaButton}
                            >
                                <Text style={styles.ctaText}>Explore Restaurants</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                ) : (
                    // Populated State
                    <Animated.ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        style={{
                            flex: 1,
                            opacity: listFadeAnim,
                            transform: [{ translateY: listSlideAnim }]
                        }}
                    >
                        {SAVED_RESTAURANTS.map((item, index) => (
                            <View key={item.id} style={{ marginBottom: 16 }}>
                                <SavedRestaurantCard item={item} index={index} />
                            </View>
                        ))}
                        <View style={{ height: 80 }} />
                    </Animated.ScrollView>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#221310',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 0.5,
    },
    content: {
        flex: 1,
    },
    // Empty State Styles
    emptyStateContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80, // Visual balance
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(236, 55, 19, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(236, 55, 19, 0.2)',
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 22,
    },
    ctaButton: {
        backgroundColor: '#EC3713',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 16,
        shadowColor: '#EC3713',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    ctaText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    // Card Styles
    listContent: {
        padding: 16,
    },
    cardContainer: {
        backgroundColor: '#1A1A1A',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: 160,
    },
    heartContainer: {
        position: 'absolute',
        right: 12,
        top: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    badgeContainer: {
        position: 'absolute',
        left: 12,
        top: 12,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backdropFilter: 'blur(4px)',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        flex: 1,
        marginRight: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#22c55e',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        gap: 2,
    },
    ratingText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 12,
    },
    cuisineText: {
        color: '#94a3b8',
        fontSize: 13,
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingTop: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        color: '#cbd5e1', // Slate 300
        fontSize: 12,
        fontWeight: '500',
    },
    metaDivider: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#475569',
        marginHorizontal: 8,
    },
    testButton: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    testButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    menuDropdown: {
        position: 'absolute',
        top: 40,
        right: 0,
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        padding: 8,
        minWidth: 150,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        gap: 8,
    },
    menuText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    menuDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginHorizontal: 4,
    },
});

export default SavedScreen;
