// src/components/profile/AccountCard.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';
import { supabase } from '../../lib/supabase';
import * as Clipboard from 'expo-clipboard';

export default function AccountCard() {
    const { user } = useAuthStore();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [accountNumber, setAccountNumber] = useState<string | null>(null);
    const [balance, setBalance] = useState(0);
    const [lockedBalance, setLockedBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAccountInfo();
    }, [user]);

    const loadAccountInfo = async () => {
        if (!user) return;
        
        const { data, error } = await supabase
            .from('user_accounts')
            .select('account_number, balance, locked_balance')
            .eq('user_id', user.id)
            .single();
        
        if (data) {
            setAccountNumber(data.account_number);
            setBalance(data.balance);
            setLockedBalance(data.locked_balance);
        }
        setLoading(false);
    };

    const copyToClipboard = async () => {
        if (accountNumber) {
            await Clipboard.setStringAsync(accountNumber);
            Alert.alert('✅ کپی شد', 'شماره حساب با موفقیت کپی شد');
        }
    };

    if (loading) {
        return (
            <View style={{ alignItems: 'center', padding: 20 }}>
                <ActivityIndicator size="large" color={currentColors.primary} />
            </View>
        );
    }

    return (
        <View style={{
            backgroundColor: currentColors.surfaceLight,
            borderRadius: 20,
            padding: 16,
            marginHorizontal: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: currentColors.primary + '40',
        }}>
            <Text style={{ color: currentColors.textSecondary, fontSize: 12, marginBottom: 4 }}>
                حساب کاربری دوبنا
            </Text>
            
            <TouchableOpacity onPress={copyToClipboard} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Text style={{ color: currentColors.primary, fontSize: 20, fontWeight: 'bold', letterSpacing: 2 }}>
                    {accountNumber}
                </Text>
                <Text style={{ color: currentColors.textMuted, fontSize: 14, marginLeft: 8 }}>📋</Text>
            </TouchableOpacity>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ color: currentColors.textSecondary, fontSize: 13 }}>موجودی آزاد:</Text>
                <Text style={{ color: currentColors.success, fontSize: 15, fontWeight: 'bold' }}>
                    {(balance - lockedBalance).toLocaleString()} تومان
                </Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ color: currentColors.textSecondary, fontSize: 13 }}>موجودی قفل شده:</Text>
                <Text style={{ color: currentColors.warning, fontSize: 15, fontWeight: 'bold' }}>
                    {lockedBalance.toLocaleString()} تومان
                </Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, paddingTop: 8, borderTopWidth: 1, borderTopColor: currentColors.border }}>
                <Text style={{ color: currentColors.textSecondary, fontSize: 13 }}>مجموع موجودی:</Text>
                <Text style={{ color: currentColors.primary, fontSize: 16, fontWeight: 'bold' }}>
                    {balance.toLocaleString()} تومان
                </Text>
            </View>
        </View>
    );
}