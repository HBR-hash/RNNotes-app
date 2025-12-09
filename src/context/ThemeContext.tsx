// src/context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import { useColorScheme, Animated } from 'react-native';
import { CustomPaperLight, CustomPaperDark, CombinedDefaultTheme, CombinedDarkTheme } from '../styles/theme';
import { getThemeOverride, setThemeOverride } from '../utils/storage';

type ThemeOverride = 'dark' | 'light' | null;

interface ThemeContextValue {
  isDark: boolean;
  override: ThemeOverride;
  paperTheme: typeof CustomPaperLight;
  navTheme: typeof CombinedDefaultTheme;
  setManualOverride: (value: ThemeOverride) => Promise<void>;
  fadeAnim: Animated.Value;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState<ThemeOverride>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let mounted = true;
    (async () => {
      const v = await getThemeOverride();
      if (mounted) setOverride(v);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const isDark = override ? override === 'dark' : systemScheme === 'dark';

  // animate on theme change
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [isDark, fadeAnim]);

  const paperTheme = useMemo(() => (isDark ? CustomPaperDark : CustomPaperLight), [isDark]);
  const navTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const setManualOverride = async (value: ThemeOverride) => {
    setOverride(value);
    await setThemeOverride(value);
  };

  return (
    <ThemeContext.Provider value={{ isDark, override, paperTheme, navTheme, setManualOverride, fadeAnim }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used inside ThemeProvider');
  return ctx;
};


// src/context/ThemeContext.tsx
/*import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { Appearance, useColorScheme } from 'react-native';
import {
  CustomPaperLight,
  CustomPaperDark,
  CombinedDefaultTheme,
  CombinedDarkTheme,
} from '../styles/theme';
import { getThemeOverride, setThemeOverride } from '../utils/storage';

type ThemeOverride = 'dark' | 'light' | null;

interface ThemeContextValue {
  isDark: boolean;
  override: ThemeOverride;
  paperTheme: typeof CustomPaperLight;
  navTheme: typeof CombinedDefaultTheme;
  setManualOverride: (value: ThemeOverride) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme(); // "dark" | "light"
  const [override, setOverride] = useState<ThemeOverride>(null);

  // Load persisted theme override on app start
  useEffect(() => {
    let mounted = true;

    (async () => {
      const stored = await getThemeOverride();
      if (mounted) {
        setOverride(stored);
      }
    })();

    const listener = Appearance.addChangeListener(() => {
      // auto-refresh on system theme change
    });

    return () => {
      mounted = false;
      listener.remove();
    };
  }, []);

  // Determine active theme (system OR manual override)
  const isDark = override ? override === 'dark' : systemScheme === 'dark';

  // Pick Paper theme
  const paperTheme = useMemo(
    () => (isDark ? CustomPaperDark : CustomPaperLight),
    [isDark],
  );

  // Pick Navigation theme
  const navTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const setManualOverride = async (value: ThemeOverride) => {
    setOverride(value);
    await setThemeOverride(value);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        override,
        paperTheme,
        navTheme,
        setManualOverride,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used inside ThemeProvider');
  }
  return ctx;
};
*/