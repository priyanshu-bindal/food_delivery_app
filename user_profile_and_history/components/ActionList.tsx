import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MENU_ACTIONS } from '../constants';

const ActionList: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View style={{ marginBottom: 32 }}>
            {MENU_ACTIONS.map((action, index) => (
                <TouchableOpacity
                    key={action.id}
                    onPress={() => {
                        if (action.route === 'HelpSupport') {
                            // Type cast navigation to any to allow navigating to stack screens not in local param list if needed,
                            // or use proper typing if available. Since ProfileStack is inside Tab, we can nav to it.
                            (navigation as any).navigate('HelpSupport');
                        } else if (action.route === 'Orders') {
                            (navigation as any).navigate('Orders');
                        }
                        // Add other routes as needed
                    }}
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
