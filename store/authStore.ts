import { create } from 'zustand';

// User Interface
export interface User {
    name: string;
    email?: string;
    photo?: any;
    isGuest: boolean;
}

// Auth State Interface
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    loginWithGoogle: () => Promise<void>;
    continueAsGuest: () => void;
    logout: () => Promise<void>;
    hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start true to allow for "checking auth" state

    loginWithGoogle: async () => {
        // Simulated Google Login
        // In a real app, this would trigger the Google Auth Session

        return new Promise((resolve) => {
            setTimeout(() => {
                set({
                    // ... inside loginWithGoogle ...
                    user: {
                        name: "Priyanshu",
                        email: "priyanshu@example.com",
                        photo: require('../assets/avatar.jpg'), // Consistent avatar

                        isGuest: false,
                    },
                    isAuthenticated: true,
                });
                resolve();
            }, 1000); // 1s delay for "real" feel
        });
    },

    continueAsGuest: () => {
        set({
            user: {
                name: "Guest",
                photo: require('../assets/guest_avatar.jpg'),
                isGuest: true,
            },
            isAuthenticated: true,
        });
    },

    logout: async () => {
        // Simulate async logout (clearing tokens etc)
        return new Promise((resolve) => {
            setTimeout(() => {
                set({
                    user: null,
                    isAuthenticated: false,
                });
                resolve();
            }, 500);
        });
    },

    hydrate: async () => {
        // Simulate checking AsyncStorage/SecureStore
        // Since we don't have async-storage installed, we default to logged out (or guest if we wanted)
        // In production: const storedUser = await AsyncStorage.getItem('user');

        return new Promise((resolve) => {
            setTimeout(() => {
                set({ isLoading: false });
                resolve();
            }, 800);
        });
    }
}));
