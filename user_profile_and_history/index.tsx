import React from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Components
import ProfileHeader from './components/ProfileHeader';
import ActionList from './components/ActionList';
import OrderHistoryCard from './components/OrderHistoryCard';

// Data
import { PAST_ORDERS } from './constants';

import { useAuthStore } from '../store/authStore';

const UserProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    const { logout, user } = useAuthStore();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Profile</Text>
                <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="notifications-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24 }}>

                {/* Profile Info */}
                <ProfileHeader />

                {/* Action Menu */}
                <ActionList />

                {/* Recent Orders */}
                <View style={{ marginBottom: 24 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '800' }}>Recent Orders</Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#FACC15', fontSize: 14, fontWeight: '700' }}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {PAST_ORDERS.map(order => (
                        <OrderHistoryCard key={order.id} order={order} />
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    onPress={() => logout()}
                    style={{
                        backgroundColor: user?.isGuest ? 'rgba(236, 55, 19, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        paddingVertical: 16,
                        borderRadius: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        marginTop: 8,
                        marginBottom: 40,
                        borderWidth: 1,
                        borderColor: user?.isGuest ? 'rgba(236, 55, 19, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                    }}
                >
                    <Ionicons
                        name={user?.isGuest ? "log-in-outline" : "log-out-outline"}
                        size={20}
                        color={user?.isGuest ? "#ec3713" : "#ef4444"}
                    />
                    <Text style={{ color: user?.isGuest ? "#ec3713" : "#ef4444", fontSize: 16, fontWeight: '700' }}>
                        {user?.isGuest ? "Sign In / Register" : "Log Out"}
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

export default UserProfileScreen;
