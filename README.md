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
│   ├── notes/fiat/USD/                                     🇺🇸 تصاویر اسکناس‌ها در تالارهای چهار سطحی و سطوح ۱ تا ۴ چالش و دوئل (تالارهای دلار)
│   │   ├── 0.05.png                               # تصویر اسکناس ۰.۰۵ دلاری، و سطح ۱ دوئل و چالش
│   │   ├── 0.25.png                              # تصویر اسکناس ۰.۲۵ دلاری، و سطح ۲ دوئل و چالش
│   │   ├── 0.50.png                              # تصویر اسکناس ۰.۵۰ دلاری، و سطح ۳ دوئل و چالش
│   │   └── 1.00.png                             # تصویر اسکناس ۱.۰۰ دلاری، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/fiat/EUR/                                     🏳️‍🌈 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای یورو)
│   │   ├── 0.025.png                               # تصویر اسکناس ۰.۲۵ یورویی، و سطح ۱ دوئل و چالش
│   │   ├── 0.10.png                              # تصویر اسکناس ۰.۱۰ یورویی، و سطح ۲ دوئل و چالش
│   │   ├── 0.25.png                              # تصویر اسکناس ۰.۲۵ یورویی، و سطح ۳ دوئل و چالش
│   │   └── 0.50.png                             # تصویر اسکناس ۰.۵ یورویی, سطح ۴ چالش و دوئل 
│   │
│   │
│   ├── notes/fiat/lRR/                                     🇮🇷 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای تومان)
│   │   ├── 5000.png                               # تصویر اسکناس ۵,۰۰۰ تومانی، و سطح ۱ دوئل و چالش
│   │   ├── 20000.png                              # تصویر اسکناس ۲۰,۰۰۰ تومانی، و سطح ۲ دوئل و چالش
│   │   ├── 50000.png                              # تصویر اسکناس ۵۰,۰۰۰ تومانی، و سطح ۳ دوئل و چالش
│   │   └── 100000.png                             # تصویر اسکناس ۱۰۰,۰۰۰ تومانی، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/fiat/TRY/                                     🇹🇷 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای لیر)
│   │   ├── 0.5.png                               # تصویر اسکناس ۰.۵ لیر، و سطح ۱ دوئل و چالش
│   │   ├── 2.png                              # تصویر اسکناس ۲ لیر، و سطح ۲ دوئل و چالش
│   │   ├── 5.png                              # تصویر اسکناس ۵ لیر، و سطح ۳ دوئل و چالش
│   │   └── 10.png                             # تصویر اسکناس ۱۰لیر، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/fiat/GBP/                                     🇦🇨 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای پوند)
│   │   ├── 0.02.png                               # تصویر اسکناس ۰.۰۲ پوندی، و سطح ۱ دوئل و چالش
│   │   ├── 0.10.png                              # تصویر اسکناس ۰.۱۰ پوندی، و سطح ۲ دوئل و چالش
│   │   ├── 0.25.png                              # تصویر اسکناس ۰.۲۵ پوندی، و سطح ۳ دوئل و چالش
│   │   └── 0.50.png                             # تصویر اسکناس ۰.۵۰ پوندی، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/fiat/AED/                                     🇦🇪 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای درهم)
│   │   ├── 0.2.png                               # تصویر اسکناس ۰.۲ درهمی، و سطح ۱ دوئل و چالش
│   │   ├── 1.png                              # تصویر اسکناس ۱ درهمی، و سطح ۲ دوئل و چالش
│   │   ├── 2.png                              # تصویر اسکناس ۲ درهمی، و سطح ۳ دوئل و چالش
│   │   └── 3.png                             # تصویر اسکناس ۳ درهمی، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/fiat/CNY/                                     🇨🇳 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای یوان)
│   │   ├── 0.5.png                               # تصویر اسکناس ۰.۵ یوان، و سطح ۱ دوئل و چالش
│   │   ├── 2.png                              # تصویر اسکناس ۲ یوان، و سطح ۲ دوئل و چالش
│   │   ├── 5.png                              # تصویر اسکناس ۵ یوان، و سطح ۳ دوئل و چالش
│   │   └── 10.png                             # تصویر اسکناس ۱۰ یوان، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/fiat/INR/                                     🇮🇳 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای روپیه)
│   │   ├── 5.png                               # تصویر اسکناس ۵,۰۰۰ روپیه، و سطح ۱ دوئل و چالش
│   │   ├── 20.png                              # تصویر اسکناس ۲۰,۰۰۰ روپیه، و سطح ۲ دوئل و چالش
│   │   ├── 50.png                              # تصویر اسکناس ۵۰,۰۰۰ روپیه، و سطح ۳ دوئل و چالش
│   │   └── 100.png                             # تصویر اسکناس ۱۰۰,۰۰۰ روپیه، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/fiat/CAD/                                     🇨🇦 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای دلار)
│   │   ├── 0.05.png                               # تصویر اسکناس ۰.۰۵ دلاری، و سطح ۱ دوئل و چالش
│   │   ├── 0.25.png                              # تصویر اسکناس ۰.۲۵ دلاری، و سطح ۲ دوئل و چالش
│   │   ├── 0.50.png                              # تصویر اسکناس ۰.۵۰ دلاری، و سطح ۳ دوئل و چالش
│   │   └── 1.00.png                             # تصویر اسکناس ۱.۰۰ دلاری، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/fiat/CHF/                                     🇨🇭 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای فرانک)
│   │   ├── 0.05.png                               # تصویر اسکناس ۵ سانتیم، و سطح ۱ دوئل و چالش
│   │   ├── 0.10.png                                                            # تصویر اسکناس ۲۵ سانتیم، و سطح ۲ دوئل و چالش
│   │   ├── 0.50.png                              # تصویر اسکناس ۵۰ سانتیم، و سطح ۳ دوئل و چالش
│   │   └── 1.00.png                             # تصویر اسکناس ۱.۰۰ فرانک، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/fiat/AUD/                                     🇦🇺 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای دلار)
│   │   ├── 0.05.png                               # تصویر اسکناس ۵ سنت، و سطح ۱ دوئل و چالش
│   │   ├── 0.25.png                              # تصویر اسکناس ۲۵ سنت، و سطح ۲ دوئل و چالش
│   │   ├── 0.50.png                              # تصویر اسکناس ۵۰ سنت، و سطح ۳ دوئل و چالش
│   │   └── 1.00.png                             # تصویر اسکناس ۱ دلار، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/crypto/BTC/                                     🪙 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای بیتکوین)
│   │   ├── 0.0000005.png                              # تصویر اسکناس ۰.۰۰۰۰۰۰۵ بیتکوین، و سطح ۱ دوئل و چالش
│   │   ├── 0.000002.png                              # تصویر اسکناس ۰.۰۰۰۰۰۲ بیتکوین، و سطح ۲ دوئل و چالش
│   │   ├── 0.000005.png                              # تصویر اسکناس ۰.۰۰۰۰۰۵ بیتکوین، و سطح ۳ دوئل و چالش
│   │   └── 0.00001.png                             # تصویر اسکناس ۰.۰۰۰۰۱ بیتکوین، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/crypto/ETH/                                     🪙 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای اتریوم)
│   │   ├── 0.00001.png                               # تصویر اسکناس ۰.۰۰۰۰۱ اتریوم، و سطح ۱ دوئل و چالش 
│   │   ├── 0.00005.png                              # تصویر اسکناس ۰.۰۰۰۰۵ اتریوم، و سطح ۲ دوئل و چالش
│   │   ├── 0.0001.png                              # تصویر اسکناس ۰.۰۰۰۱ اتریوم، و سطح ۳ دوئل و چالش
│   │   └── 0.0002.png                             # تصویر اسکناس ۰.۰۰۰۲ اتریوم، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/crypto/SOL/                                     🪙 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای سولانا)
│   │   ├── 0.001.png                               # تصویر اسکناس ۰.۰۰۱ سولانا، و سطح ۱ دوئل و چالش
│   │   ├── 0.005.png                              # تصویر اسکناس ۰.۰۰۵ سولانا، و سطح ۲ دوئل و چالش
│   │   ├── 0.01.png                              # تصویر اسکناس ۰.۰۱ سولانا، و سطح ۳ دوئل و چالش
│   │   └── 0.02.png                             # تصویر اسکناس ۰.۰۲ سولانا، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/crypto/USDT/                                     🪙 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای تتر)
│   │   ├── 0.05.png                               # تصویر اسکناس ۰.۰۵ تتر، و سطح ۱ دوئل و چالش
│   │   ├── 0.25.png                              # تصویر اسکناس ۰.۲۵ تتر، و سطح ۲ دوئل و چالش
│   │   ├── 0.50.png                              # تصویر اسکناس ۰.۵۰ تتر، و سطح ۳ دوئل و چالش
│   │   └── 1.00.png                             # تصویر اسکناس ۱.۰۰ تتر، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/crypto/BNB/                                     🪙 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای بایننس)
│   │   ├── 0.00004.png                               # تصویر اسکناس ۰.۰۰۰۰۴ بایننس، و سطح ۱ دوئل و چالش
│   │   ├── 0.00016.png                              # تصویر اسکناس ۰.۰۰۰۱۶ بایننس، و سطح ۲ دوئل و چالش
│   │   ├── 0.0004.png                              # تصویر اسکناس ۰.۰۰۰۴ بایننس، و سطح ۳ دوئل و چالش
│   │   └── 0.0008.png                             # تصویر اسکناس ۰.۰۰۰۸ بایننس، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/crypto/DOGE/                                     🪙 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای دوج)
│   │   ├── 0.25.png                               # تصویر اسکناس ۰.۲۵ دوج، و سطح ۱ دوئل و چالش
│   │   ├── 1.00.png                              # تصویر اسکناس ۱.۰۰ دوج، و سطح ۲ دوئل و چالش
│   │   ├── 2.50.png                              # تصویر اسکناس ۲.۵۰ دوج، و سطح ۳ دوئل و چالش
│   │   └── 5.00.png                             # تصویر اسکناس ۵.۰۰ دوج، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/crypto/TON/                                     🪙 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای تونکوین)
│   │   ├── 0.015.png                               # تصویر اسکناس ۰.۰۱۵ تونکوین، و سطح ۱ دوئل و چالش
│   │   ├── 0.060.png                              # تصویر اسکناس ۰.۶۰ تونکوین، و سطح ۲ دوئل و چالش
│   │   ├── 0.150.png                              # تصویر اسکناس ۰.۱۵۰ تونکوین، و سطح ۳ دوئل و چالش
│   │   └── 0.30.png                             # تصویر اسکناس ۰.۳۰ تونکوین، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/crypto/BONK/                                     🪙 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای بونک)
│   │   ├── 5.png                               # تصویر اسکناس ۵ بونکی، و سطح ۱ دوئل و چالش
│   │   ├── 20.png                              # تصویر اسکناس ۲۰ بونکی، و سطح ۲ دوئل و چالش
│   │   ├── 50.png                              # تصویر اسکناس ۵۰ بونکی، و سطح ۳ دوئل و چالش
│   │   └── 100.png                             # تصویر اسکناس ۱۰۰ بونکی، و سطح ۴ دوئل و چالش
│   │
│   │
│   ├── notes/crypto/PEPE/                                     🪙 تصاویر اسکناس‌ها در تالارهای پنج سطحی (تالارهای پپه)
│   │   ├── 1000.png                               # تصویر اسکناس ۱۰۰۰ پپه، و سطح ۱ دوئل و چالش
│   │   ├── 4000.png                              # تصویر اسکناس ۴۰۰۰ پپه، و سطح ۲ دوئل و چالش
│   │   ├── 10000.png                              # تصویر اسکناس ۱۰۰۰۰ پپه، و سطح ۳ دوئل و چالش
│   │   └── 20000.png                             # تصویر اسکناس ۲۰۰۰۰ پپه، و سطح ۴ دوئل و چالش
│   │
│   │
│   │
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
│   ├── flags/                                     🏁 آیکون‌های پرچم (برای معرفی گروه)
│   │   ├── IR.svg                               # پرچم ایران 
│   │   └── US.svg                                 # پرچم آمریکا
│   │   ├── CN.svg                               # پرچم چین 
│   │   └── CA.svg                                 # پرچم کانادا 
│   │   ├── IN.svg                               # پرچم هند 
│   │   └── CH.svg                                 # پرچم سوئیس 
│   │   ├── GB.svg                               # پرچم انگلستان 
│   │   └── AU.svg                                 # پرچم استرالیا 
│   ├── crypto/                                     🏁 آیکون‌های رمزارزها و (معرفی کامونیتی)
│   │   ├── bitcoin.svg                               # آیکون (بیتکوین)
│   │   └── ethereum.svg                                 # آیکون (اتریوم)
│   │   ├── usdt.svg                               # آیکون (تتر)
│   │   └── solana.svg                                 # آیکون (سولانا)
│   │   ├── toncoin.svg                               # آیکون (تون کوین)
│   │   └── soi.svg                                 # آیکون (سویی)
│   │   ├── bnb.svg                               # آیکون (بایننس کوین)
│   │   └── dogecoin.svg                                 # آیکون (دوجکوین)
│   │   ├── bonk.svg                               # آیکون (بونک)
│   │   └── pepe.svg                                 # آیکون (پپه)
│   │   ├── usdc.svg                               # آیکون (یو اس دی سی)
│   │   └── trump.svg                                 # آیکون (توکن ترامپ)   
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






components/
constants/
hooks/
lib/
services/
stores/
utils/
types/
styles/










dobna-game/
├── src/                          📁 تمام کدهای اصلی اینجاست
│   ├── app/                      📁 صفحات اصلی (با Expo Router)
│   │   ├── (auth)/               🔐 صفحات احراز هویت
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── _layout.tsx
│   │   ├── (tabs)/               📱 صفحات اصلی با تب
│   │   │   ├── index.tsx         # لابی اصلی
│   │   │   ├── rooms.tsx         # لیست اتاق‌ها
│   │   │   ├── profile.tsx       # پروفایل کاربر
│   │   │   ├── chat.tsx          # چت عمومی
│   │   │   └── _layout.tsx
│   │   ├── game/                 🎮 صفحه بازی
│   │   │   └── [roomId].tsx
│   │   └── _layout.tsx           # روت اصلی
│   │
│   ├── components/               🧩 کامپوننت‌های قابل استفاده مجدد
│   │   ├── BingoCard.tsx
│   │   ├── BingoCardWithBlink.tsx
│   │   ├── RoomCard.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── BalanceCard.tsx
│   │   ├── WinnerModal.tsx
│   │   ├── CountdownTimer.tsx
│   │   └── UI/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   ├── lib/                      📚 کتابخانه‌ها و سرویس‌های اصلی
│   │   ├── supabase.ts           # کلاینت Supabase
│   │   ├── auth.ts               # توابع احراز هویت
│   │   ├── gameLogic.ts          # منطق بازی (چک کردن برنده و...)
│   │   ├── voiceAnnouncer.ts     # سیستم صدای گوینده
│   │   ├── judgeClient.ts        # کلاینت داور
│   │   ├── standardCards.ts      # کارت‌های استاندارد (اعداد ثابت)
│   │   ├── cardDistribution.ts   # توزیع کارت بین بازیکنان
│   │   └── gameStarter.ts        # شروع بازی
│   │
│   ├── hooks/                    🪝 هوک‌های سفارشی React
│   │   ├── useAuth.ts
│   │   ├── useGame.ts
│   │   ├── useRealtime.ts
│   │   ├── useVoiceAnnouncer.ts
│   │   └── useSound.ts
│   │
│   ├── stores/                   📦 مدیریت state (Zustand)
│   │   ├── authStore.ts
│   │   ├── gameStore.ts
│   │   ├── chatStore.ts
│   │   └── roomStore.ts
│   │
│   ├── constants/               📌 ثابت‌های سراسری
│   │   ├── colors.ts
│   │   ├── roomTiers.ts         # سطوح اتاق‌ها (۵۰۰۰، ۱۰۰۰۰، ...)
│   │   ├── config.ts
│   │   └── images.ts             # مسیرهای تصاویر اسکناس
│   │
│   ├── utils/                   🔧 توابع کمکی
│   │   ├── formatters.ts        # فرمت کردن اعداد و تاریخ
│   │   ├── validators.ts        # توابع اعتبارسنجی
│   │   ├── helpers.ts
│   │   └── soundManager.ts      # مدیریت صداها
│   │
│   ├── types/                   📝 تعریف انواع TypeScript
│   │   ├── game.types.ts
│   │   ├── user.types.ts
│   │   ├── room.types.ts
│   │   └── api.types.ts
│   │
│   ├── services/               🌐 سرویس‌های ارتباط با API
│   │   ├── roomService.ts
│   │   ├── gameService.ts
│   │   ├── transactionService.ts
│   │   └── chatService.ts
│   │
│   ├── assets/                 🖼️ فایل‌های استاتیک
│   │   ├── images/
│   │   │   ├── notes/          # تصاویر اسکناس‌ها
│   │   │   │   ├── 5000.png
│   │   │   │   ├── 10000.png
│   │   │   │   ├── 20000.png
│   │   │   │   ├── 50000.png
│   │   │   │   └── 100000.png
│   │   │   ├── avatars/
│   │   │   └── icons/
│   │   ├── fonts/
│   │   └── sounds/             # فایل‌های صوتی (اختیاری)
│   │       ├── number_fa.mp3
│   │       └── winner.mp3
│   │
│   └── styles/                 🎨 استایل‌های سراسری
│       ├── global.css
│       └── tailwind.config.js
│
├── scripts/                    📜 اسکریپت‌های ابزار (داخل روت پروژه)
│   ├── setup-db.js             # اسکریپت راه‌اندازی دیتابیس
│   ├── seed-cards.js           # پر کردن کارت‌های استاندارد
│   └── deploy.sh
│
├── app.json                    # تنظیمات Expo
├── package.json
├── tsconfig.json
├── tailwind.config.js          # تنظیمات TailwindCSS
├── babel.config.js
├── .env                        # متغیرهای محیطی
├── .env.example
├── .gitignore
├── README.md
└── index.ts                    # نقطه ورود اصلی (فقط import از src)




src/
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
│   ├── DobnaCard.tsx
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




dobna/
├── src/                          📁 تمام کدهای اصلی اینجاست
│   ├── app/                      📁 صفحات اصلی (با Expo Router)
│   │   ├── (auth)/               🔐 صفحات احراز هویت
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── _layout.tsx
│   │   ├── (tabs)/               📱 صفحات اصلی با تب
│   │   │   ├── index.tsx         # لابی اصلی
│   │   │   ├── rooms.tsx         # لیست اتاق‌ها
│   │   │   ├── profile.tsx       # پروفایل کاربر
│   │   │   ├── chat.tsx          # چت عمومی
│   │   │   └── _layout.tsx
│   │   ├── game/                 🎮 صفحه بازی
│   │   │   └── [roomId].tsx
│   │   └── _layout.tsx           # روت اصلی
│   │
│   ├── components/               🧩 کامپوننت‌های قابل استفاده مجدد
│   │   ├── BingoCard.tsx
│   │   ├── BingoCardWithBlink.tsx
│   │   ├── RoomCard.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── BalanceCard.tsx
│   │   ├── WinnerModal.tsx
│   │   ├── CountdownTimer.tsx
│   │   └── UI/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   ├── lib/                      📚 کتابخانه‌ها و سرویس‌های اصلی
│   │   ├── supabase.ts           # کلاینت Supabase
│   │   ├── auth.ts               # توابع احراز هویت
│   │   ├── gameLogic.ts          # منطق بازی (چک کردن برنده و...)
│   │   ├── voiceAnnouncer.ts     # سیستم صدای گوینده
│   │   ├── judgeClient.ts        # کلاینت داور
│   │   ├── standardCards.ts      # کارت‌های استاندارد (اعداد ثابت)
│   │   ├── cardDistribution.ts   # توزیع کارت بین بازیکنان
│   │   └── gameStarter.ts        # شروع بازی
│   │
│   ├── hooks/                    🪝 هوک‌های سفارشی React
│   │   ├── useAuth.ts
│   │   ├── useGame.ts
│   │   ├── useRealtime.ts
│   │   ├── useVoiceAnnouncer.ts
│   │   └── useSound.ts
│   │
│   ├── stores/                   📦 مدیریت state (Zustand)
│   │   ├── authStore.ts
│   │   ├── gameStore.ts
│   │   ├── chatStore.ts
│   │   └── roomStore.ts
│   │
│   ├── constants/               📌 ثابت‌های سراسری
│   │   ├── colors.ts
│   │   ├── roomTiers.ts         # سطوح اتاق‌ها (۵۰۰۰، ۱۰۰۰۰، ...)
│   │   ├── config.ts
│   │   └── images.ts             # مسیرهای تصاویر اسکناس
│   │
│   ├── utils/                   🔧 توابع کمکی
│   │   ├── formatters.ts        # فرمت کردن اعداد و تاریخ
│   │   ├── validators.ts        # توابع اعتبارسنجی
│   │   ├── helpers.ts
│   │   └── soundManager.ts      # مدیریت صداها
│   │
│   ├── types/                   📝 تعریف انواع TypeScript
│   │   ├── game.types.ts
│   │   ├── user.types.ts
│   │   ├── room.types.ts
│   │   └── api.types.ts
│   │
│   ├── services/               🌐 سرویس‌های ارتباط با API
│   │   ├── roomService.ts
│   │   ├── gameService.ts
│   │   ├── transactionService.ts
│   │   └── chatService.ts
│   │
│   ├── assets/                 🖼️ فایل‌های استاتیک
│   │   ├── images/
│   │   │   ├── notes/          # تصاویر اسکناس‌ها
│   │   │   │   ├── 5000.png
│   │   │   │   ├── 10000.png
│   │   │   │   ├── 20000.png
│   │   │   │   ├── 50000.png
│   │   │   │   └── 100000.png
│   │   │   ├── avatars/
│   │   │   └── icons/
│   │   ├── fonts/
│   │   └── sounds/             # فایل‌های صوتی (اختیاری)
│   │       ├── number_fa.mp3
│   │       └── winner.mp3
│   │
│   └── styles/                 🎨 استایل‌های سراسری
│       ├── global.css
│       └── tailwind.config.js
│
├── scripts/                    📜 اسکریپت‌های ابزار (داخل روت پروژه)
│   ├── setup-db.js             # اسکریپت راه‌اندازی دیتابیس
│   ├── seed-cards.js           # پر کردن کارت‌های استاندارد
│   └── deploy.sh
│
├── app.json                    # تنظیمات Expo
├── package.json
├── tsconfig.json
├── tailwind.config.js          # تنظیمات TailwindCSS
├── babel.config.js
├── .env                        # متغیرهای محیطی
├── .env.example
├── .gitignore
├── README.md
└── index.ts                    # نقطه ورود اصلی (فقط import از src)





dobna/                    📁 روت پروژه
│
├── assets/                    📁 منابع استاتیک
├── src/                       📁 کدهای اصلی
│   └── app/                   📁 نقطه ورود اینجاست! (نه app.js در روت)
│       ├── _layout.tsx        🔧 لایه اصلی (رکورد)
│       ├── index.tsx          🏠 صفحه اصلی (لابی)
│       ├── (auth)/            🔐 گروه صفحات احراز هویت
│       │   ├── _layout.tsx
│       │   ├── login.tsx
│       │   └── register.tsx
│       ├── (tabs)/            📱 گروه صفحات با تب
│       │   ├── _layout.tsx
│       │   ├── index.tsx      # لابی
│       │   ├── rooms.tsx      # لیست اتاق‌ها
│       │   ├── profile.tsx    # پروفایل
│       │   └── chat.tsx       # چت عمومی
│       └── game/              🎮 صفحه بازی
│           └── [roomId].tsx   # صفحه پویا با پارامتر roomId
│
├── app.json                   📄 تنظیمات Expo (اجباری در روت)
├── package.json
├── tsconfig.json
└── .env





src/
│
├── app/                        📱 صفحات و روتینگ (Expo Router)
│   ├── (auth)/                 🔐 صفحات احراز هویت
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/                 📱 صفحات اصلی با تب
│   │   ├── index.tsx           # لابی
│   │   ├── rooms.tsx           # لیست اتاق‌ها
│   │   ├── profile.tsx         # پروفایل
│   │   ├── chat.tsx            # چت عمومی
│   │   ├── transfer.tsx        # انتقال اعتبار
│   │   └── _layout.tsx
│   ├── game/                   🎮 صفحه بازی
│   │   └── [roomId].tsx
│   └── _layout.tsx
│
├── components/                 🧩 کامپوننت‌های UI
│   ├── BingoCard.tsx
│   ├── BingoCardWithBlink.tsx
│   ├── RoomCard.tsx
│   ├── ChatMessage.tsx
│   ├── BalanceCard.tsx
│   ├── WinnerModal.tsx
│   ├── CountdownTimer.tsx
│   └── UI/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── LoadingSpinner.tsx
│
├── constants/                  📌 ثابت‌های سراسری
│   ├── colors.ts
│   ├── roomTiers.ts            # ۵۰۰۰، ۱۰۰۰۰، ۲۰۰۰۰، ۵۰۰۰۰، ۱۰۰۰۰۰
│   ├── config.ts
│   └── images.ts
│
├── hooks/                      🪝 هوک‌های سفارشی
│   ├── useAuth.ts
│   ├── useGame.ts
│   ├── useRealtime.ts
│   ├── useVoiceAnnouncer.ts
│   └── useSound.ts
│
├── lib/                        📚 کتابخانه‌ها و سرویس‌های اصلی
│   ├── supabase.ts
│   ├── auth.ts
│   ├── gameLogic.ts
│   ├── voiceAnnouncer.ts
│   ├── judgeClient.ts
│   ├── standardCards.ts        # ۳۰ کارت ثابت
│   ├── cardDistribution.ts
│   └── gameStarter.ts
│
├── services/                   🌐 سرویس‌های API و بک‌اند
│   ├── roomService.ts
│   ├── gameService.ts
│   ├── transactionService.ts   # واریز، برداشت، انتقال داخلی
│   ├── chatService.ts
│   └── zarinpalService.ts      # اتصال به زرین‌پال
│
├── stores/                     📦 مدیریت state (Zustand)
│   ├── authStore.ts
│   ├── gameStore.ts
│   ├── chatStore.ts
│   └── roomStore.ts
│
├── utils/                      🔧 توابع کمکی
│   ├── formatters.ts           # فرمت اعداد، تاریخ، قیمت
│   ├── validators.ts           # اعتبارسنجی ورودی‌ها
│   ├── helpers.ts
│   └── soundManager.ts
│
├── types/                      📝 تعاریف TypeScript
│   ├── game.types.ts
│   ├── user.types.ts
│   ├── room.types.ts
│   └── api.types.ts
│
├── styles/                     🎨 استایل‌های سراسری
│   ├── global.css
│   └── typography.ts
│
└── assets/                     🖼️ (این پوشه در روت است، نه داخل src)




src/
│
├── app/                        📱 صفحات و روتینگ
│   ├── (auth)/
│   ├── (tabs)/
│   ├── game/
│   └── _layout.tsx
│
├── components/                 🧩 کامپوننت‌های UI
│
├── constants/                  📌 ثابت‌های سراسری
│
├── hooks/                      🪝 هوک‌های سفارشی
│
├── i18n/                       🌍 بین‌المللی‌سازی (جدید)
│   ├── index.ts                # تنظیمات اصلی i18n
│   ├── locales/
│   │   ├── fa/                 # فارسی
│   │   │   ├── common.json
│   │   │   ├── game.json
│   │   │   ├── room.json
│   │   │   ├── transaction.json
│   │   │   └── errors.json
│   │   └── en/                 # انگلیسی
│   │       ├── common.json
│   │       ├── game.json
│   │       ├── room.json
│   │       ├── transaction.json
│   │       └── errors.json
│   └── hooks/
│       └── useTranslation.ts   # هوک سفارشی ترجمه
│
├── lib/                        📚 کتابخانه‌ها
│
├── services/                   🌐 سرویس‌ها
│
├── stores/                     📦 مدیریت state
│
├── utils/                      🔧 توابع کمکی
│
├── types/                      📝 تعاریف TypeScript
│
└── styles/                     🎨 استایل‌ها





src/i18n/
├── index.ts                          # تنظیمات اصلی i18n
├── locales/
│   ├── en/                           # انگلیسی
│   │   ├── common.json
│   │   ├── game.json
│   │   ├── lobby.json
│   │   ├── profile.json
│   │   ├── wallet.json
│   │   └── errors.json
│   ├── fa/                           # فارسی
│   │   ├── common.json
│   │   ├── game.json
│   │   ├── lobby.json
│   │   ├── profile.json
│   │   ├── wallet.json
│   │   └── errors.json
│   ├── ar/                           # عربی
│   │   ├── common.json
│   │   ├── game.json
│   │   ├── lobby.json
│   │   ├── profile.json
│   │   ├── wallet.json
│   │   └── errors.json
│   ├── tr/                           # ترکی │   │   ├── common.json
│   │   ├── game.json
│   │   ├── lobby.json
│   │   ├── profile.json
│   │   ├── wallet.json
│   │   └── errors.json
│   └── ru/                           # روسی
│   │   ├── common.json
│   │   ├── game.json
│   │   ├── lobby.json
│   │   ├── profile.json
│   │   ├── wallet.json
│   │   └── errors.json
└── hooks/
    └── useTranslation.ts

src/
├── components/
│   └── Chat/
│       ├── ChatDrawer.tsx          # صفحه کشویی چت
│       ├── ChatMessage.tsx         # کامپوننت هر پیام
│       ├── ChatInput.tsx           # ورودی پیام
│       └── ChatHeader.tsx          # هدر چت
├── hooks/
│   └── useChat.ts                  # هوک مدیریت چت
├── services/
│   └── chatService.ts              # سرویس چت
└── stores/
    └── chatStore.ts                # استیت چت


assets/
├── fonts/
│   ├── Vazirmatn-Regular.ttf      # فونت اصلی فارسی (وزیر متن)
│   ├── Vazirmatn-Bold.ttf
│   ├── Vazirmatn-ExtraBold.ttf
│   ├── Cairo-Regular.ttf           # فونت انگلیسی (ساده)
│   ├── Cairo-Bold.ttf
│   ├── Orbitron-Regular.ttf        # فونت اعداد (نمایش مبلغ‌ها)
│   └── Orbitron-Bold.ttf



src/
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx              # صفحه خوش‌آمدگویی
│   │   ├── phone-login.tsx        # صفحه ورود با شماره موبایل
│   │   ├── verify-otp.tsx         # صفحه تأیید کد
│   │   └── terms.tsx              # صفحه قوانین و حریم خصوصی
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx              # صفحه اصلی (اتاق‌ها)
│   │   ├── profile.tsx
│   │   └── chat.tsx
│   └── _layout.tsx
│
├── components/
│   ├── auth/
│   │   ├── CountryPicker.tsx      # انتخابگر کشور
│   │   └── LanguageSelector.tsx   # انتخابگر زبان
│   └── UI/
│       ├── Button.tsx
│       └── GradientBackground.tsx
│
├── lib/
│   └── auth.ts                    # توابع احراز هویت با OTP
│
└── constants/
    ├── countries.ts               # لیست کشورها
    └── languages.ts               # لیست زبان‌ها



src/
├── constants/
│   └── countries.ts          # لیست کشورها + ایموجی
├── utils/
│   └── flagEmoji.ts          # تبدیل کد کشور به ایموجی
└── components/auth/
    └── CountryPicker.tsx     # استفاده از ایموجی



src/
├── components/
│   ├── lobby/
│   │   ├── LobbyHeader.tsx          # هدر با آواتار و موجودی
│   │   ├── RoomCard.tsx             # کارت اتاق با تصویر اسکناس
│   │   ├── FloatingChatButton.tsx   # دکمه شناور چت
│   │   └── LobbyFooter.tsx          # فوتر با منوی پایین
│   ├── chat/
│   │   ├── ChatDrawer.tsx           # صفحه کشویی چت
│   │   └── ChatMessage.tsx
│   └── UI/
│       ├── Avatar.tsx
│       └── CustomText.tsx
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx                # صفحه اصلی لابی
│   │   ├── create-group.tsx         # صفحه ساخت گروه
│   │   ├── top-groups.tsx           # گروه‌های برتر
│   │   ├── transfer.tsx             # انتقال اعتبار
│   │   ├── deposit.tsx              # واریز و برداشت
│   │   └── settings.tsx             # تنظیمات منو
│   └── game/
│       └── [roomId].tsx             # صفحه بازی
└── stores/
    └── uiStore.ts                   # مدیریت UI (تم، چت، ...)


src/
├── components/
│   ├── lobby/
│   │   ├── LobbyHeader.tsx          # هدر با آواتار و موجودی
│   │   ├── RoomCard.tsx             # کارت اتاق با تصویر اسکناس
│   │   ├── FloatingChatButton.tsx   # دکمه شناور چت
│   │   └── LobbyFooter.tsx          # فوتر با منوی پایین
│   ├── chat/
│   │   ├── GlobalChatDrawer.tsx     # صفحه کشویی چت عمومی
│   │   └── ChatMessage.tsx
│   └── UI/
│       ├── Avatar.tsx
│       ├── CustomText.tsx
│       └── GradientBackground.tsx
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx                # صفحه اصلی لابی
│   │   ├── create-group.tsx         # صفحه ساخت گروه
│   │   ├── top-groups.tsx           # گروه‌های برتر
│   │   ├── transfer.tsx             # انتقال اعتبار
│   │   ├── deposit-withdraw.tsx     # واریز و برداشت
│   │   └── settings.tsx             # تنظیمات
│   └── game/
│       └── [roomId].tsx
└── stores/
    ├── uiStore.ts                   # مدیریت UI (تم، چت، ...)
    └── authStore.ts



src/
├── components/
│   └── drawer/
│       └── DrawerMenu.tsx          # کامپوننت اصلی منو
├── app/
│   └── (drawer)/
│       ├── _layout.tsx             # layout منو
│       └── index.tsx               # صفحه منو
├── stores/
│   └── themeStore.ts               # مدیریت تم (Dark/Light)
└── constants/
    └── colors.ts                   # رنگ‌های تم


src/app/(drawer)/
├── account.tsx                 # صفحه حساب کاربری
├── deposit-withdraw.tsx        # صفحه واریز و برداشت
├── transfer.tsx                # صفحه انتقال اعتبار
├── financial-reports.tsx       # صفحه گزارشات مالی
├── my-wins.tsx                 # صفحه لیست بردهای من
├── create-group.tsx            # صفحه ساخت گروه
├── top-groups.tsx              # صفحه گروه‌های برتر
├── support.tsx                 # صفحه پشتیبانی
├── faq.tsx                     # صفحه سوالات متداول
└── terms.tsx                   # صفحه قوانین و شرایط


src/
├── app/
│   ├── game/
│   │   └── [roomId].tsx           # صفحه بازی (داینامیک برای همه اتاق‌ها)
│   └── game-room/
│       └── select-cards.tsx       # صفحه انتخاب تعداد کارت
├── components/
│   ├── game/
│   │   ├── GameHeader.tsx         # هدر بازی (موجودی، جوایز، عدد فعلی، صدا)
│   │   ├── GameStats.tsx          # آمار بازی (برد خطی، برد پر)
│   │   ├── BingoCardGrid.tsx      # نمایش کارت‌ها (کارت‌های کاربر در بالا)
│   │   ├── CountdownTimer.tsx     # تایمر شمارش معکوس
│   │   ├── WinnerModal.tsx        # مودال برنده با انیمیشن
│   │   └── PlayerList.tsx         # لیست بازیکنان منتظر
│   └── UI/
│       ├── Stepper.tsx            # دکمه‌های + و - برای تعداد کارت
│       └── SoundButton.tsx        # دکمه بلندگو
└── lib/
    └── gameEngine.ts              # موتور بازی (اعداد تصادفی، تشخیص برنده)




src/
├── app/
│   ├── (admin)/                       # پنل مدیریت (مسیر جداگانه)
│   │   ├── _layout.tsx                # layout با احراز هویت ادمین
│   │   ├── index.tsx                  # داشبورد اصلی
│   │   ├── deposits.tsx               # لیست واریزها
│   │   ├── withdraws.tsx              # لیست برداشتها (نیاز به تأیید)
│   │   ├── winners.tsx                # لیست برندگان
│   │   ├── card-stats.tsx             # آمار کارت‌های برنده
│   │   ├── support.tsx                # تیکت‌های پشتیبانی
│   │   ├── users.tsx                  # مدیریت کاربران
│   │   ├── reports.tsx                # گزارشات مالی
│   │   └── settings.tsx               # تنظیمات سیستم
│   └── (auth)/
│   └── (tabs)/
│
├── lib/
│   └── adminAuth.ts                   # بررسی دسترسی ادمین
│
└── constants/
    └── adminEmails.ts                 # لیست ایمیل‌های مدیران



src/
├── app/(drawer)/
│   └── create-group.tsx          # صفحه ساخت گروه
├── components/
│   ├── group/
│   │   ├── GroupAvatarPicker.tsx # انتخاب آواتار گروه
│   │   └── GroupTypeSelector.tsx # انتخاب نوع گروه
│   └── UI/
│       ├── RadioButton.tsx       # دکمه رادیویی
│       └── Input.tsx             # فیلد ورودی




```


```


