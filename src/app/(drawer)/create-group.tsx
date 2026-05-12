// src/app/(drawer)/create-group.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    Switch,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';

export default function CreateGroupScreen() {
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [groupName, setGroupName] = useState('');
    const [groupBio, setGroupBio] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [selectedRoomTier, setSelectedRoomTier] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const ROOM_TIERS = [
        { id: 1, name: '۵,۰۰۰ تومانی', price: 5000, commission: 50 },
        { id: 2, name: '۱۰,۰۰۰ تومانی', price: 10000, commission: 50 },
        { id: 3, name: '۲۰,۰۰۰ تومانی', price: 20000, commission: 50 },
        { id: 4, name: '۵۰,۰۰۰ تومانی', price: 50000, commission: 50 },
        { id: 5, name: '۱۰۰,۰۰۰ تومانی', price: 100000, commission: 50 },
    ];

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            Alert.alert('خطا', 'لطفاً نام گروه را وارد کنید');
            return;
        }
        
        if (!selectedRoomTier) {
            Alert.alert('خطا', 'لطفاً اتاق مورد نظر را انتخاب کنید');
            return;
        }
        
        setLoading(true);
        
        // شبیه‌سازی ساخت گروه
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'گروه ساخته شد',
                `گروه "${groupName}" با موفقیت ساخته شد.\nکد دعوت: DOBNA${Math.floor(10000 + Math.random() * 90000)}`,
                [{ text: 'باشه', onPress: () => router.back() }]
            );
        }, 1500);
    };

    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingTop: 50,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: currentColors.border,
            }}>
                <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
                    <Text style={{ color: currentColors.text, fontSize: 24 }}>←</Text>
                </TouchableOpacity>
                <Text style={{ color: currentColors.text, fontSize: 20, fontWeight: 'bold', flex: 1, textAlign: 'center' }}>
                    ساخت گروه
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* نام گروه */}
                <Text style={{ color: currentColors.textSecondary, marginBottom: 8 }}>نام گروه</Text>
                <TextInput
                    style={{
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 12,
                        padding: 14,
                        color: currentColors.text,
                        marginBottom: 16,
                    }}
                    placeholder="مثال: گروه خصوصی دوستان"
                    placeholderTextColor={currentColors.textMuted}
                    value={groupName}
                    onChangeText={setGroupName}
                />

                {/* بیو گروه */}
                <Text style={{ color: currentColors.textSecondary, marginBottom: 8 }}>بیوگرافی گروه (اختیاری)</Text>
                <TextInput
                    style={{
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 12,
                        padding: 14,
                        color: currentColors.text,
                        height: 80,
                        textAlignVertical: 'top',
                        marginBottom: 16,
                    }}
                    placeholder="توضیحات گروه..."
                    placeholderTextColor={currentColors.textMuted}
                    multiline
                    value={groupBio}
                    onChangeText={setGroupBio}
                />

                {/* عمومی/خصوصی */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: currentColors.surfaceLight,
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 16,
                }}>
                    <Text style={{ color: currentColors.text }}>گروه خصوصی</Text>
                    <Switch
                        value={isPrivate}
                        onValueChange={setIsPrivate}
                        trackColor={{ false: currentColors.textMuted, true: currentColors.primary }}
                    />
                </View>
                {isPrivate && (
                    <Text style={{ color: currentColors.textSecondary, fontSize: 12, marginBottom: 16 }}>
                        گروه خصوصی فقط با دعوت‌نامه قابل مشاهده است
                    </Text>
                )}

                {/* انتخاب اتاق */}
                <Text style={{ color: currentColors.text, fontWeight: 'bold', marginBottom: 12 }}>انتخاب اتاق بازی</Text>
                {ROOM_TIERS.map((tier) => (
                    <TouchableOpacity
                        key={tier.id}
                        onPress={() => setSelectedRoomTier(tier.id)}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: selectedRoomTier === tier.id ? currentColors.primary + '20' : currentColors.surfaceLight,
                            borderRadius: 12,
                            padding: 14,
                            marginBottom: 8,
                            borderWidth: selectedRoomTier === tier.id ? 1 : 0,
                            borderColor: currentColors.primary,
                        }}
                    >
                        <View>
                            <Text style={{ color: currentColors.text, fontWeight: 'bold' }}>{tier.name}</Text>
                            <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>
                                کمیسیون ۵۰٪ برای مالک گروه
                            </Text>
                        </View>
                        {selectedRoomTier === tier.id && (
                            <Text style={{ color: currentColors.primary, fontSize: 20 }}>✓</Text>
                        )}
                    </TouchableOpacity>
                ))}

                {/* دکمه ساخت گروه */}
                <TouchableOpacity
                    onPress={handleCreateGroup}
                    disabled={loading || !groupName || !selectedRoomTier}
                    style={{
                        backgroundColor: (groupName && selectedRoomTier) ? currentColors.primary : currentColors.textMuted,
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                        marginTop: 24,
                    }}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>ساخت گروه</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
}