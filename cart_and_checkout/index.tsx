import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Components
import CartItemCard from './components/CartItemCard';
import BillSummary from './components/BillSummary';
import AddressCard from './components/AddressCard';
import CouponInput from './components/CouponInput';
import EmptyState from '../components/EmptyState';

// Store
import { useCartStore } from '../store/cartStore';

// Types
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { cartItems, totalPrice } = useCartStore();

  const handleBack = () => {
    navigation.goBack();
  };

  const deliveryFee = 2.00;
  const taxes = 1.50;
  const grandTotal = totalPrice + deliveryFee + taxes;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#221310' }}>
      <StatusBar barStyle="light-content" backgroundColor="#221310" />

      {/* TopAppBar */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16, paddingTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)', backgroundColor: '#221310' }}>
        <TouchableOpacity onPress={handleBack} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', flex: 1, textAlign: 'center', paddingRight: 40 }}>Cart</Text>
      </View>

      {/* Scrollable Content */}
      {cartItems.length === 0 ? (
        <EmptyState
          icon="cart-outline"
          title="Your Cart is Empty"
          message="Looks like you haven't added anything to your cart yet. Browse our restaurants and find something delicious!"
          actionLabel="Browse Restaurants"
          onAction={() => navigation.navigate('HomeScreen')}
        />
      ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Items Section */}
          <View style={{ paddingTop: 16 }}>
            <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
              <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>Your Order</Text>
            </View>

            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
              />
            ))}
          </View>

          {/* Coupon Section */}
          <View style={{ paddingHorizontal: 16 }}>
            <CouponInput />
          </View>

          {/* Delivery Card */}
          <View style={{ paddingHorizontal: 16 }}>
            <AddressCard />
          </View>

          {/* Bill Summary */}
          <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
            <BillSummary />
          </View>

          {/* Cancellation Policy Note */}
          <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
            <View style={{ backgroundColor: 'rgba(236, 55, 19, 0.05)', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: 'rgba(236, 55, 19, 0.2)' }}>
              <Text style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.5)', lineHeight: 16 }}>
                Avoid cancellations as they lead to food wastage. A 100% cancellation fee will apply to orders cancelled after 2 minutes of placement.
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Bottom Payment Bar */}
      {cartItems.length > 0 && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#221310', paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 32, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
          {/* Blur effect simulation with semi-transparent background if needed */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 56, paddingHorizontal: 24, backgroundColor: '#ec3713', borderRadius: 9999, shadowColor: '#ec3713', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 8 }}
            onPress={() => {
              navigation.navigate('OrderConfirmation');
            }}
          >
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Total</Text>
              <Text style={{ fontSize: 18, color: '#fff', fontWeight: '700' }}>${grandTotal.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Proceed to Pay</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
