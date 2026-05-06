// src/services/transactionService.ts
import { supabase } from '../lib/supabase';
import { requestPayment, verifyPayment } from '../lib/zarinpal';

// نوع تراکنش
type TransactionType = 
    | 'deposit' | 'withdraw' 
    | 'transfer_out' | 'transfer_in' 
    | 'game_entry' | 'game_win_line' | 'game_win_full' 
    | 'commission';

// نتیجه تراکنش
interface TransactionResult {
    success: boolean;
    transactionId?: string;
    balance?: number;
    error?: string;
    authority?: string;
    paymentUrl?: string;
}

// نتیجه انتقال داخلی
interface TransferResult {
    success: boolean;
    fromBalance?: number;
    toBalance?: number;
    error?: string;
}

/**
 * شارژ حساب کاربری از طریق زرین‌پال
 */
export async function depositToAccount(
    userId: string,
    amount: number,
    description: string = 'شارژ حساب'
): Promise<TransactionResult> {
    try {
        // دریافت اطلاعات کاربر
        const { data: user } = await supabase
            .from('profiles')
            .select('email, username')
            .eq('id', userId)
            .single();
        
        // درخواست پرداخت از زرین‌پال
        const payment = await requestPayment({
            amount: amount,
            description: description,
            email: user?.email,
            mobile: undefined
        });
        
        if (!payment.success) {
            return {
                success: false,
                error: payment.error
            };
        }
        
        // ذخیره تراکنش با وضعیت pending
        const { data: transaction, error: txError } = await supabase
            .from('transactions')
            .insert({
                user_id: userId,
                type: 'deposit',
                amount: amount,
                balance_after: 0, // موقتاً 0، بعداً آپدیت می‌شود
                status: 'pending',
                payment_authority: payment.authority,
                description: description
            })
            .select()
            .single();
        
        if (txError) throw txError;
        
        return {
            success: true,
            transactionId: transaction.id,
            authority: payment.authority,
            paymentUrl: payment.paymentUrl
        };
    } catch (error) {
        console.error('Deposit error:', error);
        return {
            success: false,
            error: 'خطا در ایجاد درخواست پرداخت'
        };
    }
}

/**
 * تأیید پرداخت پس از بازگشت از درگاه
 */
export async function confirmDeposit(
    userId: string,
    authority: string,
    amount: number
): Promise<TransactionResult> {
    try {
        // تأیید پرداخت با زرین‌پال
        const verification = await verifyPayment(authority, amount);
        
        if (!verification.success) {
            // به‌روزرسانی تراکنش به failed
            await supabase
                .from('transactions')
                .update({ status: 'failed' })
                .eq('payment_authority', authority);
            
            return {
                success: false,
                error: verification.error
            };
        }
        
        // دریافت موجودی فعلی کاربر
        const { data: profile } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', userId)
            .single();
        
        const newBalance = (profile?.balance || 0) + amount;
        
        // به‌روزرسانی تراکنش به completed
        const { data: transaction, error: txError } = await supabase
            .from('transactions')
            .update({
                status: 'completed',
                balance_after: newBalance,
                payment_ref_id: verification.refId,
                completed_at: new Date().toISOString()
            })
            .eq('payment_authority', authority)
            .select()
            .single();
        
        if (txError) throw txError;
        
        // به‌روزرسانی موجودی کاربر
        await supabase
            .from('profiles')
            .update({ balance: newBalance })
            .eq('id', userId);
        
        return {
            success: true,
            transactionId: transaction.id,
            balance: newBalance
        };
    } catch (error) {
        console.error('Confirm deposit error:', error);
        return {
            success: false,
            error: 'خطا در تأیید پرداخت'
        };
    }
}

/**
 * انتقال اعتبار داخلی بین دو کاربر
 * هر کاربر می‌تواند از 10,000 تا 1,000,000 تومان در هر انتقال منتقل کند
 * سقف روزانه هر کاربر 10,000,000 تومان است
 */
export async function internalTransfer(
    fromUserId: string,
    toUserId: string,
    amount: number,
    description: string = 'انتقال اعتبار'
): Promise<TransferResult> {
    try {
        // بررسی اتصال به خودش
        if (fromUserId === toUserId) {
            return {
                success: false,
                error: 'امکان انتقال اعتبار به خودتان وجود ندارد'
            };
        }
        
        // بررسی حداقل و حداکثر مبلغ
        const { data: settings } = await supabase
            .from('system_settings')
            .select('value')
            .eq('key', 'transfer_limits')
            .single();
        
        const minAmount = settings?.value?.min_amount || 10000;
        const maxAmount = settings?.value?.max_amount || 1000000;
        
        if (amount < minAmount) {
            return {
                success: false,
                error: `حداقل مبلغ انتقال ${minAmount.toLocaleString()} تومان است`
            };
        }
        
        if (amount > maxAmount) {
            return {
                success: false,
                error: `حداکثر مبلغ انتقال ${maxAmount.toLocaleString()} تومان است`
            };
        }
        
        // بررسی سقف روزانه
        const { data: limitCheck } = await supabase.rpc('check_transfer_limits', {
            p_user_id: fromUserId,
            p_amount: amount
        });
        
        if (!limitCheck?.allowed) {
            if (limitCheck?.reason === 'daily_limit_exceeded') {
                return {
                    success: false,
                    error: `سقف روزانه شما ${limitCheck.remaining?.toLocaleString()} تومان باقی مانده است`
                };
            }
            return {
                success: false,
                error: 'مبلغ انتقال نامعتبر است'
            };
        }
        
        // شروع تراکنش دیتابیس (با استفاده از RPC)
        const { data: result, error } = await supabase.rpc('process_internal_transfer', {
            p_from_user_id: fromUserId,
            p_to_user_id: toUserId,
            p_amount: amount,
            p_description: description
        });
        
        if (error) throw error;
        
        if (!result?.success) {
            return {
                success: false,
                error: result?.error || 'خطا در انجام انتقال'
            };
        }
        
        return {
            success: true,
            fromBalance: result.from_balance,
            toBalance: result.to_balance
        };
    } catch (error) {
        console.error('Internal transfer error:', error);
        return {
            success: false,
            error: 'خطا در انجام انتقال'
        };
    }
}

/**
 * دریافت تاریخچه تراکنش‌های کاربر
 */
export async function getTransactionHistory(
    userId: string,
    limit: number = 50,
    offset: number = 0
) {
    const { data, error } = await supabase
        .from('transactions')
        .select(`
            *,
            from_user:from_user_id (username),
            to_user:to_user_id (username)
        `)
        .or(`user_id.eq.${userId},from_user_id.eq.${userId},to_user_id.eq.${userId}`)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);
    
    if (error) throw error;
    
    return data;
}

/**
 * درخواست برداشت وجه
 */
export async function requestWithdraw(
    userId: string,
    amount: number,
    bankName: string,
    cardNumber: string,
    accountHolder: string,
    iban?: string
): Promise<TransactionResult> {
    try {
        // بررسی موجودی کاربر
        const { data: profile } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', userId)
            .single();
        
        if ((profile?.balance || 0) < amount) {
            return {
                success: false,
                error: 'موجودی کافی نیست'
            };
        }
        
        // ایجاد درخواست برداشت
        const { data: withdraw, error: wdError } = await supabase
            .from('withdraw_requests')
            .insert({
                user_id: userId,
                amount: amount,
                bank_name: bankName,
                card_number: cardNumber,
                account_holder: accountHolder,
                iban: iban,
                status: 'pending'
            })
            .select()
            .single();
        
        if (wdError) throw wdError;
        
        // ایجاد تراکنش با وضعیت pending
        const { data: transaction, error: txError } = await supabase
            .from('transactions')
            .insert({
                user_id: userId,
                type: 'withdraw',
                amount: amount,
                balance_after: profile?.balance || 0,
                status: 'pending',
                reference_id: withdraw.id,
                description: `درخواست برداشت به کارت ${cardNumber.slice(-4)}`
            })
            .select()
            .single();
        
        if (txError) throw txError;
        
        return {
            success: true,
            transactionId: transaction.id
        };
    } catch (error) {
        console.error('Withdraw request error:', error);
        return {
            success: false,
            error: 'خطا در ثبت درخواست برداشت'
        };
    }
}

/**
 * دریافت محدودیت‌های انتقال کاربر
 */
export async function getUserTransferLimits(userId: string) {
    const { data: settings } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'transfer_limits')
        .single();
    
    const { data: daily } = await supabase
        .from('daily_transfer_limits')
        .select('transferred_today')
        .eq('user_id', userId)
        .maybeSingle();
    
    const limits = settings?.value || {};
    const transferredToday = daily?.transferred_today || 0;
    const dailyLimit = limits.daily_limit || 10000000;
    
    return {
        minAmount: limits.min_amount || 10000,
        maxAmount: limits.max_amount || 1000000,
        dailyLimit: dailyLimit,
        transferredToday: transferredToday,
        remainingToday: dailyLimit - transferredToday
    };
}