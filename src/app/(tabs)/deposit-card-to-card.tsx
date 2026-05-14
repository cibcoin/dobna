// src/app/(tabs)/deposit-card-to-card.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    Share,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';
import * as ImagePicker from 'expo-image-picker';

export default function CardToCardDepositScreen() {
    const { user } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [amount, setAmount] = useState('');
    const [bankAccount, setBankAccount] = useState<any>(null);
    const [referenceCode, setReferenceCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [bankTransactionId, setBankTransactionId] = useState('');
    const [receiptImage, setReceiptImage] = useState<string | null>(null);

    // دریافت اطلاعات حساب بانکی دوبنا
    useEffect(() => {
        loadBankAccount();
    }, []);

    const loadBankAccount = async () => {
        const { data } = await supabase
            .from('bank_account_settings')
            .select('*')
            .eq('is_active', true)
            .single();
        setBankAccount(data);
    };

    const generateReferenceCode = () => {
        return `DOBNA${Date.now()}${Math.floor(Math.random() * 10000)}`;
    };

    const handleRequestDeposit = async () => {
        const amountNum = parseInt(amount);
        
        if (isNaN(amountNum) || amountNum < 50000) {
            Alert.alert('خطا', 'حداقل مبلغ شارژ ۵۰,۰۰۰ تومان است');
            return;
        }
        
        if (amountNum > 10000000) {
            Alert.alert('خطا', 'حداکثر مبلغ شارژ ۱۰,۰۰۰,۰۰۰ تومان است');
            return;
        }
        
        setLoading(true);
        
        const newReferenceCode = generateReferenceCode();
        
        const { data, error } = await supabase
            .from('card_to_card_requests')
            .insert({
                user_id: user?.id,
                amount: amountNum,
                reference_code: newReferenceCode,
                status: 'pending',
            })
            .select()
            .single();
        
        if (error) {
            Alert.alert('خطا', 'مشکلی در ثبت درخواست پیش آمد');
        } else {
            setReferenceCode(newReferenceCode);
        }
        
        setLoading(false);
    };

    const copyCardNumber = async () => {
        if (bankAccount?.card_number) {
            await Clipboard.setStringAsync(bankAccount.card_number);
            Alert.alert('✅ کپی شد', 'شماره کارت با موفقیت کپی شد');
        }
    };

    const copyReferenceCode = async () => {
        if (referenceCode) {
            await Clipboard.setStringAsync(referenceCode);
            Alert.alert('✅ کپی شد', 'کد پیگیری با موفقیت کپی شد');
        }
    };

    const shareInfo = async () => {
        const message = `
📋 اطلاعات واریز به دوبنا:

🏦 شماره کارت: ${bankAccount?.card_number}
🏦 نام بانک: ${bankAccount?.bank_name}
🏦 نام صاحب حساب: ${bankAccount?.account_holder}

💰 مبلغ: ${parseInt(amount).toLocaleString()} تومان

🔑 کد پیگیری: ${referenceCode}

⚠️ پس از واریز، کد پیگیری را در اپلیکیشن وارد کنید.
        `;
        
        await Share.share({ message });
    };

    const uploadReceipt = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('خطا', 'به دسترسی گالری نیاز داریم');
            return;
        }
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
            base64: true,
        });
        
        if (!result.canceled && result.assets[0].base64) {
            setReceiptImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
    };

    const submitPaymentProof = async () => {
        if (!bankTransactionId.trim()) {
            Alert.alert('خطا', 'لطفاً شماره پیگیری بانکی را وارد کنید');
            return;
        }
        
        setLoading(true);
        
        // بروزرسانی درخواست با اطلاعات واریز
        await supabase
            .from('card_to_card_requests')
            .update({
                transaction_id: bankTransactionId,
                receipt_image: receiptImage,
            })
            .eq('reference_code', referenceCode);
        
        Alert.alert(
            '✅ ثبت اطلاعات',
            'اطلاعات واریز شما ثبت شد. پس از تأیید توسط تیم پشتیبانی، موجودی شما افزایش می‌یابد.'
        );
        
        router.back();
        setLoading(false);
    };

    if (!referenceCode) {
        // مرحله 1: انتخاب مبلغ و دریافت کد پیگیری
        return (
            <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 16, paddingTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
                        <Text style={{ color: currentColors.primary, fontSize: 16 }}>← بازگشت</Text>
                    </TouchableOpacity>
                    <Text style={{ color: currentColors.text, fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>
                        💳 شارژ از طریق کارت به کارت
                    </Text>
                </View>
                
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    <View style={{
                        backgroundColor: currentColors.surfaceLight,
                        borderRadius: 16,
                        padding: 16,
                        marginBottom: 24,
                    }}>
                        <Text style={{ color: currentColors.textSecondary, marginBottom: 8 }}>مبلغ شارژ (تومان)</Text>
                        <TextInput
                            style={{
                                backgroundColor: currentColors.surface,
                                borderRadius: 12,
                                padding: 14,
                                color: currentColors.text,
                                fontSize: 18,
                            }}
                            placeholder="مبلغ را وارد کنید"
                            placeholderTextColor={currentColors.textMuted}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <Text style={{ color: currentColors.textMuted, fontSize: 12, marginTop: 8 }}>
                            حداقل: ۵۰,۰۰۰ تومان | حداکثر: ۱۰,۰۰۰,۰۰۰ تومان
                        </Text>
                    </View>
                    
                    <TouchableOpacity
                        onPress={handleRequestDeposit}
                        disabled={loading || !amount}
                        style={{
                            backgroundColor: (amount && !loading) ? currentColors.primary : currentColors.textMuted,
                            paddingVertical: 16,
                            borderRadius: 12,
                            alignItems: 'center',
                        }}
                    >
                        {loading ? <ActivityIndicator color="white" /> : (
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>دریافت کد پیگیری</Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>
        );
    }
    
    // مرحله 2: نمایش اطلاعات بانکی و ثبت رسید
    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 50 }}>
                {/* اطلاعات حساب بانکی */}
                <View style={{
                    backgroundColor: currentColors.surfaceLight,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 16,
                }}>
                    <Text style={{ color: currentColors.primary, fontWeight: 'bold', marginBottom: 12 }}>
                        🏦 اطلاعات واریز به دوبنا
                    </Text>
                    
                    <TouchableOpacity onPress={copyCardNumber} style={{ marginBottom: 12 }}>
                        <Text style={{ color: currentColors.textSecondary }}>شماره کارت</Text>
                        <Text style={{ color: currentColors.text, fontSize: 18, fontWeight: 'bold' }}>
                            {bankAccount?.card_number} 📋
                        </Text>
                    </TouchableOpacity>
                    
                    <Text style={{ color: currentColors.textSecondary }}>نام بانک</Text>
                    <Text style={{ color: currentColors.text, marginBottom: 8 }}>{bankAccount?.bank_name}</Text>
                    
                    <Text style={{ color: currentColors.textSecondary }}>نام صاحب حساب</Text>
                    <Text style={{ color: currentColors.text, marginBottom: 12 }}>{bankAccount?.account_holder}</Text>
                    
                    <View style={{ height: 1, backgroundColor: currentColors.border, marginVertical: 12 }} />
                    
                    <Text style={{ color: currentColors.primary, fontWeight: 'bold', marginBottom: 8 }}>💰 مبلغ: {parseInt(amount).toLocaleString()} تومان</Text>
                    
                    <TouchableOpacity onPress={copyReferenceCode}>
                        <Text style={{ color: currentColors.textSecondary }}>کد پیگیری (حتماً یادداشت کنید)</Text>
                        <Text style={{ color: currentColors.text, fontSize: 16, fontWeight: 'bold' }}>
                            {referenceCode} 📋
                        </Text>
                    </TouchableOpacity>
                </View>
                
                {/* فرم ثبت رسید */}
                <View style={{
                    backgroundColor: currentColors.surfaceLight,
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 16,
                }}>
                    <Text style={{ color: currentColors.text, fontWeight: 'bold', marginBottom: 12 }}>
                        📝 پس از واریز، اطلاعات را وارد کنید
                    </Text>
                    
                    <Text style={{ color: currentColors.textSecondary, marginBottom: 4 }}>شماره پیگیری بانکی</Text>
                    <TextInput
                        style={{
                            backgroundColor: currentColors.surface,
                            borderRadius: 12,
                            padding: 12,
                            color: currentColors.text,
                            marginBottom: 12,
                        }}
                        placeholder="شماره پیگیری را وارد کنید"
                        placeholderTextColor={currentColors.textMuted}
                        value={bankTransactionId}
                        onChangeText={setBankTransactionId}
                    />
                    
                    <TouchableOpacity
                        onPress={uploadReceipt}
                        style={{
                            backgroundColor: currentColors.surface,
                            borderRadius: 12,
                            padding: 12,
                            alignItems: 'center',
                            marginBottom: 12,
                        }}
                    >
                        <Text style={{ color: currentColors.primary }}>📎 آپلود رسید (اختیاری)</Text>
                    </TouchableOpacity>
                    
                    {receiptImage && (
                        <Text style={{ color: currentColors.success, fontSize: 12, textAlign: 'center' }}>
                            ✓ تصویر رسید انتخاب شد
                        </Text>
                    )}
                </View>
                
                <TouchableOpacity
                    onPress={shareInfo}
                    style={{
                        backgroundColor: currentColors.surfaceLight,
                        paddingVertical: 12,
                        borderRadius: 12,
                        alignItems: 'center',
                        marginBottom: 12,
                        borderWidth: 1,
                        borderColor: currentColors.primary,
                    }}
                >
                    <Text style={{ color: currentColors.primary }}>📤 اشتراک‌گذاری اطلاعات</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={submitPaymentProof}
                    disabled={loading}
                    style={{
                        backgroundColor: currentColors.primary,
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                    }}
                >
                    {loading ? <ActivityIndicator color="white" /> : (
                        <Text style={{ color: '#1a1a2e', fontWeight: 'bold', fontSize: 16 }}>ثبت اطلاعات واریز</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
}