import React from 'react';
import { View, Text } from 'react-native';
import { useCartStore } from '../../store/cartStore';

const BillSummary: React.FC = () => {
  const { totalPrice, discountAmount } = useCartStore();

  const deliveryFee = 2.00;
  const taxes = 1.50;
  const grandTotal = totalPrice - discountAmount + deliveryFee + taxes;

  return (
    <View style={{ marginTop: 8 }}>
      <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
        Bill Summary
      </Text>

      <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}>Item Total</Text>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>${totalPrice.toFixed(2)}</Text>
        </View>

        {discountAmount > 0 && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ color: '#22c55e', fontSize: 14, fontWeight: '500' }}>Discount</Text>
            <Text style={{ color: '#22c55e', fontSize: 14, fontWeight: '500' }}>- ${discountAmount.toFixed(2)}</Text>
          </View>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}>Delivery Fee</Text>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>${deliveryFee.toFixed(2)}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}>Taxes and Charges</Text>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>${taxes.toFixed(2)}</Text>
        </View>

        <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginVertical: 4 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>To Pay</Text>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>${grandTotal.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default BillSummary;
