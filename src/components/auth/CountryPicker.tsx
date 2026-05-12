// src/components/auth/CountryPicker.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    TextInput,
    Image,
} from 'react-native';
import { COUNTRIES, Country, DEFAULT_COUNTRY } from '../../constants/countries';

interface CountryPickerProps {
    value: Country;
    onChange: (country: Country) => void;
    placeholder?: string;
}

export default function CountryPicker({ value, onChange, placeholder }: CountryPickerProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const filteredCountries = COUNTRIES.filter(country =>
        country.name.includes(searchText) || 
        country.nameEn.toLowerCase().includes(searchText.toLowerCase()) ||
        country.dialCode.includes(searchText)
    );

    const renderCountryItem = ({ item }: { item: Country }) => (
        <TouchableOpacity
            onPress={() => {
                onChange(item);
                setModalVisible(false);
                setSearchText('');
            }}
            className="flex-row items-center justify-between py-3 px-4 border-b border-gray-700"
        >
            <View className="flex-row items-center">
                <Text className="text-2xl mr-3">{item.emoji}</Text>
                <View>
                    <Text className="text-white text-base">{item.name}</Text>
                    <Text className="text-gray-500 text-xs">+{item.dialCode}</Text>
                </View>
            </View>
            {value.code === item.code && (
                <Text className="text-green-500 text-lg">✓</Text>
            )}
        </TouchableOpacity>
    );

    return (
        <>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="flex-row items-center justify-between bg-gray-800 rounded-xl p-4 border border-gray-700"
            >
                <View className="flex-row items-center">
                    <Text className="text-2xl mr-2">{value.emoji}</Text>
                    <Text className="text-white text-base">{value.name}</Text>
                    <Text className="text-gray-400 text-sm ml-2">(+{value.dialCode})</Text>
                </View>
                <Text className="text-gray-400 text-lg">▼</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black/80">
                    <View className="flex-1 mt-20 bg-gray-900 rounded-t-3xl">
                        <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
                            <Text className="text-white text-lg font-bold">
                                انتخاب کشور
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text className="text-gray-400 text-lg">✕</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="p-4">
                            <View className="bg-gray-800 rounded-xl px-4 py-2 flex-row items-center">
                                <Text className="text-gray-400 text-lg mr-2">🔍</Text>
                                <TextInput
                                    className="flex-1 text-white py-2"
                                    placeholder="جستجوی کشور..."
                                    placeholderTextColor="#666"
                                    value={searchText}
                                    onChangeText={setSearchText}
                                />
                            </View>
                        </View>

                        <FlatList
                            data={filteredCountries}
                            renderItem={renderCountryItem}
                            keyExtractor={(item) => item.code}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
}

// src/components/auth/CountryPicker.tsx (بخش نمایش پرچم)
import { COUNTRIES, Country, DEFAULT_COUNTRY } from '../../constants/countries';

// در قسمت render هر آیتم:
const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity onPress={() => onChange(item)}>
        <View className="flex-row items-center px-4 py-3">
            {/* ایموجی پرچم - بدون نیاز به فایل تصویری */}
            <Text className="text-2xl w-10 text-center">{item.emoji}</Text>
            
            <View className="flex-1">
                <Text className="text-white text-base">{item.name}</Text>
                <Text className="text-gray-500 text-xs">+{item.dialCode}</Text>
            </View>
            
            {selected && <Text className="text-green-500">✓</Text>}
        </View>
    </TouchableOpacity>
);