import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Easing,
} from 'react-native';
import type { PromoCarouselProps } from '../../types';

import { getSafeImageUri } from '../../utils/imageHelpers';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 300;
const CARD_SPACING = 16;
const AUTO_SCROLL_INTERVAL = 3000; // 3 seconds
const PAUSE_DURATION = 5000; // 5 seconds pause after manual interaction

const PromoCarousel: React.FC<PromoCarouselProps> = ({
  promos = [
    {
      id: '1',
      title: 'Flash Deal',
      subtitle: 'On your first 3 orders this week',
      discount: '50% OFF',
      buttonText: 'ORDER NOW',
      backgroundColor: '#ec3713',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA5TLg_QZhTvsUiBrvCy4YoWmt4QIWTb_8kXd9PeRLuXDOJVGbnHu5mQ7eSoaJM2Xg_Wfu0lylmGR4-6kq5USVpRUSHBVvUK5PKazsLzFyoqxgkQPRAlo8XsOCz1O4FRIwaIQsX8-sKGRqSEBCG_7bs3U5OrBiMadtgZ4c1ggJOS13z3sCA9ajjYMSvaozbxoPWfnwQVmysodUNS25Ne5mwSWiaKFO8hQryOOJzwlJOhlY3NQe2fpaF_M1lUv6lOFsSVi2DNphUGU',
      type: 'flash-deal',
    },
    {
      id: '2',
      title: 'Limited Time',
      subtitle: 'Delivery on all premium sushi spots',
      discount: 'FREE',
      buttonText: 'VIEW DEALS',
      backgroundColor: '#2d3436',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp6_ZgGxm5EczR9hDwCnVTN-1SGLpMkLIH-ZuB-XPGPyGneBa5STLmWfonCIJ8J3NOWkE3V5xJzpUPIEn7KrA8IGXa_1v54MuckP0rYl4F-BCwTM7nWb7YBkmZ6zlZlJ2Ixhw_z86jOMuCiK0Z5T_wEA0epcZbZmX6Qutnl6P1MQNingsE_oQlusftckAB12HMV2eYSLnlbYgnWYNuXitmq_QPGWHI3rbpOXNhKNTx6unVAO-XW4Y_KJgXAjBDkOMmcEw0NW0FP9o',
      type: 'limited-time',
    },
    {
      id: '3',
      title: 'Weekend Special',
      subtitle: 'Perfect for family gatherings',
      discount: '30% OFF',
      buttonText: 'EXPLORE',
      backgroundColor: '#6c5ce7',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBilknx9nWGnbwW-oo2BbPOETZUfmX96kYzaqJSHN8E4U2mNC7GJVdsolCVBmAnEVasaPYwFptCRGvQZ2IaJdE4Pkd7avYqr09kmvVok4_Q3hOdfVXJqoNSWWhKNhoITrblfw-pm1Szt1NihxXLhNOV5BQwR4n99VJdspsQmE3VCljGLvgq9GvI1L7ZvjRFAJdexLZ2c6SmxQo3dX13gZ8aMzCGoqrOrY7h_NXrBJ_ADCVJVproZ3xuRt6GJUUKQ4755CnzI-Uzd_s',
      type: 'limited-time',
    },
    {
      id: '4',
      title: 'New User Bonus',
      subtitle: 'Welcome to our food family',
      discount: '$10 OFF',
      buttonText: 'CLAIM NOW',
      backgroundColor: '#00b894',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsnvUCb-CbcH4qOsNOWQtYhwKVXPizL7-XuWbtu_BLO0NbMby8s_EKXRNQWMgMnzebwK4Rh_9AstlhXnrjj6FYp5T4H-40xgJkRJk3z8CiWAJQm1kCCgbaB7cMSfZb8NqEnAMBuV9qARxQs6fhrHCdQRgZduvGdGm-i-X62WPD_6nB8A-NPrpzfhelt7WH_gQAfkpVAy-_Ova3i079oEeHdd--jSZEY-FkOxH7XcNYbsjlm8Yndmv7i6YXlbRTwcc3UDTvV4cvWm8',
      type: 'flash-deal',
    },
  ],
  onPromoPress,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused || promos.length <= 1) return;

    const interval = setInterval(() => {
      scrollToNextBanner();
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, promos.length]);

  // Scroll to next banner with animation
  const scrollToNextBanner = () => {
    const nextIndex = (currentIndex + 1) % promos.length;

    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0.7,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Scroll to next
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);

      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  // Handle manual scroll end
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (CARD_WIDTH + CARD_SPACING));

    if (index !== currentIndex) {
      setCurrentIndex(index);

      // Pause auto-scroll and resume after delay
      setIsPaused(true);

      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      pauseTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, PAUSE_DURATION);
    }
  };

  // Render individual promo card
  const renderPromoCard = ({ item }: { item: typeof promos[0] }) => (
    <TouchableOpacity
      onPress={() => onPromoPress?.(item)}
      className="relative overflow-hidden mx-2"
      style={{
        width: CARD_WIDTH,
        height: 176,
        borderRadius: 12,
        backgroundColor: item.backgroundColor
      }}
    >
      {/* Gradient Overlay */}
      <View
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: 'transparent',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '60%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
        />
      </View>

      {/* Background Image */}
      <Image
        source={getSafeImageUri(item.backgroundImage)}
        className="absolute right-0 top-0 h-full w-1/2"
        resizeMode="cover"
      />

      {/* Content */}
      <Animated.View
        className="relative z-20 p-6 justify-center flex-1"
        style={{
          maxWidth: 180,
          opacity: fadeAnim,
        }}
      >
        <Text className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          {item.title}
        </Text>
        <Text className="text-3xl font-bold leading-tight mt-1" style={{ color: '#ffffff' }}>
          {item.discount}
        </Text>
        <Text className="text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          {item.subtitle}
        </Text>
        <TouchableOpacity
          onPress={() => onPromoPress?.(item)}
          className={`mt-4 px-4 py-2 self-start ${item.type === 'flash-deal' ? 'bg-white' : 'bg-primary'
            }`}
          style={{ borderRadius: 9999 }}
        >
          <Text
            className={`text-xs font-bold ${item.type === 'flash-deal' ? 'text-primary' : 'text-white'
              }`}
          >
            {item.buttonText}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );

  // Render dot indicators
  const renderDotIndicators = () => (
    <View className="flex-row justify-center items-center mt-4 gap-2">
      {promos.map((_, index) => (
        <View
          key={index}
          className={`h-2 rounded-full transition-all ${index === currentIndex
            ? 'w-6 bg-primary'
            : 'w-2 bg-gray-400 dark:bg-gray-600'
            }`}
          style={{
            backgroundColor: index === currentIndex ? '#ec3713' : '#9ca3af',
            width: index === currentIndex ? 24 : 8,
            height: 8,
            borderRadius: 4,
          }}
        />
      ))}
    </View>
  );

  // Entry animation
  const entryFadeAnim = useRef(new Animated.Value(0)).current;
  const entrySlideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entryFadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(entrySlideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      className="mt-8"
      style={{
        opacity: entryFadeAnim,
        transform: [{ translateY: entrySlideAnim }]
      }}
    >
      <FlatList
        ref={flatListRef}
        data={promos}
        renderItem={renderPromoCard}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 8 }}
        onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + CARD_SPACING,
          offset: (CARD_WIDTH + CARD_SPACING) * index,
          index,
        })}
      />
    </Animated.View>
  );
};

export default PromoCarousel;
