import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';

// Toggle this to test Empty State
const HAS_SAVED = true;

const SavedScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const savedRestaurants = [
        {
            id: '1',
            name: 'The Gourmet Hub',
            cuisine: 'Artisan Italian',
            rating: 4.5,
            deliveryTime: '25 min',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPeF4hj9j_NcMaUeZMOErlc4BjWvNVacdl7tCSWcgTUkhpC2nmrWWLbO3j9G7PWw7JQvkfB4KqcEr0vCilQgIm7tXdnrN3ObAPG_khUfI_Ec2CMbODGhEnegCH6tK2ceGd6fXrrowILF77FxHOKRTCWMby58P6FO2bgc4NOGJk_TqfWCQETZYPt4g713I_nxrRqJj-8jVKKwQjPlR_4_ieD3-raCbPes0B9KMa-pQTzvddK1dvLqURqcKCQxNCl_keepha4d6ovSI',
            distance: '1.2'
        },
        {
            id: '2',
            name: 'Sushi World',
            cuisine: 'Japanese • Sushi',
            rating: 4.8,
            deliveryTime: '40 min',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaGlC3bwsOdd4EPDrcRlKseUa_xKNK9obQ-1_GXeauyFzsJ66vzgmFjFcCPHaC8jFSo20nwE6VRw3nlXbj67_XfwJGUVF-yopBWY4O5SzE6vKZWH3sqCX92SbR8MompVQeS8qx70_NL9ZDifz8zLoFSVs-SssjpBMIRzKDmOQ9f63VEsRTaSeHs2oi2FgIpn2ioyrhSu4f5QQ3Jk0hu-60LL4MlAHVKScoMx04-xzwEFybf-73ugNQhgpRY2_1LVewjWhQJqN9K6w',
            distance: '3.5'
        },
        {
            id: '3',
            name: 'Spice Avenue',
            cuisine: 'Indian • Curry',
            rating: 4.2,
            deliveryTime: '30 min',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7mMgEa_yVbU_jG_T5Fj5r5_Q-345345', // Placeholder, using a generic if fails but mimicking real data
            // Since I cannot ensure external URLs work, I will reuse the first image for stability if needed, or stick to the ones provided in other files
            // Reusing a safe one from previous files to avoid broken images if the above hypothetical one fails.
            // Let's use the first one again for safety in this mock.
            // Actually, I'll just use the first image as a placeholder for consistency, 
            // but distinct names.
            distance: '2.8'
        }
    ];

    // Fix image for 3rd item to ensure it renders
    savedRestaurants[2].image = savedRestaurants[0].image;


    if (!HAS_SAVED) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, paddingBottom: 100 }}>
                    <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(236, 55, 19, 0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                        <Ionicons name="heart-outline" size={64} color="#ec3713" />
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 8, textAlign: 'center' }}>No saved restaurants</Text>
                    <Text style={{ fontSize: 16, color: '#94a3b8', textAlign: 'center', marginBottom: 32, lineHeight: 24 }}>Tap the heart icon on any restaurant to save it to your collection.</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomeScreen')}
                        style={{ backgroundColor: '#ec3713', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 9999, width: '100%', alignItems: 'center' }}
                    >
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Explore Restaurants</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
            <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.05)' }}>
                <Text style={{ fontSize: 24, fontWeight: '800', color: '#fff' }}>Saved</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View style={{ gap: 16 }}>
                    {savedRestaurants.map((restaurant) => (
                        <TouchableOpacity
                            key={restaurant.id}
                            onPress={() => navigation.navigate('RestaurantMenu', { restaurant: restaurant as any })}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 16, overflow: 'hidden' }}
                        >
                            <View style={{ padding: 12, flexDirection: 'row', gap: 12 }}>
                                <Image
                                    source={{ uri: restaurant.image }}
                                    style={{ width: 88, height: 88, borderRadius: 12 }}
                                    resizeMode="cover"
                                />
                                <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 4 }}>
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', flex: 1, marginRight: 8 }} numberOfLines={1}>{restaurant.name}</Text>
                                            <Ionicons name="heart" size={20} color="#ec3713" />
                                        </View>
                                        <Text style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>{restaurant.cuisine}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}>
                                            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>{restaurant.rating}</Text>
                                            <Ionicons name="star" size={10} color="#FACC15" />
                                        </View>
                                        <Text style={{ color: '#94a3b8', fontSize: 12 }}>•</Text>
                                        <Text style={{ color: '#94a3b8', fontSize: 12 }}>{restaurant.deliveryTime}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SavedScreen;
