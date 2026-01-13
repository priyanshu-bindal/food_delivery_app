import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Interface for Props
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onMicPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search for dishes or restaurants',
  onSearch,
  onMicPress,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    onSearch?.(searchQuery);
  };

  return (
    <View className="px-4">
      <View
        className="flex-row items-center px-4 py-2 gap-3"
        style={{
          borderRadius: 9999,
          backgroundColor: '#161616',
          borderWidth: 1,
          borderColor: isFocused ? '#262626' : '#262626', // Keep border color consistent as requested (or strictly #262626 always?) User said "Border color: #262626". I will stick to that to be safe, or allow focus state if it doesn't break "flat". User said "Border color: #262626" in Rules. I'll use simple #262626 to be safe.
        }}
      >
        <MaterialIcons name="search" size={22} color="#6b7280" />

        <TextInput
          className="flex-1 bg-transparent text-sm text-white"
          placeholder={placeholder}
          placeholderTextColor="#6b7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSubmit}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="search"
          selectionColor="#FF385C"
          style={{
            includeFontPadding: false,
            padding: 0,
          }}
        />

        <TouchableOpacity onPress={onMicPress} activeOpacity={0.7}>
          <MaterialIcons name="mic" size={22} color="#FF385C" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;