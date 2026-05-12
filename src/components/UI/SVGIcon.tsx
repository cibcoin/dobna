// src/components/UI/SVGIcon.tsx
import React from 'react';
import { SvgXml } from 'react-native-svg';

// ایمپورت فایل‌های SVG به صورت string
import LogoDobna from '../../../assets/icons/ui/logo-dobna.svg';
import BackArrow from '../../../assets/icons/ui/back-arrow.svg';
import ChatIcon from '../../../assets/icons/ui/chat.svg';
import ErrorGlow from '../../../assets/icons/ui/error-glow.svg';
import HomeIcon from '../../../assets/icons/ui/home.svg';
import LockIcon from '../../../assets/icons/ui/lock.svg';
import SettingsIcon from '../../../assets/icons/ui/settings.svg';
import SuccessIcon from '../../../assets/icons/ui/success.svg';

const icons = {
    logo: LogoDobna,
    backArrow: BackArrow,
    chat: ChatIcon,
    errorGlow: ErrorGlow,
    home: HomeIcon,
    lock: LockIcon,
    settings: SettingsIcon,
    success: SuccessIcon,
};

export type IconName = keyof typeof icons;

interface SVGIconProps {
    name: IconName;
    size?: number;
    color?: string;
    style?: object;
}

export default function SVGIcon({ name, size = 24, color, style }: SVGIconProps) {
    const IconComponent = icons[name];
    
    if (!IconComponent) return null;
    
    return (
        <IconComponent
            width={size}
            height={size}
            color={color}
            style={style}
        />
    );
}