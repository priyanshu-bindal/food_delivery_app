import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MENU_ACTIONS } from '../constants';

const ActionList: React.FC = () => {
    return (
        <View style={{ marginBottom: 32 }}>
            {MENU_ACTIONS.map((action, index) => (
                <TouchableOpacity
                    key={action.id}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 16,
                        borderBottomWidth: index === MENU_ACTIONS.length - 1 ? 0 : 1,
                        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <View style={{ width: 40, height: 40, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name={action.icon as any} size={20} color="#fff" />
                        </View>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>{action.title}</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={20} color="#64748b" />
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ActionList;
