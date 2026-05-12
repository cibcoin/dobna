// src/components/UI/CustomText.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { getFontFamily, typography } from '../../styles/fonts';
import { useLanguageStore } from '../../stores/languageStore';

interface CustomTextProps extends TextProps {
  variant?: 
    | 'h1' | 'h2' | 'h3' 
    | 'body' | 'bodyBold' 
    | 'number' | 'numberBold'
    | 'english' | 'englishBold';
  isNumber?: boolean;  // برای نمایش اعداد (مثل مبلغ)
  children: React.ReactNode;
}

export default function CustomText({ 
  variant = 'body', 
  isNumber = false,
  style, 
  children, 
  ...props 
}: CustomTextProps) {
  const { isRTL } = useLanguageStore();
  
  // تعیین فونت بر اساس نوع متن
  let fontFamily = '';
  let fontSize = 14;
  
  switch (variant) {
    case 'h1':
      fontFamily = getFontFamily(isRTL, true, false);
      fontSize = 24;
      break;
    case 'h2':
      fontFamily = getFontFamily(isRTL, true, false);
      fontSize = 20;
      break;
    case 'h3':
      fontFamily = getFontFamily(isRTL, true, false);
      fontSize = 18;
      break;
    case 'bodyBold':
      fontFamily = getFontFamily(isRTL, true, isNumber);
      fontSize = 14;
      break;
    case 'number':
      fontFamily = getFontFamily(false, false, true);
      fontSize = 16;
      break;
    case 'numberBold':
      fontFamily = getFontFamily(false, true, true);
      fontSize = 18;
      break;
    case 'english':
      fontFamily = getFontFamily(false, false, false);
      fontSize = 14;
      break;
    case 'englishBold':
      fontFamily = getFontFamily(false, true, false);
      fontSize = 14;
      break;
    default:
      fontFamily = getFontFamily(isRTL, false, isNumber);
      fontSize = 14;
  }
  
  return (
    <Text
      style={[
        { fontFamily, fontSize, includeFontPadding: false },
        isRTL && { textAlign: 'right' },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}