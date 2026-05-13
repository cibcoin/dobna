// src/lib/config.ts
export const config = {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL!,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
    appName: process.env.EXPO_PUBLIC_APP_NAME!,
    zarinaplMerchantId: process.env.EXPO_PUBLIC_ZARINPAL_MERCHANT_ID!,
};