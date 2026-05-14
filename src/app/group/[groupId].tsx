// src/app/group/[groupId].tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    RefreshControl,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';

export default function GroupScreen() {
    const { groupId } = useLocalSearchParams();
    const { theme } = useThemeStore();
    const currentColors = colors[theme];
    
    const [group, setGroup] = useState<any>(null);
    const [activeGames, setActiveGames] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGroupData();
    }, [groupId]);

    const loadGroupData = async () => {
        // دریافت اطلاعات گروه
        const { data: groupData } = await supabase
            .from('groups')
            .select('*')
            .eq('id', groupId)
            .single();
        setGroup(groupData);
        
        // دریافت بازی‌های فعال
        const { data: games } = await supabase
            .from('group_games')
            .select('*')
            .eq('group_id', groupId)
            .eq('status', 'waiting')
            .order('created_at', { ascending: false });
        setActiveGames(games || []);
        
        // دریافت اعضای گروه
        const { data: membersData } = await supabase
            .from('group_members')
            .select('user_id, role, profiles(username, avatar_url)')
            .eq('group_id', groupId)
            .limit(10);
        setMembers(membersData || []);
        
        setLoading(false);
    };

    const joinGame = (gameId: string, tierId: number) => {
        router.push({
            pathname: `/group-game/${gameId}`,
            params: { groupId, tierId: tierId.toString() }
        });
    };

    return (
        <LinearGradient colors={[currentColors.background, currentColors.surface]} style={{ flex: 1 }}>
            <ScrollView>
                {/* هدر گروه */}
                <View style={{
                    padding: 20,
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderBottomColor: currentColors.border,
                }}>
                    <View style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: currentColors.surfaceLight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 12,
                    }}>
                        <Text style={{ fontSize: 40 }}>👥</Text>
                    </View>
                    <Text style={{ color: currentColors.text, fontSize: 22, fontWeight: 'bold' }}>
                        {group?.name}
                    </Text>
                    <Text style={{ color: currentColors.textSecondary, fontSize: 14, marginTop: 4 }}>
                        👥 {group?.total_members} عضو | 🏆 {group?.rank_score} امتیاز
                    </Text>
                </View>

                {/* بازی‌های فعال */}
                <View style={{ padding: 16 }}>
                    <Text style={{ color: currentColors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
                        🎮 بازی‌های فعال
                    </Text>
                    
                    {activeGames.map((game) => (
                        <TouchableOpacity
                            key={game.id}
                            onPress={() => joinGame(game.id, game.tier_id)}
                            style={{
                                backgroundColor: currentColors.surfaceLight,
                                borderRadius: 16,
                                padding: 16,
                                marginBottom: 12,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <View>
                                <Text style={{ color: currentColors.primary, fontWeight: 'bold' }}>
                                    {game.tier_id === 1 ? '۵,۰۰۰' : game.tier_id === 2 ? '۱۰,۰۰۰' : game.tier_id === 3 ? '۲۰,۰۰۰' : game.tier_id === 4 ? '۵۰,۰۰۰' : '۱۰۰,۰۰۰'} تومانی
                                </Text>
                                <Text style={{ color: currentColors.textSecondary, fontSize: 12 }}>
                                    کارت‌ها: {game.current_cards}/60
                                </Text>
                            </View>
                            <View style={{
                                backgroundColor: currentColors.primary,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 20,
                            }}>
                                <Text style={{ color: '#1a1a2e', fontWeight: 'bold' }}>شرکت</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    
                    {activeGames.length === 0 && (
                        <Text style={{ color: currentColors.textMuted, textAlign: 'center', padding: 20 }}>
                            هیچ بازی فعالی وجود ندارد
                        </Text>
                    )}
                </View>

                {/* اعضای گروه */}
                <View style={{ padding: 16 }}>
                    <Text style={{ color: currentColors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
                        👥 اعضای گروه
                    </Text>
                    {members.map((member) => (
                        <View key={member.user_id} style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: currentColors.border,
                        }}>
                            <View style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: currentColors.surfaceLight,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text>{member.profiles?.username?.charAt(0) || '👤'}</Text>
                            </View>
                            <Text style={{ color: currentColors.text, marginLeft: 12, flex: 1 }}>
                                {member.profiles?.username}
                            </Text>
                            {member.role === 'owner' && (
                                <Text style={{ color: currentColors.primary, fontSize: 12 }}>مالک</Text>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}