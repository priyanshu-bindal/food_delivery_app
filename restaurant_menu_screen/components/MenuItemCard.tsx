import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import type { MenuItem } from '../../types';
import { getSafeImageUri } from '../../utils/imageHelpers';

import Counter from './Counter';

interface MenuItemCardProps {
  item: MenuItem;
  quantity?: number;
  onAdd: () => void;
  onRemove: () => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  quantity = 0,
  onAdd,
  onRemove,
}) => {
  return (
    <View className="bg-surface-dark p-4 mb-4 shadow-sm" style={{ borderRadius: 12 }}>
      <View className="flex-row gap-4">
        {/* Food Image */}
        <View className="w-24 h-24 overflow-hidden" style={{ borderRadius: 8 }}>
          <Image
            source={getSafeImageUri(item.image)}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Item Details */}
        <View className="flex-1 justify-between">
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                {item.name}
              </Text>
              {/* Veg/Non-veg indicator */}
              <View
                className={`w-4 h-4 ${item.isVegetarian
                  ? 'bg-green-500'
                  : 'bg-red-500'
                  }`}
                style={{ borderRadius: 9999 }}
              />
            </View>

            <Text className="text-sm text-gray-600 dark:text-gray-300 mb-2" numberOfLines={2}>
              {item.description}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-primary">
              ₹{item.price}
            </Text>

            {quantity === 0 ? (
              <TouchableOpacity
                onPress={onAdd}
                className="bg-primary w-8 h-8 items-center justify-center"
                style={{ borderRadius: 9999 }}
              >
                <Text className="text-white font-bold text-lg">+</Text>
              </TouchableOpacity>
            ) : (
              <View className="flex-row items-center bg-gray-100 dark:bg-zinc-800 rounded-full px-2 py-1 gap-3">
                <TouchableOpacity onPress={onRemove}>
                  <Text className="text-primary font-bold text-lg">-</Text>
                </TouchableOpacity>
                <Counter value={quantity} fontSize={14} textColor="#EC3713" />
                <TouchableOpacity onPress={onAdd}>
                  <Text className="text-primary font-bold text-lg">+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default MenuItemCard;
