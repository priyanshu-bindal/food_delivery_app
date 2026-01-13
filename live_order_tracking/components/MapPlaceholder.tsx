import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MapPlaceholder: React.FC = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#1a1a1a', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Abstract Map Lines - Visual representation only */}
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1 }}>
                <View style={{ position: 'absolute', top: '20%', left: 0, right: 0, height: 20, backgroundColor: '#333', transform: [{ rotate: '15deg' }] }} />
                <View style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 30, backgroundColor: '#333', transform: [{ rotate: '-10deg' }] }} />
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: '30%', width: 25, backgroundColor: '#333' }} />
                <View style={{ position: 'absolute', top: 0, bottom: 0, right: '40%', width: 15, backgroundColor: '#333' }} />
            </View>

            {/* Home Pin */}
            <View style={{ position: 'absolute', top: '30%', right: '35%', alignItems: 'center' }}>
                <View style={{ width: 48, height: 48, backgroundColor: 'rgba(239, 68, 68, 0.2)', borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="location" size={24} color="#ef4444" />
                </View>
                <View style={{ backgroundColor: '#1F1F1F', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginTop: 8 }}>
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>Your Location</Text>
                </View>
            </View>

            {/* Restaurant Pin */}
            <View style={{ position: 'absolute', bottom: '40%', left: '20%', alignItems: 'center' }}>
                <View style={{ width: 48, height: 48, backgroundColor: 'rgba(250, 204, 21, 0.2)', borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="restaurant" size={24} color="#FACC15" />
                </View>
                <View style={{ backgroundColor: '#1F1F1F', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginTop: 8 }}>
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>The Golden Grill</Text>
                </View>
            </View>

            {/* Delivery Partner Pin (Animated-ish visual) */}
            <View style={{ position: 'absolute', top: '45%', left: '45%', alignItems: 'center' }}>
                <View style={{ width: 56, height: 56, backgroundColor: '#FACC15', borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#FACC15', shadowOpacity: 0.5, shadowRadius: 20, elevation: 10 }}>
                    <Ionicons name="bicycle" size={32} color="#000" />
                </View>
            </View>

        </View>
    );
};

export default MapPlaceholder;
