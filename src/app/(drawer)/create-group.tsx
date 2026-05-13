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

// src/app/(drawer)/create-group.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';

export default function CreateGroupScreen() {
    const { user, balance } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [groupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState<'private' | 'public'>('private');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    
    // محاسبه مبلغ قفل مورد نیاز
    const requiredLockAmount = groupType === 'private' ? 1000000 : 10000000;
    const canCreate = groupName.trim().length >= 3 && balance >= requiredLockAmount;
    
    const handlePickAvatar = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('خطا', 'برای انتخاب آواتار به دسترسی گالری نیاز داریم');
            return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
            base64: true,
        });
        
        if (!result.canceled && result.assets[0].uri) {
            setAvatar(result.assets[0].uri);
        }
    };
    
    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            Alert.alert('خطا', 'لطفاً نام گروه را وارد کنید');
            return;
        }
        
        if (groupName.length < 3) {
            Alert.alert('خطا', 'نام گروه باید حداقل ۳ کاراکتر باشد');
            return;
        }
        
        if (balance < requiredLockAmount) {
            Alert.alert('خطا', `موجودی کافی نیست. برای ساخت گروه ${groupType === 'private' ? 'خصوصی' : 'عمومی'} به ${requiredLockAmount.toLocaleString()} تومان نیاز دارید`);
            return;
        }
        
        setIsLoading(true);
        
        // شبیه‌سازی ساخت گروه
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                '✅ گروه ساخته شد',
                `گروه "${groupName}" با موفقیت ساخته شد.\n\nمبلغ ${requiredLockAmount.toLocaleString()} تومان از حساب شما قفل شد.\nکد دعوت: DOBNA${Math.floor(10000 + Math.random() * 90000)}`,
                [{ text: 'باشه', onPress: () => router.back() }]
            );
        }, 1500);
    };
    
    return (
        <LinearGradient
            colors={[currentColors.background, currentColors.surface]}
            style={{ flex: 1 }}
        >
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            
            {/* هدر */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingTop: 50,
                paddingBottom: 16,
                borderBottomWidth: 1,
                borderBottomColor: currentColors.border,
            }}>
                <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
                    <Text style={{ color: currentColors.text, fontSize: 24 }}>←</Text>
                </TouchableOpacity>
                <Text style={{ color: currentColors.text, fontSize: 20, fontWeight: 'bold' }}>
                    ساخت گروه
                </Text>
                <View style={{ width: 40 }} />
            </View>
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* انتخاب آواتار گروه */}
                <View style={{ alignItems: 'center', marginTop: 24, marginBottom: 16 }}>
                    <TouchableOpacity onPress={handlePickAvatar} style={{ position: 'relative' }}>
                        <View style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: currentColors.surfaceLight,
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            borderWidth: 2,
                            borderColor: currentColors.primary,
                        }}>
                            {avatar ? (
                                <Image source={{ uri: avatar }} style={{ width: 100, height: 100 }} />
                            ) : (
                                <Text style={{ fontSize: 48, color: currentColors.textMuted }}>👥</Text>
                            )}
                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: currentColors.primary,
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 2,
                            borderColor: currentColors.surface,
                        }}>
                            <Text style={{ fontSize: 16 }}>✏️</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                {/* فیلد نام گروه */}
                <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
                    <Text style={{ color: currentColors.textSecondary, marginBottom: 8, fontSize: 14 }}>
                        نام گروه
                    </Text>
                    <View style={{
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: isNameFocused ? currentColors.primary : currentColors.border,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                    }}>
                        <TextInput
                            style={{
                                color: currentColors.text,
                                fontSize: 16,
                                padding: 0,
                            }}
                            placeholder="نام گروه را وارد کنید..."
                            placeholderTextColor={currentColors.textMuted}
                            value={groupName}
                            onChangeText={setGroupName}
                            onFocus={() => setIsNameFocused(true)}
                            onBlur={() => setIsNameFocused(false)}
                            maxLength={128}
                        />
                    </View>
                    
                    {/* نمایش تعداد کاراکتر */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{
                                color: currentColors.textMuted,
                                fontSize: 12,
                                marginRight: 4,
                            }}>ℹ️</Text>
                            <Text style={{ color: currentColors.textMuted, fontSize: 12 }}>
                                نام شما می‌تواند انگلیسی یا فارسی باشد
                            </Text>
                        </View>
                        <Text style={{ color: currentColors.textMuted, fontSize: 12 }}>
                            {groupName.length}/128
                        </Text>
                    </View>
                </View>
                
                {/* جداکننده */}
                <View style={{
                    height: 1,
                    backgroundColor: currentColors.border,
                    marginVertical: 20,
                    marginHorizontal: 16,
                }} />
                
                {/* نوع گروه */}
                <View style={{ paddingHorizontal: 16 }}>
                    <Text style={{ color: currentColors.textSecondary, marginBottom: 12, fontSize: 14 }}>
                        نوع گروه
                    </Text>
                    
                    {/* گزینه خصوصی */}
                    <TouchableOpacity
                        onPress={() => setGroupType('private')}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            marginBottom: 16,
                        }}
                        activeOpacity={0.7}
                    >
                        <View style={{
                            width: 22,
                            height: 22,
                            borderRadius: 11,
                            borderWidth: 2,
                            borderColor: groupType === 'private' ? currentColors.primary : currentColors.textMuted,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 2,
                            marginRight: 12,
                        }}>
                            {groupType === 'private' && (
                                <View style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: currentColors.primary,
                                }} />
                            )}
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: currentColors.text, fontSize: 16, fontWeight: 'bold' }}>
                                خصوصی
                            </Text>
                            <Text style={{ color: currentColors.textSecondary, fontSize: 13, marginTop: 4 }}>
                                گروه‌های خصوصی از طریق دعوت مالک و مدیران یا پیوند دعوت قابل دسترس هستند.
                            </Text>
                        </View>
                    </TouchableOpacity>
                    
                    {/* گزینه عمومی */}
                    <TouchableOpacity
                        onPress={() => setGroupType('public')}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            marginBottom: 16,
                        }}
                        activeOpacity={0.7}
                    >
                        <View style={{
                            width: 22,
                            height: 22,
                            borderRadius: 11,
                            borderWidth: 2,
                            borderColor: groupType === 'public' ? currentColors.primary : currentColors.textMuted,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 2,
                            marginRight: 12,
                        }}>
                            {groupType === 'public' && (
                                <View style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: currentColors.primary,
                                }} />
                            )}
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: currentColors.text, fontSize: 16, fontWeight: 'bold' }}>
                                عمومی
                            </Text>
                            <Text style={{ color: currentColors.textSecondary, fontSize: 13, marginTop: 4 }}>
                                گروه‌های عمومی از بخش جست‌وجو قابل دسترس هستند و هر فردی می‌تواند به آن اضافه شود.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                {/* جداکننده */}
                <View style={{
                    height: 1,
                    backgroundColor: currentColors.border,
                    marginVertical: 20,
                    marginHorizontal: 16,
                }} />
                
                {/* قوانین ساخت گروه */}
                <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
                    <Text style={{ color: currentColors.textSecondary, fontSize: 13, lineHeight: 22 }}>
                        برای ساخت گروه کاربران موظفند قوانین مربوط به ساخت گروه‌های خصوصی و عمومی را به دقت مطالعه نموده و با قبول شرایط و ضوابط و قوانین دوبنا نسبت به ساخت گروه اقدام نمایند.
                    </Text>
                    
                    <View style={{ marginTop: 16, padding: 12, backgroundColor: currentColors.surfaceLight, borderRadius: 12 }}>
                        <Text style={{ color: currentColors.primary, fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>
                            🔒 گروه خصوصی
                        </Text>
                        <Text style={{ color: currentColors.textSecondary, fontSize: 13, lineHeight: 22 }}>
                            مالک و یا سازنده گروه می‌بایست مبلغ {requiredLockAmount.toLocaleString()} تومان در حساب ID Chat دوبنا خود قفل نماید.
                        </Text>
                    </View>
                    
                    <View style={{ marginTop: 12, padding: 12, backgroundColor: currentColors.surfaceLight, borderRadius: 12 }}>
                        <Text style={{ color: currentColors.primary, fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>
                            🌐 گروه عمومی
                        </Text>
                        <Text style={{ color: currentColors.textSecondary, fontSize: 13, lineHeight: 22 }}>
                            سازنده گروه می‌بایست مبلغ {requiredLockAmount.toLocaleString()} تومان در حساب ID Chat دوبنا خود قفل نماید و هرگاه مدیران گروه مبالغ فوق را از حالت مسدودی خارج نمایند فعالیت گروه پایان می‌یابد و گروه به حالت تعلیق در می‌آید.
                        </Text>
                    </View>
                </View>
                
                {/* نمایش موجودی و مبلغ قفل */}
                <View style={{
                    marginHorizontal: 16,
                    marginBottom: 24,
                    padding: 16,
                    backgroundColor: currentColors.surfaceLight,
                    borderRadius: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <View>
                        <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>
                            موجودی حساب شما
                        </Text>
                        <Text style={{ color: currentColors.primary, fontSize: 18, fontWeight: 'bold' }}>
                            {balance?.toLocaleString()} تومان
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>
                            مبلغ مورد نیاز
                        </Text>
                        <Text style={{ color: balance >= requiredLockAmount ? '#10b981' : currentColors.error, fontSize: 18, fontWeight: 'bold' }}>
                            {requiredLockAmount.toLocaleString()} تومان
                        </Text>
                    </View>
                </View>
                
                {/* دکمه تأیید و ادامه */}
                <View style={{ paddingHorizontal: 16, marginBottom: 30 }}>
                    <TouchableOpacity
                        onPress={handleCreateGroup}
                        disabled={!canCreate || isLoading}
                        style={{
                            backgroundColor: canCreate ? '#10b981' : currentColors.textMuted,
                            paddingVertical: 16,
                            borderRadius: 12,
                            alignItems: 'center',
                            opacity: canCreate ? 1 : 0.6,
                        }}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                تأیید و ادامه
                            </Text>
                        )}
                    </TouchableOpacity>
                    
                    {!canCreate && groupName.trim().length < 3 && (
                        <Text style={{ color: currentColors.error, fontSize: 12, textAlign: 'center', marginTop: 12 }}>
                            نام گروه باید حداقل ۳ کاراکتر باشد
                        </Text>
                    )}
                    
                    {!canCreate && groupName.trim().length >= 3 && balance < requiredLockAmount && (
                        <Text style={{ color: currentColors.error, fontSize: 12, textAlign: 'center', marginTop: 12 }}>
                            موجودی کافی نیست. لطفاً ابتدا حساب خود را شارژ کنید.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}