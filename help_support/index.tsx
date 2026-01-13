import React, { useEffect, useRef } from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Color Palette derived from your HTML (Dark Mode)
const COLORS = {
    background: '#212121',      // bg-background-dark
    card: '#2a2a2a',            // bg-surface-dark
    border: '#27272a',          // border-zinc-800
    primary: '#1f7af9',         // text-primary / bg-primary
    text: '#ffffff',            // text-white
    textSub: '#9ca3af',         // text-gray-400
    primaryLight: 'rgba(31, 122, 249, 0.1)',
    primaryBadge: 'rgba(31, 122, 249, 0.2)',
};

const HelpSupportScreen: React.FC = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <SafeAreaView style={{ backgroundColor: COLORS.background }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (navigation.canGoBack()) {
                                navigation.goBack();
                            }
                        }}
                        style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: COLORS.card }}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel="Go back to Profile"
                    >
                        <MaterialIcons name="arrow-back-ios" size={18} color={COLORS.text} style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.text, fontSize: 13, fontWeight: '800', flex: 1, textAlign: 'center', paddingRight: 40, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                        Support Center
                    </Text>
                </View>
            </SafeAreaView>

            <Animated.ScrollView
                style={{ flex: 1, opacity: fadeAnim }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 32 }}
            >
                {/* Hero Section */}
                <View style={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 }}>
                    <Text style={{ fontSize: 32, fontWeight: '800', color: COLORS.text, marginBottom: 24, lineHeight: 40 }}>
                        How can we{'\n'}
                        <Text style={{ color: COLORS.primary }}>help you?</Text>
                    </Text>

                    {/* Search Bar - Updated Radius to 12 to match rounded-xl */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 16, paddingVertical: 14 }}>
                        <MaterialIcons name="search" size={24} color={COLORS.textSub} style={{ marginRight: 12 }} />
                        <TextInput
                            style={{ flex: 1, color: COLORS.text, fontSize: 16, fontWeight: '500' }}
                            placeholder="Search topics, orders..."
                            placeholderTextColor={COLORS.textSub}
                            editable={false}
                        />
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={{ marginBottom: 32 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 }}>
                        <Text style={{ color: COLORS.textSub, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                            Quick Actions
                        </Text>
                        <View style={{ backgroundColor: COLORS.primaryBadge, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 }}>
                            <Text style={{ fontSize: 10, color: COLORS.primary, fontWeight: '700' }}>
                                RECENT ORDER #9281
                            </Text>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 16, gap: 12 }}>
                        {/* Action Card 1 */}
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: COLORS.border }}
                            activeOpacity={0.8}
                        >
                            <View style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                                <MaterialIcons name="local-shipping" size={24} color={COLORS.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
                                    Where is my order?
                                </Text>
                                <Text style={{ color: COLORS.textSub, fontSize: 12 }}>
                                    Estimated delivery in 12 mins
                                </Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color={COLORS.textSub} />
                        </TouchableOpacity>

                        {/* Action Card 2 */}
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: COLORS.border }}
                            activeOpacity={0.8}
                        >
                            <View style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                                <MaterialIcons name="report-problem" size={24} color={COLORS.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
                                    Report missing item
                                </Text>
                                <Text style={{ color: COLORS.textSub, fontSize: 12 }}>
                                    Request a refund for missing contents
                                </Text>
                            </View>
                            <MaterialIcons name="chevron-right" size={24} color={COLORS.textSub} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <View style={{ marginBottom: 32 }}>
                    <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
                        <Text style={{ color: COLORS.textSub, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                            Categories
                        </Text>
                    </View>

                    <View style={{ paddingHorizontal: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
                        {/* Category Cards */}
                        {[
                            { icon: 'payments', label: 'Payment Issues' },
                            { icon: 'attach-money', label: 'Refunds' },
                            { icon: 'menu-book', label: 'App Guide' },
                            { icon: 'shield', label: 'Account Safety' },
                        ].map((category, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{ width: '48%', backgroundColor: COLORS.card, borderRadius: 12, padding: 20, borderWidth: 1, borderColor: COLORS.border }}
                                activeOpacity={0.8}
                                accessibilityRole="button"
                                accessibilityLabel={category.label}
                            >
                                <MaterialIcons name={category.icon as any} size={32} color={COLORS.primary} />
                                <Text style={{ color: COLORS.text, fontSize: 14, fontWeight: '700', marginTop: 12 }}>
                                    {category.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Footer CTA */}
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <Text style={{ color: COLORS.textSub, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                            Still need help?
                        </Text>
                        <View style={{ flexDirection: 'row', marginLeft: -8 }}>
                            <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: COLORS.background, backgroundColor: COLORS.primary, overflow: 'hidden', zIndex: 2 }}>
                                <Image
                                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPOsD4ahzrZHcRf4NzCGGqiJfbTE2z-buN_H0tyvh23m2uXQC6xG08KmkcNDkpY-VJ41sQDzdgXW5uIKjC9zi9sqSu6srNXWavXHZPDt6dVYON5lcNyb0trPwr2FfHmwj9YbEvNp1fX1OZD1Gkm11aJGQekhCdGGju46rfQpq609Isi8rNljgxTdNukNSBSc0pIaZVhzfp9RrlYW3nmzbMfsM84NjjGGK0pQ_ilXRvyJDDNgag2lfOpxaQ_wSoMCUSRNCPFTzhK6s" }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>
                            <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: COLORS.background, backgroundColor: '#6366f1', overflow: 'hidden', marginLeft: -8, zIndex: 1 }}>
                                <Image
                                    source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcuSUMqGDobf4uuMH5NZFg-4vgwdjnxKp2HdYhLFRtr0Llj8m0uvz7-rXpCFUhQ_8ZfCdpcPcIudknigJINqp7LGuckt2ylQAkcqri0ZbDgenbSugyGuCLdEN9PwZunDf8xqZv3peFmBJn3dDpAU0cUjtPFqCDO2ia9fdI04w6XtlmCImOVOeqDs5fcWwHfVFtyQ6hG5Pv4YKQ89pxnSmI93V3CIg2XQ6fyybp1TUpFmVqFGb-x2Q33CkcMAJVUVLzE7d_DoJjcmk" }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        {/* Live Chat Button */}
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }}
                            activeOpacity={0.8}
                            accessibilityRole="button"
                            accessibilityLabel="Live Chat Support"
                        >
                            <MaterialIcons name="chat-bubble" size={20} color="#fff" />
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Live Chat</Text>
                        </TouchableOpacity>

                        {/* Call Support Button */}
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: COLORS.card, borderRadius: 12, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: COLORS.border }}
                            activeOpacity={0.8}
                            accessibilityRole="button"
                            accessibilityLabel="Call Support"
                        >
                            <MaterialIcons name="call" size={20} color={COLORS.primary} />
                            <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '700' }}>Call Support</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
};

export default HelpSupportScreen;