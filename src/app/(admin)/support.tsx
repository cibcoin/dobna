// src/app/(admin)/support.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';

export default function SupportManagement() {
    const { user } = useAuthStore();
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('support_tickets')
            .select(`
                *,
                profiles (username, full_name, phone, email)
            `)
            .order('created_at', { ascending: false });
        
        setTickets(data || []);
        setLoading(false);
    };

    const handleRespond = (ticket: any) => {
        setSelectedTicket(ticket);
        setResponseText('');
        setModalVisible(true);
    };

    const handleResolve = async (ticket: any) => {
        Alert.alert(
            'بستن تیکت',
            'آیا مشکل این کاربر حل شده است؟',
            [
                { text: 'انصراف', style: 'cancel' },
                {
                    text: 'بله، حل شده',
                    onPress: async () => {
                        await supabase
                            .from('support_tickets')
                            .update({
                                status: 'resolved',
                                resolved_by: user?.id,
                                resolved_at: new Date().toISOString(),
                            })
                            .eq('id', ticket.id);
                        
                        Alert.alert('موفق', 'تیکت با موفقیت بسته شد');
                        loadTickets();
                    },
                },
            ]
        );
    };

    const handleSubmitResponse = async () => {
        if (!responseText.trim()) {
            Alert.alert('خطا', 'متن پاسخ را وارد کنید');
            return;
        }
        
        setSubmitting(true);
        
        await supabase
            .from('support_tickets')
            .update({
                admin_response: responseText,
                status: 'in_progress',
            })
            .eq('id', selectedTicket.id);
        
        setModalVisible(false);
        setResponseText('');
        setSubmitting(false);
        
        Alert.alert('موفق', 'پاسخ با موفقیت ثبت شد');
        loadTickets();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return '#f59e0b';
            case 'in_progress': return '#3b82f6';
            case 'resolved': return '#10b981';
            case 'closed': return '#6b7280';
            default: return '#6b7280';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'در انتظار';
            case 'in_progress': return 'در حال بررسی';
            case 'resolved': return 'حل شده';
            case 'closed': return 'بسته شده';
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
                    پشتیبانی کاربران
                </Text>
            </View>
            
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#eab308" />
                ) : tickets.length === 0 ? (
                    <Text style={{ color: '#a0aec0', textAlign: 'center', padding: 40 }}>
                        هیچ تیکتی یافت نشد
                    </Text>
                ) : (
                    tickets.map((ticket) => (
                        <View
                            key={ticket.id}
                            style={{
                                backgroundColor: '#1a1a2e',
                                borderRadius: 16,
                                padding: 16,
                                marginBottom: 12,
                            }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    {ticket.profiles?.username || 'کاربر'}
                                </Text>
                                <View style={{
                                    backgroundColor: getStatusColor(ticket.status) + '20',
                                    paddingHorizontal: 8,
                                    paddingVertical: 2,
                                    borderRadius: 12,
                                }}>
                                    <Text style={{ color: getStatusColor(ticket.status), fontSize: 12 }}>
                                        {getStatusText(ticket.status)}
                                    </Text>
                                </View>
                            </View>
                            
                            <Text style={{ color: '#eab308', fontWeight: 'bold', marginBottom: 4 }}>
                                {ticket.subject}
                            </Text>
                            <Text style={{ color: '#a0aec0', fontSize: 14, marginBottom: 8 }}>
                                {ticket.message}
                            </Text>
                            
                            {ticket.admin_response && (
                                <View style={{
                                    backgroundColor: '#0a0a1a',
                                    borderRadius: 12,
                                    padding: 12,
                                    marginTop: 8,
                                }}>
                                    <Text style={{ color: '#10b981', fontSize: 12, marginBottom: 4 }}>پاسخ ادمین:</Text>
                                    <Text style={{ color: '#a0aec0', fontSize: 13 }}>{ticket.admin_response}</Text>
                                </View>
                            )}
                            
                            <Text style={{ color: '#6b7280', fontSize: 11, marginTop: 8 }}>
                                {new Date(ticket.created_at).toLocaleDateString('fa-IR')}
                            </Text>
                            
                            {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
                                <View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
                                    <TouchableOpacity
                                        onPress={() => handleRespond(ticket)}
                                        style={{ flex: 1, backgroundColor: '#3b82f6', paddingVertical: 10, borderRadius: 8, alignItems: 'center' }}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>پاسخ</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleResolve(ticket)}
                                        style={{ flex: 1, backgroundColor: '#10b981', paddingVertical: 10, borderRadius: 8, alignItems: 'center' }}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>حل شد</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>
            
            {/* مودال پاسخ به تیکت */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 }}>
                    <View style={{ backgroundColor: '#1a1a2e', borderRadius: 24, padding: 20 }}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
                            پاسخ به تیکت
                        </Text>
                        
                        <Text style={{ color: '#a0aec0', marginBottom: 8 }}>
                            کاربر: {selectedTicket?.profiles?.username}
                        </Text>
                        <Text style={{ color: '#eab308', marginBottom: 16 }}>
                            موضوع: {selectedTicket?.subject}
                        </Text>
                        
                        <Text style={{ color: 'white', marginBottom: 8 }}>متن پاسخ</Text>
                        <TextInput
                            style={{
                                backgroundColor: '#0a0a1a',
                                borderRadius: 12,
                                padding: 12,
                                color: 'white',
                                height: 120,
                                textAlignVertical: 'top',
                                marginBottom: 16,
                            }}
                            placeholder="پاسخ خود را وارد کنید..."
                            placeholderTextColor="#6b7280"
                            multiline
                            value={responseText}
                            onChangeText={setResponseText}
                        />
                        
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={{ flex: 1, backgroundColor: '#4a5568', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}
                            >
                                <Text style={{ color: 'white' }}>انصراف</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleSubmitResponse}
                                disabled={submitting}
                                style={{ flex: 1, backgroundColor: '#eab308', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}
                            >
                                {submitting ? <ActivityIndicator size="small" color="white" /> : <Text style={{ color: '#0a0a1a', fontWeight: 'bold' }}>ارسال</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
}