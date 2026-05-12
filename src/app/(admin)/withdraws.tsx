// src/app/(admin)/withdraws.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    TextInput,
    Modal,
    Image,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../lib/supabase';
import * as ImagePicker from 'expo-image-picker';

export default function WithdrawsManagement() {
    const [withdraws, setWithdraws] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState<'pending' | 'completed' | 'all'>('pending');
    const [selectedWithdraw, setSelectedWithdraw] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [receiptImage, setReceiptImage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadWithdraws();
    }, [selectedTab]);

    const loadWithdraws = async () => {
        setLoading(true);
        let query = supabase
            .from('withdraw_requests')
            .select(`
                *,
                profiles (username, full_name, phone, bank_name, card_number, account_holder)
            `)
            .order('created_at', { ascending: false });
        
        if (selectedTab === 'pending') {
            query = query.eq('status', 'pending');
        } else if (selectedTab === 'completed') {
            query = query.eq('status', 'completed');
        }
        
        const { data } = await query;
        setWithdraws(data || []);
        setLoading(false);
    };

    const handleApprove = async (withdraw: any) => {
        setSelectedWithdraw(withdraw);
        setModalVisible(true);
    };

    const handleReject = async (withdraw: any) => {
        Alert.alert(
            'رد درخواست',
            'آیا مطمئن هستید؟ این عملیات قابل بازگشت نیست.',
            [
                { text: 'انصراف', style: 'cancel' },
                {
                    text: 'رد',
                    style: 'destructive',
                    onPress: async () => {
                        // برگرداندن موجودی به کاربر
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('balance')
                            .eq('id', withdraw.user_id)
                            .single();
                        
                        await supabase
                            .from('profiles')
                            .update({ balance: (profile?.balance || 0) + withdraw.amount })
                            .eq('id', withdraw.user_id);
                        
                        await supabase
                            .from('withdraw_requests')
                            .update({ status: 'rejected' })
                            .eq('id', withdraw.id);
                        
                        Alert.alert('موفق', 'درخواست برداشت رد شد');
                        loadWithdraws();
                    },
                },
            ]
        );
    };

    const handleSubmitTransfer = async () => {
        if (!transactionId.trim()) {
            Alert.alert('خطا', 'شماره پیگیری را وارد کنید');
            return;
        }
        
        setSubmitting(true);
        
        // آپلود رسید
        let receiptUrl = null;
        if (receiptImage) {
            const base64 = receiptImage.split(',')[1];
            const fileName = `withdraw_${selectedWithdraw.id}_${Date.now()}.jpg`;
            const { data: uploadData } = await supabase.storage
                .from('withdraw_receipts')
                .upload(fileName, base64, { contentType: 'image/jpeg' });
            
            if (uploadData) {
                const { data: urlData } = supabase.storage
                    .from('withdraw_receipts')
                    .getPublicUrl(fileName);
                receiptUrl = urlData.publicUrl;
            }
        }
        
        // ثبت لاگ
        await supabase
            .from('withdraw_logs')
            .insert({
                withdraw_request_id: selectedWithdraw.id,
                transaction_id: transactionId,
                bank_receipt: receiptUrl,
                notes: `واریز به کارت ${selectedWithdraw.profiles.card_number}`,
            });
        
        // بروزرسانی وضعیت درخواست
        await supabase
            .from('withdraw_requests')
            .update({ 
                status: 'completed',
                processed_at: new Date().toISOString(),
            })
            .eq('id', selectedWithdraw.id);
        
        setModalVisible(false);
        setTransactionId('');
        setReceiptImage(null);
        setSubmitting(false);
        
        Alert.alert('موفق', 'برداشت با موفقیت ثبت شد');
        loadWithdraws();
    };

    const pickReceiptImage = async () => {
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return '#f59e0b';
            case 'completed': return '#10b981';
            case 'rejected': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'در انتظار';
            case 'completed': return 'تأیید شده';
            case 'rejected': return 'رد شده';
            default: return status;
        }
    };

    return (
        <LinearGradient colors={['#0a0a1a', '#12122a']} style={{ flex: 1 }}>
            <StatusBar style="light" />
            
            <View style={{ paddingHorizontal: 16, paddingTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
                    <Text style={{ color: '#eab308', fontSize: 16 }}>← بازگشت</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                    مدیریت برداشتها
                </Text>
            </View>
            
            {/* تب‌ها */}
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginBottom: 16, gap: 8 }}>
                {[
                    { id: 'pending', label: 'در انتظار' },
                    { id: 'completed', label: 'تأیید شده' },
                    { id: 'all', label: 'همه' },
                ].map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        onPress={() => setSelectedTab(tab.id as any)}
                        style={{
                            flex: 1,
                            paddingVertical: 10,
                            borderRadius: 12,
                            backgroundColor: selectedTab === tab.id ? '#eab308' : '#1a1a2e',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ color: selectedTab === tab.id ? '#0a0a1a' : '#a0aec0', fontWeight: 'bold' }}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#eab308" />
                ) : withdraws.length === 0 ? (
                    <Text style={{ color: '#a0aec0', textAlign: 'center', padding: 40 }}>
                        هیچ درخواستی یافت نشد
                    </Text>
                ) : (
                    withdraws.map((item) => (
                        <View
                            key={item.id}
                            style={{
                                backgroundColor: '#1a1a2e',
                                borderRadius: 16,
                                padding: 16,
                                marginBottom: 12,
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    {item.profiles?.username || 'کاربر'}
                                </Text>
                                <View style={{
                                    backgroundColor: getStatusColor(item.status) + '20',
                                    paddingHorizontal: 8,
                                    paddingVertical: 2,
                                    borderRadius: 12,
                                }}>
                                    <Text style={{ color: getStatusColor(item.status), fontSize: 12 }}>
                                        {getStatusText(item.status)}
                                    </Text>
                                </View>
                            </View>
                            
                            <Text style={{ color: '#a0aec0', fontSize: 12 }}>
                                شماره: {item.profiles?.phone || 'نامشخص'}
                            </Text>
                            <Text style={{ color: '#a0aec0', fontSize: 12 }}>
                                کارت: {item.profiles?.card_number || 'نامشخص'}
                            </Text>
                            <Text style={{ color: '#eab308', fontSize: 18, fontWeight: 'bold', marginVertical: 8 }}>
                                {item.amount.toLocaleString()} تومان
                            </Text>
                            <Text style={{ color: '#6b7280', fontSize: 11 }}>
                                تاریخ: {new Date(item.created_at).toLocaleDateString('fa-IR')}
                            </Text>
                            
                            {item.status === 'pending' && (
                                <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
                                    <TouchableOpacity
                                        onPress={() => handleApprove(item)}
                                        style={{ flex: 1, backgroundColor: '#10b981', paddingVertical: 10, borderRadius: 8, alignItems: 'center' }}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>تأیید و واریز</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleReject(item)}
                                        style={{ flex: 1, backgroundColor: '#ef4444', paddingVertical: 10, borderRadius: 8, alignItems: 'center' }}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>رد</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>
            
            {/* مودال تأیید برداشت */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 }}>
                    <View style={{ backgroundColor: '#1a1a2e', borderRadius: 24, padding: 20 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
                            تأیید واریز وجه
                        </Text>
                        
                        <Text style={{ color: '#a0aec0', marginBottom: 8 }}>
                            کاربر: {selectedWithdraw?.profiles?.username}
                        </Text>
                        <Text style={{ color: '#eab308', fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                            {selectedWithdraw?.amount?.toLocaleString()} تومان
                        </Text>
                        
                        <Text style={{ color: 'white', marginBottom: 8 }}>شماره پیگیری / رسید</Text>
                        <TextInput
                            style={{
                                backgroundColor: '#0a0a1a',
                                borderRadius: 12,
                                padding: 12,
                                color: 'white',
                                marginBottom: 16,
                            }}
                            placeholder="شماره پیگیری را وارد کنید"
                            placeholderTextColor="#6b7280"
                            value={transactionId}
                            onChangeText={setTransactionId}
                        />
                        
                        <TouchableOpacity
                            onPress={pickReceiptImage}
                            style={{
                                backgroundColor: '#0a0a1a',
                                borderRadius: 12,
                                padding: 12,
                                alignItems: 'center',
                                marginBottom: 16,
                            }}
                        >
                            <Text style={{ color: '#eab308' }}>
                                {receiptImage ? '✓ تصویر رسید انتخاب شد' : '📎 آپلود رسید'}
                            </Text>
                        </TouchableOpacity>
                        
                        {receiptImage && (
                            <Image source={{ uri: receiptImage }} style={{ width: 100, height: 100, borderRadius: 8, marginBottom: 16 }} />
                        )}
                        
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={{ flex: 1, backgroundColor: '#4a5568', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}
                            >
                                <Text style={{ color: 'white' }}>انصراف</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSubmitTransfer}
                                disabled={submitting}
                                style={{ flex: 1, backgroundColor: '#eab308', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}
                            >
                                {submitting ? <ActivityIndicator size="small" color="white" /> : <Text style={{ color: '#0a0a1a', fontWeight: 'bold' }}>تأیید نهایی</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
}