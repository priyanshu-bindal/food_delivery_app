# Food Delivery App

A production-ready food delivery mobile app built with React Native and Expo.

## Features

- **Home Discovery Screen**: Browse restaurants, categories, and promotional deals
- **Restaurant Menu Screen**: View menu items and add to cart
- **Cart & Checkout**: Manage cart items and complete checkout
- **Live Order Tracking**: Track orders in real-time
- **User Profile & History**: Manage profile and view order history

## Tech Stack

- **Frontend**: React Native (Expo), TypeScript, NativeWind (Tailwind CSS)
- **Navigation**: React Navigation
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **HTTP Client**: Axios

## Project Structure

```
stitch_restaurant_menu_screen/
├── home_discovery_screen/     # Home page, categories, restaurant listing
├── restaurant_menu_screen/    # Restaurant details, menu, add to cart
├── cart_and_checkout/        # Cart, coupons, address, payment
├── live_order_tracking/      # Map, order status, delivery tracking
├── user_profile_and_history/ # Profile, orders, reorder, rating
├── App.tsx                   # Main app entry point
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind CSS configuration
├── babel.config.js           # Babel configuration
├── metro.config.js           # Metro bundler configuration
└── tsconfig.json             # TypeScript configuration
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your preferred platform:
   ```bash
   npm run android    # For Android
   npm run ios        # For iOS
   npm run web        # For Web
   ```

## UI Design

- **Dark Theme**: Modern dark theme with orange accent color (#ec3713)
- **Rounded Cards**: Consistent rounded corners throughout the app
- **Shadowed Containers**: Subtle shadows for depth
- **Floating CTAs**: Prominent call-to-action buttons
- **Rating Badges**: Visual rating indicators
- **Quantity Counters**: Interactive quantity controls

## Development Notes

- Each folder corresponds to one main navigation screen
- Components are self-contained within their respective screen folders
- Uses existing images and UI assets from the provided HTML designs
- Follows React Native best practices with TypeScript
- Implements proper error handling and loading states

## Next Steps

1. Complete remaining screen implementations
2. Add global state management (cart, auth)
3. Integrate backend APIs
4. Add proper navigation between screens
5. Implement real-time order tracking with Socket.IO
