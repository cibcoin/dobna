// src/lib/zarinpal.ts
import { supabase } from './supabase';

// تنظیمات زرین‌پال
const ZARINPAL_CONFIG = {
    merchantId: process.env.EXPO_PUBLIC_ZARINPAL_MERCHANT_ID || 'your-merchant-id',
    sandbox: process.env.EXPO_PUBLIC_ZARINPAL_SANDBOX === 'true', // برای تست
    callbackUrl: process.env.EXPO_PUBLIC_ZARINPAL_CALLBACK_URL || 'https://yourdomain.com/payment/callback'
};

// نوع داده برای درخواست پرداخت
interface PaymentRequest {
    amount: number;  // به تومان
    description: string;
    email?: string;
    mobile?: string;
}

// نوع داده برای پاسخ پرداخت
interface PaymentResponse {
    success: boolean;
    authority?: string;
    paymentUrl?: string;
    error?: string;
}

/**
 * درخواست پرداخت از زرین‌پال
 * طبق مستندات زرین‌پال، درخواست به API ارسال می‌شود و Authority دریافت می‌شود [citation:4][citation:5]
 */
export async function requestPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
        const response = await fetch('https://api.zarinpal.com/pg/v4/payment/request.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                merchant_id: ZARINPAL_CONFIG.merchantId,
                amount: request.amount,
                description: request.description,
                callback_url: ZARINPAL_CONFIG.callbackUrl,
                metadata: {
                    email: request.email || '',
                    mobile: request.mobile || ''
                }
            })
        });

        const data = await response.json();
        
        if (data.data && data.data.code === 100) {
            // پرداخت موفق - هدایت به درگاه
            const paymentUrl = ZARINPAL_CONFIG.sandbox 
                ? `https://sandbox.zarinpal.com/pg/StartPay/${data.data.authority}`
                : `https://www.zarinpal.com/pg/StartPay/${data.data.authority}`;
            
            return {
                success: true,
                authority: data.data.authority,
                paymentUrl: paymentUrl
            };
        } else {
            return {
                success: false,
                error: data.errors?.message || 'خطا در اتصال به درگاه پرداخت'
            };
        }
    } catch (error) {
        console.error('Zarinpal request error:', error);
        return {
            success: false,
            error: 'خطا در ارتباط با درگاه پرداخت'
        };
    }
}

/**
 * تأیید پرداخت پس از بازگشت از درگاه
 * پس از بازگشت کاربر، Authority و Status از URL دریافت می‌شود [citation:4]
 */
export async function verifyPayment(authority: string, amount: number): Promise<{
    success: boolean;
    refId?: string;
    error?: string;
}> {
    try {
        const response = await fetch('https://api.zarinpal.com/pg/v4/payment/verify.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                merchant_id: ZARINPAL_CONFIG.merchantId,
                amount: amount,
                authority: authority
            })
        });

        const data = await response.json();
        
        // کد 100 به معنی پرداخت موفق است [citation:4]
        if (data.data && (data.data.code === 100 || data.data.code === 101)) {
            return {
                success: true,
                refId: data.data.ref_id?.toString()
            };
        } else {
            return {
                success: false,
                error: data.errors?.message || 'پرداخت ناموفق بود'
            };
        }
    } catch (error) {
        console.error('Zarinpal verify error:', error);
        return {
            success: false,
            error: 'خطا در تأیید پرداخت'
        };
    }
}