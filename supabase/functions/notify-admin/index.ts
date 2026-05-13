// supabase/functions/notify-admin/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// تنظیمات ربات‌ها
const BOT_CONFIGS = {
    // ربات بله
    ble: {
        enabled: true,
        botName: 'dobna_bot',
        apiUrl: 'https://ble.ir/api/bot/sendMessage', // آدرس真实 API
        adminId: '@admin_dobna', // یا عدد
    },
    // ربات تلگرام
    telegram: {
        enabled: true,
        botToken: Deno.env.get('TELEGRAM_BOT_TOKEN') || '',
        adminChatId: '989111313188', // شماره ادمین با کد کشور
        apiUrl: 'https://api.telegram.org/bot',
    },
    // واتساپ Business (با Twilio یا WhatsApp Cloud API)
    whatsapp: {
        enabled: true,
        phoneNumberId: Deno.env.get('WHATSAPP_PHONE_ID') || '',
        accessToken: Deno.env.get('WHATSAPP_ACCESS_TOKEN') || '',
        adminNumber: '989111313188',
        apiUrl: 'https://graph.facebook.com/v18.0',
    },
};

serve(async (req) => {
    try {
        const payload = await req.json();
        const { event, data, timestamp } = payload;
        
        // دریافت اطلاعات کامل کاربر از دیتابیس
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        
        let userInfo = null;
        let message = '';
        let title = '';
        
        // ساخت پیام بر اساس نوع رویداد
        switch (event) {
            case 'new_withdraw':
                userInfo = await getUserInfo(supabase, data.user_id);
                title = '💰 درخواست برداشت جدید';
                message = `
🆔 کاربر: ${userInfo?.username || 'نامشخص'} (${userInfo?.full_name || ''})
📞 شماره: ${userInfo?.phone || 'نامشخص'}
💳 کارت: ${userInfo?.card_number || 'نامشخص'}
💰 مبلغ: ${data.amount.toLocaleString()} تومان
📅 تاریخ: ${new Date(timestamp).toLocaleString('fa-IR')}
🆔 شماره درخواست: ${data.id}

⚠️ لطفاً هرچه سریعتر بررسی و پرداخت کنید.
                `;
                break;
                
            case 'new_deposit':
                userInfo = await getUserInfo(supabase, data.user_id);
                title = '✅ واریز موفق';
                message = `
🆔 کاربر: ${userInfo?.username || 'نامشخص'} (${userInfo?.full_name || ''})
📞 شماره: ${userInfo?.phone || 'نامشخص'}
💰 مبلغ: ${data.amount.toLocaleString()} تومان
📅 تاریخ: ${new Date(timestamp).toLocaleString('fa-IR')}
🆔 شماره تراکنش: ${data.id}

✨ موجودی کاربر به‌روزرسانی شد.
                `;
                break;
                
            case 'new_ticket':
                userInfo = await getUserInfo(supabase, data.user_id);
                title = '🎧 تیکت پشتیبانی جدید';
                message = `
🆔 کاربر: ${userInfo?.username || 'نامشخص'} (${userInfo?.full_name || ''})
📞 شماره: ${userInfo?.phone || 'نامشخص'}
📋 موضوع: ${data.subject}
📝 متن: ${data.message}
📅 تاریخ: ${new Date(timestamp).toLocaleString('fa-IR')}
🆔 شماره تیکت: ${data.id}

🔔 لطفاً هرچه سریعتر پاسخ دهید.
                `;
                break;
                
            case 'new_winner':
                title = '🏆 برنده جدید';
                message = `
🏆 ${data.winner_type === 'line' ? 'برد خطی' : 'برد پر (فول هاوس)'}
🆔 کاربر: ${data.winner_user_name}
💰 مبلغ: ${data.prize_amount.toLocaleString()} تومان
🎴 کارت شماره: ${data.card_number}
📅 تاریخ: ${new Date(timestamp).toLocaleString('fa-IR')}

✨ مبلغ به حساب کاربر واریز شد.
                `;
                break;
                
            default:
                return new Response(JSON.stringify({ error: 'Unknown event' }), { status: 400 });
        }
        
        // ارسال به همه پلتفرم‌ها
        const results = await Promise.allSettled([
            sendToBale(title, message),
            sendToTelegram(title, message),
            sendToWhatsApp(title, message),
        ]);
        
        return new Response(JSON.stringify({ 
            success: true, 
            results: results.map(r => r.status === 'fulfilled' ? 'sent' : 'failed') 
        }), { status: 200 });
        
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
});

// دریافت اطلاعات کاربر
async function getUserInfo(supabase: any, userId: string) {
    const { data } = await supabase
        .from('profiles')
        .select('username, full_name, phone, card_number, bank_name')
        .eq('id', userId)
        .single();
    return data;
}

// ============================================
// ارسال به پیام‌رسان بله
// ============================================
async function sendToBale(title: string, message: string): Promise<boolean> {
    if (!BOT_CONFIGS.ble.enabled) return false;
    
    try {
        // روش 1: استفاده از API بله (در صورت وجود)
        const response = await fetch(BOT_CONFIGS.ble.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bot_name: BOT_CONFIGS.ble.botName,
                chat_id: BOT_CONFIGS.ble.adminId,
                text: `*${title}*\n\n${message}`,
                parse_mode: 'Markdown',
            }),
        });
        
        if (response.ok) {
            console.log('✅ Sent to Bale');
            return true;
        }
        
        // روش 2: ارسال از طریق Webhook (راه‌اندازی شده در بله)
        // برای این روش باید در پنل بله Webhook تنظیم کنید
        return false;
        
    } catch (error) {
        console.error('Bale error:', error);
        return false;
    }
}

// ============================================
// ارسال به تلگرام
// ============================================
async function sendToTelegram(title: string, message: string): Promise<boolean> {
    if (!BOT_CONFIGS.telegram.enabled) return false;
    
    try {
        const url = `${BOT_CONFIGS.telegram.apiUrl}${BOT_CONFIGS.telegram.botToken}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: BOT_CONFIGS.telegram.adminChatId,
                text: `🔔 *${title}* 🔔\n\n${message}`,
                parse_mode: 'Markdown',
            }),
        });
        
        if (response.ok) {
            console.log('✅ Sent to Telegram');
            return true;
        }
        
        const error = await response.text();
        console.error('Telegram error:', error);
        return false;
        
    } catch (error) {
        console.error('Telegram error:', error);
        return false;
    }
}

// ============================================
// ارسال به واتساپ (WhatsApp Business API)
// ============================================
async function sendToWhatsApp(title: string, message: string): Promise<boolean> {
    if (!BOT_CONFIGS.whatsapp.enabled) return false;
    
    try {
        // واتساپ نیاز به فرمت خاصی دارد
        const whatsappMessage = `*${title}*\n\n${message}`;
        
        const url = `${BOT_CONFIGS.whatsapp.apiUrl}/${BOT_CONFIGS.whatsapp.phoneNumberId}/messages`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${BOT_CONFIGS.whatsapp.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                to: BOT_CONFIGS.whatsapp.adminNumber,
                type: 'text',
                text: { body: whatsappMessage },
            }),
        });
        
        if (response.ok) {
            console.log('✅ Sent to WhatsApp');
            return true;
        }
        
        const error = await response.text();
        console.error('WhatsApp error:', error);
        return false;
        
    } catch (error) {
        console.error('WhatsApp error:', error);
        return false;
    }
}