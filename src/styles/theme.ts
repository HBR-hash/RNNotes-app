// src/styles/theme.ts
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { DefaultTheme as NavDefault, DarkTheme as NavDark } from '@react-navigation/native';

const BRAND = {
  primary: '#1565C0',
  accent: '#03dac4',
};

export const CustomPaperLight = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: BRAND.primary,
    secondary: BRAND.accent,
  },
};

export const CustomPaperDark = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: BRAND.primary,
    secondary: BRAND.accent,
  },
};

export const CombinedDefaultTheme = {
  ...NavDefault,
  colors: {
    ...NavDefault.colors,
    primary: BRAND.primary,
    background: '#ffffff',
    card: '#f8fafc',
    text: '#0f172a',
  },
};

export const CombinedDarkTheme = {
  ...NavDark,
  colors: {
    ...NavDark.colors,
    primary: BRAND.primary,
    background: '#0b1220',
    card: '#071228',
    text: '#e6eef8',
  },
};

export default {
  BRAND,
  CombinedDefaultTheme,
  CombinedDarkTheme,
  CustomPaperLight,
  CustomPaperDark,
};

// src/styles/theme.ts
/*import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import {
  DefaultTheme as NavDefault,
  DarkTheme as NavDark,
} from '@react-navigation/native';

const BRAND = {
  primary: '#1565C0',
  accent: '#03dac4',
};

// 🌕 Paper Light Theme (MD3)
export const CustomPaperLight = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: BRAND.primary,
  },
};

// 🌑 Paper Dark Theme (MD3)
export const CustomPaperDark = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: BRAND.primary,
  },
};

// 🌕 Navigation Light Theme
export const CombinedDefaultTheme = {
  ...NavDefault,
  colors: {
    ...NavDefault.colors,
    primary: BRAND.primary,
    background: '#ffffff',
    card: '#f8fafc',
    text: '#0f172a',
  },
};

// 🌑 Navigation Dark Theme
export const CombinedDarkTheme = {
  ...NavDark,
  colors: {
    ...NavDark.colors,
    primary: BRAND.primary,
    background: '#0b1220',
    card: '#071228',
    text: '#e6eef8',
  },
};

export default {
  BRAND,
  CombinedDefaultTheme,
  CombinedDarkTheme,
  CustomPaperLight,
  CustomPaperDark,
};
*/