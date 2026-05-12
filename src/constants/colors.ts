// src/constants/colors.ts

export const colors = {
    // تم تاریک (Dark Mode)
    dark: {
        background: '#0f0c29',
        surface: '#1a1a2e',
        surfaceLight: '#24243e',
        card: '#16213e',
        border: '#2d3748',
        text: '#ffffff',
        textSecondary: '#a0aec0',
        textMuted: '#718096',
        primary: '#eab308',
        primaryDark: '#ca8a04',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        online: '#10b981',
        offline: '#6b7280',
    },
    
    // تم روشن (Light Mode)
    light: {
        background: '#f8fafc',
        surface: '#ffffff',
        surfaceLight: '#f1f5f9',
        card: '#ffffff',
        border: '#e2e8f0',
        text: '#1e293b',
        textSecondary: '#64748b',
        textMuted: '#94a3b8',
        primary: '#eab308',
        primaryDark: '#ca8a04',
        success: '#

// src/constants/colors.ts

export const colors = {
    // تم تاریک (پیش‌فرض)
    dark: {
        background: '#0a0a1a',
        surface: '#12122a',
        surfaceLight: '#1a1a35',
        card: '#16213e',
        cardBorder: '#1e293b',
        border: '#2d3748',
        text: '#ffffff',
        textSecondary: '#a0aec0',
        textMuted: '#64748b',
        primary: '#eab308',
        primaryDark: '#ca8a04',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        online: '#22c55e',
        offline: '#6b7280',
        shadow: 'rgba(0,0,0,0.3)',
    },
    
    // تم روشن (برای آینده)
    light: {
        background: '#f8fafc',
        surface: '#ffffff',
        surfaceLight: '#f1f5f9',
        card: '#ffffff',
        cardBorder: '#e2e8f0',
        border: '#e2e8f0',
        text: '#1e293b',
        textSecondary: '#64748b',
        textMuted: '#94a3b8',
        primary: '#eab308',
        primaryDark: '#ca8a04',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        online: '#22c55e',
        offline: '#94a3b8',
        shadow: 'rgba(0,0,0,0.1)',
    },
};

export type Theme = 'dark' | 'light';
export const DEFAULT_THEME: Theme = 'dark';