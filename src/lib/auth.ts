// src/lib/auth.ts
import { supabase } from './supabase';

export async function sendOTP(phoneNumber: string): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase.auth.signInWithOtp({
            phone: phoneNumber,
        });
        
        if (error) throw error;
        
        return { success: true };
    } catch (error: any) {
        console.error('Send OTP error:', error);
        return { success: false, error: error.message };
    }
}

export async function verifyOTP(phoneNumber: string, code: string): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase.auth.verifyOtp({
            phone: phoneNumber,
            token: code,
            type: 'sms',
        });
        
        if (error) throw error;
        
        return { success: true };
    } catch (error: any) {
        console.error('Verify OTP error:', error);
        return { success: false, error: error.message };
    }
}