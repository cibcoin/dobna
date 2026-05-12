// src/lib/soundManager.ts
import { Audio } from 'expo-av';

// ایمپورت فایل‌های صوتی
const sounds = {
    click: require('../../assets/sounds/click.mp3'),
    authPass: require('../../assets/sounds/auth_pass.mp3'),
    alarmCritical: require('../../assets/sounds/alarm_critical.mp3'),
    darkClick: require('../../assets/sounds/dark-click.mp3'),
    digitalClick: require('../../assets/sounds/digital_click.mp3'),
    heartbeatFast: require('../../assets/sounds/heartbeat_fast.mp3'),
    lightTap: require('../../assets/sounds/light-tap.mp3'),
    msgSend: require('../../assets/sounds/msg_send.mp3'),
    notification: require('../../assets/sounds/notification.mp3'),
    notifyBeep: require('../../assets/sounds/notify_beep.mp3'),
    refreshGlitch: require('../../assets/sounds/refresh_glitch.mp3'),
    scanBeep: require('../../assets/sounds/scan_beep.mp3'),
    success: require('../../assets/sounds/success.mp3'),
    tap: require('../../assets/sounds/tap.mp3'),
    txCharge: require('../../assets/sounds/tx_charge.mp3'),
    txSuccess: require('../../assets/sounds/tx_success.mp3'),
    unlock: require('../../assets/sounds/unlock.mp3'),
    txFailed: require('../../assets/sounds/tx_failed.mp3'),
    matrixGlitch: require('../../assets/sounds/matrix-glitch.mp3'),
    swordClash: require('../../assets/sounds/sword_clash.wav'),
};

export type SoundKey = keyof typeof sounds;

class SoundManager {
    private sounds: Map<string, Audio.Sound> = new Map();
    private isMuted: boolean = false;
    private volume: number = 0.7;

    async init() {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        });

        // بارگذاری صداها
        for (const [key, soundFile] of Object.entries(sounds)) {
            try {
                const { sound } = await Audio.Sound.createAsync(soundFile);
                this.sounds.set(key, sound);
            } catch (error) {
                console.error(`Error loading sound ${key}:`, error);
            }
        }
    }

    async play(key: SoundKey) {
        if (this.isMuted) return;
        
        const sound = this.sounds.get(key);
        if (sound) {
            await sound.setVolumeAsync(this.volume);
            await sound.replayAsync();
        }
    }

    async setMuted(muted: boolean) {
        this.isMuted = muted;
    }

    async setVolume(volume: number) {
        this.volume = Math.max(0, Math.min(1, volume));
        for (const sound of this.sounds.values()) {
            await sound.setVolumeAsync(this.volume);
        }
    }

    async unloadAll() {
        for (const sound of this.sounds.values()) {
            await sound.unloadAsync();
        }
        this.sounds.clear();
    }
}

export const soundManager = new SoundManager();