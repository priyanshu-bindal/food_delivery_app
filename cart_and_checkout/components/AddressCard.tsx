import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddressCard: React.FC = () => {
  return (
    <View style={{ marginTop: 16, padding: 0 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', gap: 16, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <View style={{ flex: 2, flexDirection: 'column', gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Ionicons name="home" size={24} color="#ec3713" />
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', lineHeight: 20 }}>Delivery to Home</Text>
          </View>
          <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, fontWeight: '400', lineHeight: 20 }}>
            123 Street, New York, NY 10001
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AddressCard;
