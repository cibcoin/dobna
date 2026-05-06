// src/app/(tabs)/transfer.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useAuthStore } from '../../stores/authStore';
import { internalTransfer, getUserTransferLimits } from '../../services/transactionService';

export default function TransferScreen() {
    const { user } = useAuthStore();
    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [limits, setLimits] = useState({
        minAmount: 10000,
        maxAmount: 1000000,
        dailyLimit: 10000000,
        transferredToday: 0,
        remainingToday: 10000000
    });
    
    useEffect(() => {
        loadLimits();
    }, []);
    
    const loadLimits = async () => {
        if (!user) return;
        const limitsData = await getUserTransferLimits(user.id);
        setLimits(limitsData);
    };
    
    const handleTransfer = async () => {
        if (!user) {
            Alert.alert('خطا', 'لطفاً وارد حساب خود شوید');
            return;
        }
        
        if (!username.trim()) {
            Alert.alert('خطا', 'نام کاربری گیرنده را وارد کنید');
            return;
        }
        
        const amountNum = parseInt(amount);
        if (isNaN(amountNum) || amountNum < limits.minAmount) {
            Alert.alert('خطا', `حداقل مبلغ انتقال ${limits.minAmount.toLocaleString()} تومان است`);
            return;
        }
        
        if (amountNum > limits.maxAmount) {
            Alert.alert('خطا', `حداکثر مبلغ انتقال ${limits.maxAmount.toLocaleString()} تومان است`);
            return;
        }
        
        if (amountNum > limits.remainingToday) {
            Alert.alert('خطا', `سقف روزانه شما ${limits.remainingToday.toLocaleString()} تومان باقی مانده است`);
            return;
        }
        
        setLoading(true);
        
        // پیدا کردن کاربر گیرنده با نام کاربری
        const { data: recipient, error } = await supabase
            .from('profiles')
            .select('id, username')
            .eq('username', username.trim())
            .single();
        
        if (error || !recipient) {
            Alert.alert('خطا', 'کاربر مورد نظر یافت نشد');
            setLoading(false);
            return;
        }
        
        // انجام انتقال
        const result = await internalTransfer(
            user.id,
            recipient.id,
            amountNum,
            description || 'انتقال اعتبار'
        );
        
        if (result.success) {
            Alert.alert(
                '✅ انتقال موفق',
                `مبلغ ${amountNum.toLocaleString()} تومان به ${recipient.username} انتقال یافت`
            );
            setUsername('');
            setAmount('');
            setDescription('');
            loadLimits(); // بروزرسانی محدودیت‌ها
        } else {
            Alert.alert('خطا', result.error || 'انتقال انجام نشد');
        }
        
        setLoading(false);
    };
    
    return (
        <ScrollView className="flex-1 bg-gray-900 p-4">
            <View className="bg-gray-800 rounded-xl p-4 mb-6">
                <Text className="text-white text-lg font-bold mb-2">محدودیت‌های انتقال</Text>
                <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-400">حداقل مبلغ:</Text>
                    <Text className="text-white">{limits.minAmount.toLocaleString()} تومان</Text>
                </View>
                <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-400">حداکثر مبلغ:</Text>
                    <Text className="text-white">{limits.maxAmount.toLocaleString()} تومان</Text>
                </View>
                <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-400">سقف روزانه:</Text>
                    <Text className="text-white">{limits.dailyLimit.toLocaleString()} تومان</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-400">باقی‌مانده امروز:</Text>
                    <Text className="text-green-500">{limits.remainingToday.toLocaleString()} تومان</Text>
                </View>
            </View>
            
            <View className="bg-gray-800 rounded-xl p-4">
                <Text className="text-white text-lg font-bold mb-4">انتقال اعتبار</Text>
                
                <Text className="text-gray-400 mb-1">نام کاربری گیرنده</Text>
                <TextInput
                    className="bg-gray-700 rounded-lg p-3 text-white mb-4"
                    placeholder="username"
                    placeholderTextColor="#666"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                
                <Text className="text-gray-400 mb-1">مبلغ (تومان)</Text>
                <TextInput
                    className="bg-gray-700 rounded-lg p-3 text-white mb-4"
                    placeholder="مبلغ را وارد کنید"
                    placeholderTextColor="#666"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />
                
                <Text className="text-gray-400 mb-1">توضیحات (اختیاری)</Text>
                <TextInput
                    className="bg-gray-700 rounded-lg p-3 text-white mb-6"
                    placeholder="توضیحات..."
                    placeholderTextColor="#666"
                    value={description}
                    onChangeText={setDescription}
                />
                
                <TouchableOpacity
                    className={`bg-yellow-600 rounded-lg p-4 ${loading ? 'opacity-50' : ''}`}
                    onPress={handleTransfer}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-center font-bold text-lg">
                            انتقال اعتبار
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}