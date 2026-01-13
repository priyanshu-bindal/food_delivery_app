import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Animated, Image, Dimensions, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCartStore } from '../store/cartStore';
import ScalePressable from '../components/ScalePressable';

const { width } = Dimensions.get('window');

const COUPONS = [
    {
        id: '1',
        code: 'WELCOME10', // Changed to match visual or generic
        value: 10,
        title: 'Flat 10% OFF',
        description: 'Welcome offer for new users',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK-sYZVOWWZ2vA-zC4ic51vZ86jADvaBPJ_4sYK4bQTH-IJO5M6LHPGt7xbzuXWncJd5ucX1xoBpjZSILRlxID6ZFIl6MRBjZ1AXPWobS6vInjxYJB40TNOay9Qm5DCbLfuJp0OV_ZvcqNLwb-SRFiGAUO_Yb4BD_UjG8pVP0j-ES4snvwVua5zkIYhMznRNr-BAu8Y38TeyXtk0DDFxgOGFDwDUBf9coy39urmtSxB2aLbq54uCQNW-6uUNKmPFlZvoBXBtPT2O8', // Using one of the provided images
        bg: '#1A1A1A'
    },
    {
        id: '2',
        code: 'TASTY25',
        value: 25,
        title: 'Flat 25% OFF',
        description: 'Get 25% off on orders above $30',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuDqm31zSY2CRZmAAQRWrkFvVYM_xn9HYQ-48DaBxFxCDhhLOp5RO_rudMev9XZfoOE6mvlQf18Rsci84NdwMTOojljZI5cw8lJ23Wos54nHVOBgVfLzsE33gSZ7F--ofzqoWhoiWsk7BfM4-YUf_0N17dGgiqj3tDTPgVrfRWI5I8ICmdVCb_e_NJrq5Tb7OV1qH4zO7Pv8RmV4LM_dcZeWKpNBqPBXiWU4Y9EcSaTBElvzKj3V5PvTmgsmHl2cIzfPgrCQIRPhc',
        bg: '#1A1A1A'
    },
    {
        id: '3',
        code: 'SUPER50',
        value: 50,
        title: 'Flat 50% OFF',
        description: 'Mega discount on fine dining',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmwyohX0cd_7KYsPWSkuV7hnpVXrZClXuvr09nZkH2Stz8QO5Qeoes5HHuQeCmEF9WJIuZkp32ekBuj9lcRQpG330_YdzUYjNBOvJif0Aj9f_fL9cDKliebV8y2DYmPOfIGCHu5zl_PHDjXx0p6WXN2piJ4UsC_z6aX_SSVL3AQj-BhdEHoaLBlbTX5cSQkFszNLu04khzxQs787ao3_TejuGrOtDpMWLdrDrp9N-PB4egHzEF1w0SIkeDWsn2dj7C8-gzuwQlvPw',
        bg: '#1A1A1A'
    }
];

const ApplyCouponsScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    // 'ApplyCoupons' is the stack route name (from Cart). 'Offers' is the tab route name.
    const isApplyMode = route.name === 'ApplyCoupons';
    const { applyCoupon, appliedCoupon } = useCartStore();

    // Animation States
    const [successVisible, setSuccessVisible] = useState(false);
    const successOpacity = useRef(new Animated.Value(0)).current;
    const successScale = useRef(new Animated.Value(0.8)).current;

    // Manual Code Input
    const [manualCode, setManualCode] = useState('');

    const handleApply = (coupon: typeof COUPONS[0], onComplete?: () => void, showAnimation: boolean = true) => {
        applyCoupon({
            code: coupon.code,
            value: coupon.value,
            description: coupon.title
        });

        if (showAnimation) {
            showSuccessAnimation();
        }

        // Navigate back delay
        setTimeout(() => {
            if (onComplete) {
                onComplete();
            } else if (navigation.canGoBack()) {
                navigation.goBack();
            }
        }, showAnimation ? 1200 : 100);
    };

    const handleManualApply = () => {
        const trimmedCode = manualCode.trim().toUpperCase();
        const matchedCoupon = COUPONS.find(c => c.code.toUpperCase() === trimmedCode);

        if (matchedCoupon) {
            handleApply(matchedCoupon);
            setManualCode('');
        } else {
            // Could add error state here
            alert('Invalid coupon code');
        }
    };

    const showSuccessAnimation = () => {
        setSuccessVisible(true);
        Animated.parallel([
            Animated.timing(successOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(successScale, {
                toValue: 1,
                friction: 6,
                useNativeDriver: true,
            })
        ]).start();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#221310' }}>
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/5 bg-[#221310] z-10">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="w-10 h-10 items-center justify-center rounded-full bg-white/5 active:bg-white/10">
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white ">Offers & Discounts</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>

                {/* Manual Code Input - Minimal */}
                <View className="flex-row items-center gap-3 mb-8">
                    <View className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 h-12 flex-row items-center">
                        <TextInput
                            value={manualCode}
                            onChangeText={setManualCode}
                            placeholder="Enter Promo Code"
                            placeholderTextColor="#64748b"
                            className="flex-1 text-white font-medium text-sm tracking-wider uppercase h-full"
                            autoCapitalize="characters"
                            returnKeyType="done"
                            onSubmitEditing={handleManualApply}
                        />
                    </View>
                    <TouchableOpacity
                        className={`h-12 px-6 rounded-xl items-center justify-center ${manualCode ? 'bg-[#ec3713]' : 'bg-white/10'}`}
                        onPress={handleManualApply}
                        disabled={!manualCode}
                    >
                        <Text className={`font-bold text-xs uppercase tracking-wider ${manualCode ? 'text-white' : 'text-white/30'}`}>Apply</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-lg font-bold text-white/90 mb-5 px-1">Available Coupons</Text>

                {/* Coupon List - Minimal Rows */}
                <View className="gap-4">
                    {COUPONS.map((coupon) => {
                        const isApplied = appliedCoupon?.code === coupon.code;

                        return (
                            <View
                                key={coupon.id}
                                className="flex-row items-center gap-4 py-4 border-b border-white/5"
                            >
                                {/* Image/Icon */}
                                <View className="w-12 h-12 rounded-full bg-white/5 border border-white/10 overflow-hidden shrink-0">
                                    <Image
                                        source={{ uri: coupon.image }}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>

                                {/* Content */}
                                <View className="flex-1 gap-1">
                                    <View className="flex-row items-center gap-2">
                                        <Text className="text-base font-bold text-white tracking-wide">{coupon.code}</Text>
                                        <View className="bg-[#10b981]/10 px-1.5 py-0.5 rounded">
                                            <Text className="text-[#10b981] text-[9px] font-bold uppercase">{coupon.value}% OFF</Text>
                                        </View>
                                    </View>
                                    <Text className="text-slate-400 text-xs leading-relaxed" numberOfLines={2}>{coupon.description}</Text>
                                </View>

                                {/* Action */}
                                <TouchableOpacity
                                    onPress={() => {
                                        if (isApplyMode) {
                                            // From Cart: Apply and Go Back
                                            handleApply(coupon, undefined, true);
                                        } else {
                                            // From Offers Tab: Apply and Go to Explore/Home
                                            handleApply(coupon, () => (navigation as any).navigate('Explore'), false);
                                        }
                                    }}
                                    className={`flex-row items-center gap-1 px-3 py-1.5 rounded-lg border ${isApplyMode ? 'bg-[#10b981]/10 border-[#10b981]/20' : 'bg-[#ec3713]/10 border-[#ec3713]/20'}`}
                                >
                                    <Text className={`${isApplyMode ? 'text-[#10b981]' : 'text-[#ec3713]'} font-bold text-xs uppercase tracking-wide`}>
                                        {isApplyMode ? 'Apply' : 'Order Now'}
                                    </Text>
                                    <Ionicons
                                        name={isApplyMode ? "checkmark-circle" : "arrow-forward"}
                                        size={14}
                                        color={isApplyMode ? "#10b981" : "#ec3713"}
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

            </ScrollView>

            {successVisible && (
                <Animated.View
                    style={{
                        opacity: successOpacity,
                        transform: [{ scale: successScale }],
                        position: 'absolute',
                        bottom: 100,
                        alignSelf: 'center',
                        backgroundColor: '#fff',
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        borderRadius: 9999,
                        flexDirection: 'row',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.3,
                        shadowRadius: 20,
                        elevation: 10,
                        zIndex: 100
                    }}
                >
                    <MaterialIcons name="auto-awesome" size={20} color="#dcb34c" style={{ marginRight: 8 }} />
                    <Text className="text-[#121212] font-bold text-sm">Congrats! Coupon Applied</Text>
                </Animated.View>
            )}

        </SafeAreaView>
    );
};

export default ApplyCouponsScreen;
