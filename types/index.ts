// Global type definitions for the Food Delivery App

export interface Category {
  id: string;
  name: string;
  image: string;
  isActive?: boolean;
}

export interface PromoCard {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  buttonText: string;
  backgroundColor: string;
  backgroundImage: string;
  type: 'flash-deal' | 'limited-time';
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  image: string;
  hasFreeDelivery?: boolean;
  isFavorite?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian?: boolean;
  isPopular?: boolean;
  customizationOptions?: CustomizationOption[];
  restaurantId: string;
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian?: boolean;
  isPopular?: boolean;
  customizationOptions?: CustomizationOption[];
  quantity: number;
  restaurantId: string;
  specialInstructions?: string;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  options: Option[];
  isRequired?: boolean;
}

export interface Option {
  id: string;
  name: string;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  tax: number;
  finalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
  deliveryAddress: Address;
  paymentMethod: string;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string;
  createdAt: string;
  updatedAt: string;
  trackingInfo?: TrackingInfo;
}

export interface TrackingInfo {
  deliveryPartnerName: string;
  deliveryPartnerPhone: string;
  deliveryPartnerAvatar?: string;
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  estimatedArrival: string;
}

// Navigation types
export type RootStackParamList = {
  HomeScreen: undefined;
  RestaurantMenu: { restaurantId: string; restaurant: Restaurant };
  Cart: undefined;
  Checkout: undefined;
  OrderTracking: { orderId: string };
  Profile: undefined;
  OrderHistory: undefined;
  OrderDetails: { orderId: string };
  OrderConfirmation: undefined;
};

export type TabParamList = {
  Explore: undefined;
  Orders: undefined;
  Saved: undefined;
  Profile: undefined;
};

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}

// Component Props types
export interface LocationHeaderProps {
  location?: string;
  address?: string;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onMicPress?: () => void;
}

export interface CategoryCarouselProps {
  categories?: Category[];
  onCategoryPress?: (category: Category) => void;
}

export interface PromoCarouselProps {
  promos?: PromoCard[];
  onPromoPress?: (promo: PromoCard) => void;
}

export interface RestaurantListProps {
  restaurants?: Restaurant[];
  onRestaurantPress?: (restaurant: Restaurant) => void;
  onFavoritePress?: (restaurant: Restaurant) => void;
  onSeeAllPress?: () => void;
}

export interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
}
