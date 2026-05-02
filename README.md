📁 ساختار کامل درختی پوشه assets (نسخه نهایی)

```bash
assets/
│
├── animations/                                    🎬 انیمیشن‌های Lottie (JSON)
│   ├── empty-wallet.json                          # انیمیشن کیف پول خالی
│   ├── loading_main.json                          # انیمیشن لودینگ اصلی
│   ├── network_error.json                         # خطای شبکه
│   ├── pulse_loader.json                          # لودینگ ضربان‌دار
│   ├── scanning_line.json                         # اسکن خطی
│   ├── security-scan.json                         # اسکن امنیتی
│   ├── success-check.json                         # تیک موفقیت
│   ├── success_burst.json                         # انفجار موفقیت
│   └── transaction-sending.json                   # ارسال تراکنش
│
├── fonts/                                         🔤 فونت‌های پروژه
│   ├── Vazirmatn-Regular.ttf                      # فونت فارسی معمولی
│   ├── Vazirmatn-Bold.ttf                         # فونت فارسی پررنگ
│   ├── Vazirmatn-ExtraBold.ttf                    # فونت فارسی فوق‌پررنگ
│   ├── Cairo-Regular.ttf                          # فونت انگلیسی معمولی
│   ├── Cairo-Bold.ttf                             # فونت انگلیسی پررنگ
│   ├── Orbitron-Regular.ttf                       # فونت اعداد معمولی
│   └── Orbitron-Bold.ttf                          # فونت اعداد پررنگ
│
├── images/                                        🖼️ تصاویر اصلی پروژه
│   ├── icon.png                                   # آیکون اصلی اپ (512x512)
│   ├── splash.png                                 # صفحه اسپلش (1242x2436)
│   ├── adaptive-icon.png                          # آیکون تطبیقی اندروید (512x512)
│   ├── favicon.png                                # آیکون مرورگر (32x32)
│   ├── logo.png                                   # لوگوی دوبنا (500x500)
│   │
│   ├── notes/                                     💵 تصاویر اسکناس‌ها (اتاق‌های بازی)
│   │   ├── 5000.png                               # تصویر اسکناس ۵,۰۰۰ تومانی
│   │   ├── 10000.png                              # تصویر اسکناس ۱۰,۰۰۰ تومانی
│   │   ├── 20000.png                              # تصویر اسکناس ۲۰,۰۰۰ تومانی
│   │   ├── 50000.png                              # تصویر اسکناس ۵۰,۰۰۰ تومانی
│   │   └── 100000.png                             # تصویر اسکناس ۱۰۰,۰۰۰ تومانی
│   │
│   ├── backgrounds/                               🌄 تصاویر پس‌زمینه
│   │   ├── background-neon.webp                   # پس‌زمینه نئونی
│   │   ├── onboarding.webp                        # صفحه خوش‌آمدگویی
│   │   └── dark-bg.png                            # پس‌زمینه تاریک
│   │
│   ├── avatars/                                   👤 آواتارهای پیش‌فرض سیستم
│   │   ├── default-avatar.png                     # آواتار پیش‌فرض (همیشه باید باشد)
│   │   ├── avatar-1.png                           # آواتار شماره ۱
│   │   ├── avatar-2.png                           # آواتار شماره ۲
│   │   ├── avatar-3.png                           # آواتار شماره ۳
│   │   ├── avatar-4.png                           # آواتار شماره ۴
│   │   ├── avatar-5.png                           # آواتار شماره ۵
│   │   ├── avatar-6.png                           # آواتار شماره ۶
│   │   ├── avatar-7.png                           # آواتار شماره ۷
│   │   ├── avatar-8.png                           # آواتار شماره ۸
│   │   ├── avatar-9.png                       # آواتار شماره ۹
│   │   ├── avatar-10.png                      # آواتار شماره ۱۰
│   │   ├── avatar-11.png                          
│   │   ├── avatar-12.png                           # آواتار شماره ۱۲
│   │   ├── avatar-13.png                           # آواتار شماره ۱۳
│   │   ├── avatar-14.png                           # آواتار شماره ۱۴
│   │   ├── avatar-15.png                           # آواتار شماره ۱۵
│   │   ├── avatar-16.png                           # آواتار شماره ۱۶
│   │   ├── avatar-17.png                           # آواتار شماره ۱۷
│   │   ├── avatar-18.png                           # آواتار شماره ۱۸
│   │   ├── avatar-19.png                           # آواتار شماره ۱۹
│   │   ├── avatar-guest.png                       # آواتار مهمان
│   │   ├── avatar-winner.png                      # آواتار ویژه برندگان
│   │   └── avatar-vip.png                         # آواتار ویژه کاربران VIP
│   │
│   ├── badges/                                    🏅 نشان‌های کاربران
│   │   ├── verified-badge.png                     # نشان کاربر تأیید شده
│   │   ├── winner-badge.png                       # نشان برنده
│   │   ├── vip-badge.png                          # نشان VIP
│   │   └── admin-badge.png                        # نشان مدیر
│   │
│   └── cards/                                     🃏 تصاویر کارت‌های بینگو
│       ├── card-back.png                          # پشت کارت
│       ├── card-frame.png                         # قاب کارت
│       └── card-glow.png                          # افکت درخشش کارت
│
├── icons/                                         🔣 آیکون‌های SVG
│   ├── ui/                                        # آیکون‌های رابط کاربری
│   │   ├── logo-dobna.svg                         # لوگوی دوبنا (SVG)
│   │   ├── back-arrow.svg                         # فلش بازگشت
│   │   ├── chat.svg                               # آیکون چت
│   │   ├── error-glow.svg                         # خطای درخشان
│   │   ├── home.svg                               # آیکون خانه
│   │   ├── lock.svg                               # آیکون قفل
│   │   ├── settings.svg                           # آیکون تنظیمات
│   │   ├── success.svg                            # آیکون موفقیت
│   │   ├── wallet.svg                             # آیکون کیف پول
│   │   ├── trophy.svg                             # آیکون جام قهرمانی
│   │   ├── users.svg                              # آیکون کاربران
│   │   ├── gift.svg                               # آیکون هدیه
│   │   ├── star.svg                               # آیکون ستاره
│   │   ├── heart.svg                              # آیکون قلب
│   │   ├── share.svg                              # آیکون اشتراک‌گذاری
│   │   ├── edit-icon.png                          # آیکون ویرایش (برای آواتار)
│   │   └── camera-icon.png                        # آیکون دوربین
│   │
│   ├── flags/                                     🏁 آیکون‌های پرچم (برای زبان)
│   │   ├── iran.svg                               # پرچم ایران (فارسی)
│   │   └── us.svg                                 # پرچم آمریکا (انگلیسی)
│   │
│   └── social/                                    📱 آیکون‌های شبکه‌های اجتماعی
│       ├── instagram.svg                          # اینستاگرام
│       ├── telegram.svg                           # تلگرام
│       ├── whatsapp.svg                           # واتساپ
│       └── eitaa.svg                              # ایتا
│
├── lottie/                                        🎬 انیمیشن‌های Lottie اضافی
│   ├── background_flow.json                       # جریان پس‌زمینه
│   ├── loading-chart.json                         # لودینگ نموداری
│   ├── loading.json                               # لودینگ ساده
│   ├── matrix_glitch.json                         # افکت ماتریس
│   ├── success-check.json                         # تیک موفقیت
│   ├── success-neon.json                          # موفقیت نئونی
│   ├── success.json                               # موفقیت ساده
│   ├── coin-flip.json                             # چرخیدن سکه
│   ├── cards-shuffle.json                         # بر هم زدن کارت‌ها
│   ├── winner-celebration.json                    # جشن برنده
│   └── confetti.json                              # کانفتی
│
└── sounds/                                        🔊 افکت‌های صوتی
    │
    ├── ui/                                        # صداهای رابط کاربری
    │   ├── click.mp3                              # کلیک ساده
    │   ├── dark-click.mp3                         # کلیک تاریک
    │   ├── digital_click.mp3                      # کلیک دیجیتال
    │   ├── light-tap.mp3                          # ضربه سبک
    │   ├── tap.mp3                                # ضربه
    │   └── unlock.mp3                             # باز کردن قفل
    │
    ├── game/                                      # صداهای بازی
    │   ├── number-called.mp3                      # اعلام عدد
    │   ├── line-win.mp3                           # برنده خطی
    │   ├── full-house.mp3                         # برنده پر
    │   ├── bingo.mp3                              # صدای بینگو
    │   ├── card-mark.mp3                          # علامت زدن روی کارت
    │   └── countdown.mp3                          # شمارش معکوس
    │
    ├── transaction/                               # صداهای تراکنش‌های مالی
    │   ├── tx_charge.mp3                          # شارژ تراکنش
    │   ├── tx_success.mp3                         # موفقیت تراکنش
    │   ├── tx_failed.mp3                          # خطای تراکنش
    │   ├── coin-drop.mp3                          # افتادن سکه
    │   └── cash-register.mp3                      # صندوق فروش
    │
    ├── notification/                              # صداهای نوتیفیکیشن
    │   ├── notification.mp3                       # نوتیفیکیشن معمولی
    │   ├── notify_beep.mp3                        # بوق نوتیفیکیشن
    │   ├── msg_send.mp3                           # ارسال پیام
    │   ├── msg_receive.mp3                        # دریافت پیام
    │   └── alarm_critical.mp3                     # هشدار بحرانی
    │
    ├── auth/                                      # صداهای احراز هویت
    │   ├── auth_pass.mp3                          # عبور از احراز هویت
    │   ├── login-success.mp3                      # ورود موفق
    │   └── login-failed.mp3                       # ورود ناموفق
    │
    ├── effects/                                   # افکت‌های صوتی ویژه
    │   ├── heartbeat_fast.mp3                     # ضربان قلب سریع
    │   ├── refresh_glitch.mp3                     # رفرش با افکت
    │   ├── scan_beep.mp3                          # بوق اسکن
    │   ├── success.mp3                            # موفقیت
    │   ├── matrix-glitch.mp3                      # افکت صوتی ماتریس
    │   └── sword_clash.wav                        # برخورد شمشیر
    │
    └── ambient/                                   # صداهای محیطی
        ├── casino-ambient.mp3                     # صدای محیط کازینو
        ├── game-start.mp3                         # شروع بازی
        ├── game-end.mp3                           # پایان بازی
        └── waiting-room.mp3                       # اتاق انتظار

bingo-game/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/
│   │   ├── index.tsx          # صفحه اصلی/لابی
│   │   ├── rooms.tsx          # لیست اتاق‌ها
│   │   ├── profile.tsx        # پروفایل کاربر
│   │   ├── chat.tsx           # چت عمومی
│   │   └── _layout.tsx
│   ├── game/
│   │   └── [roomId].tsx       # صفحه بازی
│   └── _layout.tsx
├── components/
│   ├── RoomCard.tsx
│   ├── ChatMessage.tsx
│   ├── BingoCard.tsx
│   └── BalanceCard.tsx
├── lib/
│   ├── supabase.ts            # کلاینت Supabase
│   ├── auth.ts                # توابع احراز هویت
│   └── gameLogic.ts           # منطق بازی
├── stores/
│   ├── authStore.ts
│   ├── gameStore.ts
│   └── chatStore.ts
├── constants/
│   └── colors.ts
├── package.json
├── app.json
├── tsconfig.json
└── .env                       # متغیرهای محیطی
```

---

```


