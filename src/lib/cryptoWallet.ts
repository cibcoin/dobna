// src/lib/cryptoWallet.ts
import { ethers } from 'ethers';

// ایجاد کیف پول اختصاصی برای دوبنا
export function createDobnaWallet() {
    // تولید یک کیف پول جدید با کلید خصوصی
    const wallet = ethers.Wallet.createRandom();
    
    return {
        address: wallet.address,        // آدرس عمومی برای دریافت USDT/SOL
        privateKey: wallet.privateKey,  // کلید خصوصی (فقط در سرور نگهداری شود!)
        mnemonic: wallet.mnemonic?.phrase
    };
}