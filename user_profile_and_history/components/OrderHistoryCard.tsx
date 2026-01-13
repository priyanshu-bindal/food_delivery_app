import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSafeImageUri } from '../../utils/imageHelpers';

interface OrderHistoryCardProps {
    order: {
        id: string;
        restaurantName: string;
        items: string;
        price: number;
        date: string;
        status: string;
        rating: number;
        image: string;
    }
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({ order }) => {
    return (
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', gap: 16 }}>
                {/* Restaurant Image */}
                <View style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', backgroundColor: '#333' }}>
                    <Image
                        source={getSafeImageUri(order.image)}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                </View>

                {/* Order Details */}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>{order.restaurantName}</Text>
                        <Text style={{ color: '#9ca3af', fontSize: 12 }}>{order.date}</Text>
                    </View>
                    <Text style={{ color: '#9ca3af', fontSize: 14, marginBottom: 8 }} numberOfLines={1}>{order.items}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={{ color: '#fff', fontWeight: '700' }}>₹{order.price}</Text>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#64748b' }} />
                            <Text style={{ color: '#22c55e', fontSize: 12, fontWeight: '600' }}>{order.status}</Text>
                        </View>

                        {/* Reorder Button (Visual) */}
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={{ color: '#FACC15', fontWeight: '700', fontSize: 14 }}>Reorder</Text>
                            <Ionicons name="refresh" size={16} color="#FACC15" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default OrderHistoryCard;
