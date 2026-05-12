// src/app/(drawer)/index.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    Linking,
    Switch,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { colors } from '../../constants/colors';
import Avatar from '../../components/UI/Avatar';
import { supabase } from '../../lib/supabase';

// آیکون‌های منو (با ایموجی برای سادگی)
const MENU_ITEMS = {
    // بخش اول: حساب کاربری
    account: { icon: '👤', label: 'حساب کاربری', route: '/account' },
    depositWithdraw: { icon: '💰', label: 'واریز و برداشت', route: '/deposit-withdraw' },
    transfer: { icon: '🔄', label: 'انتقال اعتبار به دوستان', route: '/transfer' },
    financialReports: { icon: '📊', label: 'گزارشات مالی', route: '/financial-reports' },
    myWins: { icon: '🏆', label: 'لیست برد های من', route: '/my-wins' },
    
    // بخش دوم: گروه‌ها
    createGroup: { icon: '👥', label: 'ساخت گروه', route: '/create-group' },
    topGroups: { icon: '⭐', label: 'گروه‌های برتر', route: '/top-groups' },
    
    // بخش سوم: پشتیبانی
    support: { icon: '🎧', label: 'پشتیبانی', route: '/support' },
    faq: { icon: '❓', label: 'سوالات متداول', route: '/faq' },
    terms: { icon: '📜', label: 'قوانین و شرایط استفاده از دوبنا', route: '/terms' },
    
    // بخش چهارم: شبکه‌های اجتماعی
    bleChannel: { icon: '💬', label: 'کانال رسمی دوبنا در بله', url: 'https://ble.ir/dobna' },
    telegramChannel: { icon: '✈️', label: 'کانال دوبنا در تلگرام', url: 'https://t.me/dobna' },
    instagram: { icon: '📷', label: 'شبکه های اجتماعی دوبنا', url: 'https://instagram.com/dobna' },
};

export default function DrawerMenuScreen() {
    const { user, logout, balance } = useAuthStore();
    const { theme, toggleTheme } = useThemeStore();
    const currentColors = colors[theme];
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState(user?.full_name || '');

    const handleLogout = async () => {
        Alert.alert(
            'خروج از حساب',
            'آیا مطمئن هستید می‌خواهید خارج شوید؟',
            [
                { text: 'انصراف', style: 'cancel' },
                {
                    text: 'خروج',
                    style: 'destructive',
                    onPress: async () => {
                        await supabase.auth.signOut();
                        logout();
                        router.replace('/(auth)');
                    },
                },
            ]
        );
    };

    const handleChangeAvatar = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('خطا', 'برای تغییر آواتار به دسترسی نیاز داریم');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            // آپلود آواتار به Supabase Storage
            // ... کد آپلود
            Alert.alert('موفق', 'آواتار شما با موفقیت تغییر کرد');
        }
    };

    const handleEditName = () => {
        if (isEditingName) {
            // ذخیره نام جدید
            Alert.alert('موفق', 'نام شما با موفقیت تغییر کرد');
        }
        setIsEditingName(!isEditingName);
    };

    const handleMenuItemPress = (item: any) => {
        if (item.route) {
            router.push(item.route);
        } else if (item.url) {
            Linking.openURL(item.url).catch(err => {
                console.error('Failed to open URL:', err);
                Alert.alert('خطا', 'باز کردن لینک با مشکل مواجه شد');
            });
        }
    };

    const handleAddAccount = () => {
        router.push('/(auth)/phone-login');
    };

    return (
        <LinearGradient
            colors={[currentColors.drawerBackground, currentColors.surface]}
            style={styles.container}
        >
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            
            {/* هدر منو */}
            <View style={[styles.header, { borderBottomColor: currentColors.divider }]}>
                <TouchableOpacity 
                    onPress={() => router.back()} 
                    style={styles.backButton}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.backIcon, { color: currentColors.text }]}>←</Text>
                </TouchableOpacity>
                
                <Text style={[styles.headerTitle, { color: currentColors.primary }]}>
                    منو
                </Text>
                
                {/* دکمه تغییر تم */}
                <TouchableOpacity 
                    onPress={toggleTheme}
                    style={styles.themeButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.themeIcon}>
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* پروفایل کاربری - کادر رنگی */}
                <View style={[
                    styles.profileCard,
                    { 
                        backgroundColor: currentColors.primary + '15',
                        borderColor: currentColors.primary + '30',
                    }
                ]}>
                    {/* آواتار با دکمه ویرایش */}
                    <View style={styles.avatarContainer}>
                        <Avatar 
                            avatarUrl={user?.avatar_url}
                            size={80}
                        />
                        <TouchableOpacity 
                            onPress={handleChangeAvatar}
                            style={[styles.editAvatarBtn, { backgroundColor: currentColors.primary }]}
                        >
                            <Text style={styles.editAvatarIcon}>✏️</Text>
                        </TouchableOpacity>
                    </View>

                    {/* نام کاربر با قابلیت ویرایش */}
                    <View style={styles.nameContainer}>
                        {isEditingName ? (
                            <TextInput
                                style={[styles.nameInput, { 
                                    color: currentColors.text,
                                    borderColor: currentColors.primary,
                                    backgroundColor: currentColors.surfaceLight,
                                }]}
                                value={newName}
                                onChangeText={setNewName}
                                autoFocus
                            />
                        ) : (
                            <Text style={[styles.userName, { color: currentColors.text }]}>
                                {user?.full_name || user?.username || 'کاربر دوبنا'}
                            </Text>
                        )}
                        <TouchableOpacity onPress={handleEditName} style={styles.editNameBtn}>
                            <Text style={styles.editNameIcon}>✏️</Text>
                        </TouchableOpacity>
                    </View>

                    {/* نام کاربری و شماره تلفن */}
                    <Text style={[styles.userInfo, { color: currentColors.textSecondary }]}>
                        @{user?.username || 'user'} | {user?.phone || '+989********'}
                    </Text>

                    {/* دکمه اضافه کردن حساب کاربری */}
                    <TouchableOpacity 
                        onPress={handleAddAccount}
                        style={[styles.addAccountBtn, { backgroundColor: currentColors.surfaceLight }]}
                    >
                        <Text style={[styles.addAccountIcon, { color: currentColors.primary }]}>+</Text>
                        <Text style={[styles.addAccountText, { color: currentColors.text }]}>
                            اضافه کردن حساب کاربری
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* بخش اول: حساب کاربری */}
                <View style={styles.menuSection}>
                    <MenuItem 
                        icon={MENU_ITEMS.account.icon}
                        label={MENU_ITEMS.account.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.account)}
                        colors={currentColors}
                    />
                    <MenuItem 
                        icon={MENU_ITEMS.depositWithdraw.icon}
                        label={MENU_ITEMS.depositWithdraw.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.depositWithdraw)}
                        colors={currentColors}
                    />
                    <MenuItem 
                        icon={MENU_ITEMS.transfer.icon}
                        label={MENU_ITEMS.transfer.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.transfer)}
                        colors={currentColors}
                    />
                    <MenuItem 
                        icon={MENU_ITEMS.financialReports.icon}
                        label={MENU_ITEMS.financialReports.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.financialReports)}
                        colors={currentColors}
                    />
                    <MenuItem 
                        icon={MENU_ITEMS.myWins.icon}
                        label={MENU_ITEMS.myWins.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.myWins)}
                        colors={currentColors}
                    />
                </View>

                <View style={[styles.divider, { backgroundColor: currentColors.divider }]} />

                {/* بخش دوم: گروه‌ها */}
                <View style={styles.menuSection}>
                    <MenuItem 
                        icon={MENU_ITEMS.createGroup.icon}
                        label={MENU_ITEMS.createGroup.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.createGroup)}
                        colors={currentColors}
                    />
                    <MenuItem 
                        icon={MENU_ITEMS.topGroups.icon}
                        label={MENU_ITEMS.topGroups.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.topGroups)}
                        colors={currentColors}
                    />
                </View>

                <View style={[styles.divider, { backgroundColor: currentColors.divider }]} />

                {/* بخش سوم: پشتیبانی */}
                <View style={styles.menuSection}>
                    <MenuItem 
                        icon={MENU_ITEMS.support.icon}
                        label={MENU_ITEMS.support.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.support)}
                        colors={currentColors}
                    />
                    <MenuItem 
                        icon={MENU_ITEMS.faq.icon}
                        label={MENU_ITEMS.faq.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.faq)}
                        colors={currentColors}
                    />
                    <MenuItem 
                        icon={MENU_ITEMS.terms.icon}
                        label={MENU_ITEMS.terms.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.terms)}
                        colors={currentColors}
                    />
                </View>

                <View style={[styles.divider, { backgroundColor: currentColors.divider }]} />

                {/* بخش چهارم: شبکه‌های اجتماعی */}
                <View style={styles.menuSection}>
                    <MenuItem 
                        icon={MENU_ITEMS.bleChannel.icon}
                        label={MENU_ITEMS.bleChannel.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.bleChannel)}
                        colors={currentColors}
                        isExternal
                    />
                    <MenuItem 
                        icon={MENU_ITEMS.telegramChannel.icon}
                        label={MENU_ITEMS.telegramChannel.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.telegramChannel)}
                        colors={currentColors}
                        isExternal
                    />
                    <MenuItem 
                        icon={MENU_ITEMS.instagram.icon}
                        label={MENU_ITEMS.instagram.label}
                        onPress={() => handleMenuItemPress(MENU_ITEMS.instagram)}
                        colors={currentColors}
                        isExternal
                    />
                </View>

                <View style={[styles.divider, { backgroundColor: currentColors.divider }]} />

                {/* خروج از حساب کاربری */}
                <TouchableOpacity 
                    onPress={handleLogout}
                    style={[styles.logoutBtn, { backgroundColor: currentColors.surfaceLight }]}
                    activeOpacity={0.7}
                >
                    <Text style={styles.logoutIcon}>🚪</Text>
                    <Text style={[styles.logoutText, { color: currentColors.error }]}>
                        خروج از حساب کاربری
                    </Text>
                </TouchableOpacity>

                {/* نسخه اپلیکیشن */}
                <Text style={[styles.versionText, { color: currentColors.textMuted }]}>
                    نسخه 1.0.0
                </Text>
            </ScrollView>
        </LinearGradient>
    );
}

// کامپوننت آیتم منو
interface MenuItemProps {
    icon: string;
    label: string;
    onPress: () => void;
    colors: any;
    isExternal?: boolean;
}

function MenuItem({ icon, label, onPress, colors, isExternal }: MenuItemProps) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={styles.menuItem}
            activeOpacity={0.7}
        >
            <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>{icon}</Text>
                <Text style={[styles.menuLabel, { color: colors.text }]}>
                    {label}
                </Text>
            </View>
            {isExternal && (
                <Text style={[styles.externalIcon, { color: colors.textMuted }]}>↗</Text>
            )}
        </TouchableOpacity>
    );
}

// استایل‌ها
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingTop: 50,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    backIcon: {
        fontSize: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    themeButton: {
        padding: 8,
    },
    themeIcon: {
        fontSize: 24,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileCard: {
        margin: 16,
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    editAvatarIcon: {
        fontSize: 12,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    nameInput: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        minWidth: 150,
        textAlign: 'center',
    },
    editNameBtn: {
        marginLeft: 8,
        padding: 4,
    },
    editNameIcon: {
        fontSize: 14,
    },
    userInfo: {
        fontSize: 12,
        marginBottom: 16,
    },
    addAccountBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
        gap: 8,
    },
    addAccountIcon: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addAccountText: {
        fontSize: 14,
    },
    menuSection: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 8,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    menuIcon: {
        fontSize: 22,
        width: 32,
    },
    menuLabel: {
        fontSize: 15,
        fontWeight: '500',
    },
    externalIcon: {
        fontSize: 14,
    },
    divider: {
        height: 1,
        marginHorizontal: 16,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        marginTop: 24,
        padding: 16,
        borderRadius: 16,
        gap: 12,
    },
    logoutIcon: {
        fontSize: 22,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 20,
    },
});