// supabase/functions/crypto-payment/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// تنظیمات Cobo API (جایگزین با اطلاعات واقعی)
const COBO_API_KEY = Deno.env.get('COBO_API_KEY') || '';
const COBO_API_SECRET = Deno.env.get('COBO_API_SECRET') || '';
const COBO_API_URL = 'https://api.cobo.com/v1';

// دریافت نرخ لحظه‌ای از منابع معتبر
async function getExchangeRate(currency: 'USDT' | 'SOL'): Promise<number> {
    // از API منابع معتبر مثل CoinGecko یا Binance
    // مثال: دریافت نرخ USDT به تومان
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currency === 'USDT' ? 'tether' : 'solana'}&vs_currencies=usd`);
    const data = await response.json();
    const usdRate = currency === 'USDT' ? data.tether?.usd : data.solana?.usd;
    
    // دریافت نرخ تومان به دلار (از منبع معتبر)
    const tomanRate = await getTomanToUsdRate();
    
    return usdRate * tomanRate;
}

// ایجاد آدرس واریز یکتا برای کاربر
async function createDepositAddress(userId: string, currency: string): Promise<string> {
    const response = await fetch(`${COBO_API_URL}/wallets/deposit_addresses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${COBO_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            currency: currency,
            chain: currency === 'USDT' ? 'TRC20' : 'Solana',
        }),
    });
    
    const data = await response.json();
    return data.address;
}

// Webhook برای دریافت تأیید واریز (به صورت خودکار توسط Cobo فراخوانی می‌شود)
serve(async (req) => {
    const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    const { type, data } = await req.json();
    
    if (type === 'deposit_confirmed') {
        const { user_id, currency, amount, transaction_hash } = data;
        
        // 1. دریافت نرخ لحظه‌ای
        const rate = await getExchangeRate(currency);
        const spread = await getSpread(); // 1%
        const effectiveRate = rate * (1 - spread / 100);
        const amountToman = amount * effectiveRate;
        
        // 2. افزایش موجودی کاربر
        const { data: userAccount } = await supabase
            .from('user_accounts')
            .select('balance')
            .eq('user_id', user_id)
            .single();
        
        const newBalance = (userAccount?.balance || 0) + amountToman;
        
        await supabase
            .from('user_accounts')
            .update({ balance: newBalance })
            .eq('user_id', user_id);
        
        // 3. ثبت تراکنش
        await supabase
            .from('transactions')
            .insert({
                user_id: user_id,
                type: 'deposit',
                amount: amountToman,
                crypto_currency: currency,
                crypto_amount: amount,
                exchange_rate: effectiveRate,
                balance_before: userAccount?.balance || 0,
                balance_after: newBalance,
                status: 'completed',
                reference_id: transaction_hash,
            });
        
        // 4. بروزرسانی درخواست واریز
        await supabase
            .from('crypto_deposit_requests')
            .update({
                amount_crypto: amount,
                amount_toman: amountToman,
                exchange_rate: effectiveRate,
                transaction_hash: transaction_hash,
                status: 'completed',
                completed_at: new Date().toISOString(),
            })
            .eq('user_id', user_id)
            .eq('currency', currency);
        
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    
    return new Response(JSON.stringify({ error: 'Unknown event' }), { status: 400 });
});