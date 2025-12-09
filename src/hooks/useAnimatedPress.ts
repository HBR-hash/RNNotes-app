// src/hooks/useAnimatedPress.ts
import { useRef } from 'react';
import { Animated, PressableProps } from 'react-native';

export default function useAnimatedPress(onPress?: () => void) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 6,
      tension: 100,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
      tension: 40,
    }).start();
  };

  const handlePress = () => {
    animateOut();
    if (typeof onPress === 'function') onPress();
  };

  return {
    animatedStyle: { transform: [{ scale }] as any },
    pressHandlers: {
      onPressIn: animateIn,
      onPressOut: animateOut,
      onPress: handlePress,
    } as PressableProps,
  };
}
