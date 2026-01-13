import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import ScalePressable from '../../components/ScalePressable';

interface MenuTabsProps {
  tabs: string[];
  selectedTab: string;
  onTabPress: (tab: string) => void;
}

const MenuTabs: React.FC<MenuTabsProps> = ({
  tabs,
  selectedTab,
  onTabPress,
}) => {
  return (
    <View className="bg-background-dark border-b border-white/5">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="gap-4"
      >
        {tabs.map((tab) => (
          <ScalePressable
            key={tab}
            onPress={() => onTabPress(tab)}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              backgroundColor: selectedTab === tab ? '#ec3713' : 'rgba(255, 255, 255, 0.1)',
              borderRadius: 9999,
            }}
          >
            <Text
              className={`text-sm font-medium ${selectedTab === tab
                ? 'text-white'
                : 'text-gray-700 dark:text-gray-300'
                }`}
            >
              {tab}
            </Text>
          </ScalePressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default MenuTabs;
