import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../../store/cartStore';

const CouponInput: React.FC = () => {
  const navigation = useNavigation<any>();
  const { appliedCoupon, removeCoupon } = useCartStore();

  return (
    <View style={{ marginTop: 16 }}>
      {appliedCoupon ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderRadius: 16, backgroundColor: 'rgba(57, 255, 20, 0.05)', padding: 16, borderWidth: 1, borderColor: 'rgba(57, 255, 20, 0.2)' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(57, 255, 20, 0.1)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="pricetag" size={20} color="#39ff14" />
            </View>
            <View>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', lineHeight: 20 }}>'{appliedCoupon.code}' Applied</Text>
              <Text style={{ color: '#39ff14', fontSize: 12, fontWeight: '500', lineHeight: 18 }}>You saved with {appliedCoupon.code}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={removeCoupon} style={{ padding: 8 }}>
            <Text style={{ color: '#ef4444', fontSize: 12, fontWeight: '700' }}>REMOVE</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('Offers')}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(236, 55, 19, 0.2)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="pricetag-outline" size={20} color="#ec3713" />
            </View>
            <View>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: '700', lineHeight: 20 }}>Apply Coupon</Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 12, fontWeight: '400', lineHeight: 18 }}>Save up to $10 more</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ color: '#ec3713', fontSize: 14, fontWeight: '700', lineHeight: 20 }}>View All</Text>
            <Ionicons name="chevron-forward" size={14} color="#ec3713" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CouponInput;
