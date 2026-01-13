import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import type { CategoryCarouselProps } from '../../types';
import { categories } from '../data';
import ScalePressable from '../../components/ScalePressable';

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  categories: categoriesData = categories,
  onCategoryPress,
}) => {
  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="gap-5"
      >
        {categoriesData.map((category) => (
          <ScalePressable
            key={category.id}
            onPress={() => onCategoryPress?.(category)}
          >
            <View className="items-center gap-2">
              <View
                className="w-16 h-16 p-1 border-2"
                style={{
                  borderRadius: 9999,
                  backgroundColor: category.isActive ? 'rgba(236, 55, 19, 0.1)' : '#321e1a',
                  borderColor: category.isActive ? '#ec3713' : 'transparent',
                }}
              >
                <Image
                  source={{ uri: category.image }}
                  className="w-full h-full"
                  style={{ borderRadius: 9999 }}
                  resizeMode="cover"
                />
              </View>
              <Text
                className="text-xs font-medium"
                style={{ color: category.isActive ? '#ffffff' : '#9ca3af' }}
              >
                {category.name}
              </Text>
            </View>
          </ScalePressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryCarousel;
