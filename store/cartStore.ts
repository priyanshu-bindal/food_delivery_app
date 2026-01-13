import { create } from 'zustand';
import type { CartItem, MenuItem } from '../types';

interface CartStore {
  cartItems: CartItem[];
  restaurantId: string | null;
  totalItems: number;
  totalPrice: number;
  appliedCoupon: { code: string; value: number; description: string } | null;
  discountAmount: number;

  // Actions
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  increaseQty: (itemId: string) => void;
  decreaseQty: (itemId: string) => void;
  clearCart: () => void;
  setRestaurant: (restaurantId: string) => void;
  applyCoupon: (coupon: { code: string; value: number; description: string }) => void;
  removeCoupon: () => void;
}

// Helper to calculate discount
const calculateDiscount = (totalPrice: number, coupon: { value: number } | null) => {
  if (!coupon) return 0;
  return (totalPrice * coupon.value) / 100;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  restaurantId: null,
  totalItems: 0,
  totalPrice: 0,
  appliedCoupon: null,
  discountAmount: 0,

  addItem: (item: MenuItem) => {
    const { cartItems, restaurantId, appliedCoupon } = get();

    // Clear cart if switching restaurants
    if (restaurantId && restaurantId !== item.restaurantId) {
      set({
        cartItems: [],
        restaurantId: item.restaurantId,
        totalItems: 0,
        totalPrice: 0,
        appliedCoupon: null,
        discountAmount: 0,
      });
    }

    set((state) => {
      let updatedCartItems = [];
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        updatedCartItems = state.cartItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...item, quantity: 1 }];
      }

      const newTotalItems = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newDiscountAmount = calculateDiscount(newTotalPrice, state.appliedCoupon);

      return {
        cartItems: updatedCartItems,
        restaurantId: item.restaurantId,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
        discountAmount: newDiscountAmount,
      };
    });
  },

  removeItem: (itemId: string) => {
    set((state) => {
      const updatedCartItems = state.cartItems.filter(item => item.id !== itemId);
      const newTotalItems = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newDiscountAmount = calculateDiscount(newTotalPrice, state.appliedCoupon);

      return {
        cartItems: updatedCartItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
        discountAmount: newDiscountAmount,
      };
    });
  },

  increaseQty: (itemId: string) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const newTotalItems = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newDiscountAmount = calculateDiscount(newTotalPrice, state.appliedCoupon);

      return {
        cartItems: updatedCartItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
        discountAmount: newDiscountAmount,
      };
    });
  },

  decreaseQty: (itemId: string) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const newTotalItems = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newDiscountAmount = calculateDiscount(newTotalPrice, state.appliedCoupon);

      return {
        cartItems: updatedCartItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
        discountAmount: newDiscountAmount,
      };
    });
  },

  clearCart: () => {
    set({
      cartItems: [],
      restaurantId: null,
      totalItems: 0,
      totalPrice: 0,
      appliedCoupon: null,
      discountAmount: 0,
    });
  },

  setRestaurant: (restaurantId: string) => {
    set({ restaurantId });
  },

  applyCoupon: (coupon: { code: string; value: number; description: string }) => {
    set((state) => {
      const discountAmount = calculateDiscount(state.totalPrice, coupon);
      return {
        appliedCoupon: coupon,
        discountAmount,
      };
    });
  },

  removeCoupon: () => {
    set({
      appliedCoupon: null,
      discountAmount: 0,
    });
  },
}));
