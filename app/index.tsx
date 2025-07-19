import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSequence, 
  withTiming,
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import { router } from 'expo-router';

export default function SplashScreen() {
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate logo
    logoScale.value = withTiming(1, { duration: 800 });
    logoOpacity.value = withTiming(1, { duration: 800 });
    
    // Animate tagline after logo
    taglineOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));

    // Navigate to tabs after animations
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  const taglineAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: taglineOpacity.value,
    };
  });

  return (
    <LinearGradient
      colors={['#7C3AED', '#3B82F6']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <View style={styles.content}>
        <Animated.Text style={[styles.logo, logoAnimatedStyle]}>
          Innoalaxy
        </Animated.Text>
        <Animated.Text style={[styles.tagline, taglineAnimatedStyle]}>
          Ultra-smart AI Tools. Ultra-fast Work.
        </Animated.Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 24,
  },
});