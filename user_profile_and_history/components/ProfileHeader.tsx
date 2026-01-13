import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { getSafeImageUri } from '../../utils/imageHelpers';

const ProfileHeader: React.FC = () => {
    const { user } = useAuthStore();

    if (!user) return null;

    return (
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
            {/* Avatar Section */}
            <View style={{ position: 'relative', marginBottom: 16 }}>
                <View style={{ width: 120, height: 120, borderRadius: 60, padding: 4, borderWidth: 2, borderColor: user.isGuest ? '#333' : '#FACC15' }}>
                    <Image
                        source={getSafeImageUri(user.photo, { uri: `https://ui-avatars.com/api/?name=${user.name}&background=random` })}
                        style={{ width: '100%', height: '100%', borderRadius: 60 }}
                        resizeMode="cover"
                    />
                </View>

                {/* Edit Button - Hide for Guest */}
                {!user.isGuest && (
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FACC15', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#0F0F0F' }}>
                        <Ionicons name="camera" size={16} color="#000" />
                    </TouchableOpacity>
                )}
            </View>

            {/* User Details */}
            <Text style={{ fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 4 }}>
                {user.name}
            </Text>
            {!user.isGuest && user.email && (
                <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>
                    {user.email}
                </Text>
            )}

            {/* Membership Badge - Hide for Guest */}
            {!user.isGuest && (
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(250, 204, 21, 0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, gap: 8, borderWidth: 1, borderColor: 'rgba(250, 204, 21, 0.2)' }}>
                    <Ionicons name="star" size={16} color="#FACC15" />
                    <Text style={{ color: '#FACC15', fontWeight: '700', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}>Gold Member</Text>
                </View>
            )}

            {user.isGuest && (
                <Text style={{ fontSize: 13, color: '#888', fontStyle: 'italic', marginTop: 4 }}>
                    Sign in to access exclusive deals
                </Text>
            )}
        </View>
    );
};

export default ProfileHeader;
