import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../../store/cartStore';
import type { CartItem } from '../../types';
import ScalePressable from '../../components/ScalePressable';
import { getSafeImageUri } from '../../utils/imageHelpers';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  const handleIncrement = () => {
    increaseQty(item.id);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      decreaseQty(item.id);
    } else {
      removeItem(item.id);
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, minHeight: 72 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <Image
          source={getSafeImageUri(item.image)}
          style={{ width: 64, height: 64, borderRadius: 12 }}
          resizeMode="cover"
        />
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', lineHeight: 24 }} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={{ color: '#ec3713', fontSize: 14, fontWeight: '600', lineHeight: 20 }}>
            ${item.price.toFixed(2)}
          </Text>
        </View>
      </View>

      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 4, borderRadius: 9999, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <ScalePressable
            onPress={handleDecrement}
            style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <Ionicons name="remove" size={14} color="#fff" />
          </ScalePressable>

          <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff', minWidth: 16, textAlign: 'center' }}>
            {item.quantity}
          </Text>

          <ScalePressable
            onPress={handleIncrement}
            style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ec3713' }}
          >
            <Ionicons name="add" size={14} color="#fff" />
          </ScalePressable>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;
