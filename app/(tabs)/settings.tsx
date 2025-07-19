import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Bell, 
  Moon, 
  Info, 
  MessageSquare, 
  Star,
  ChevronRight,
  Mail,
  Shield
} from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { Linking } from 'react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSettingPress = (settingId: string) => {
    switch (settingId) {
      case 'profile':
        Alert.alert('Profile', 'Profile management coming soon!');
        break;
      case 'feedback':
        Alert.alert('Feedback', 'Thank you for your interest! Feedback system coming soon.');
        break;
      case 'rate':
        Alert.alert('Rate App', 'Thank you! App store rating coming soon.');
        break;
      case 'contact':
        Alert.alert('Contact Us', 'Email: support@innoalaxy.com\nWe\'d love to hear from you!');
        break;
      case 'about':
        Alert.alert(
          'About Innoalaxy',
          'Innoalaxy is your ultimate AI tools discovery platform. Find, explore, and master the best AI tools for ultra-fast productivity.\n\nVersion 1.0.0\nBuilt with ❤️ for AI enthusiasts'
        );
        break;
      case 'privacy':
        Alert.alert('Privacy Policy', 'Privacy policy and terms coming soon!');
        break;
      default:
        break;
    }
  };
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: 'profile', title: 'Profile', icon: User, action: 'navigate' },
        { id: 'notifications', title: 'Notifications', icon: Bell, action: 'toggle', value: notifications, onToggle: setNotifications },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { id: 'darkMode', title: 'Dark Mode', icon: Moon, action: 'toggle', value: darkMode, onToggle: setDarkMode },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'feedback', title: 'Send Feedback', icon: MessageSquare, action: 'navigate' },
        { id: 'rate', title: 'Rate App', icon: Star, action: 'navigate' },
        { id: 'contact', title: 'Contact Us', icon: Mail, action: 'navigate' },
      ],
    },
    {
      title: 'About',
      items: [
        { id: 'about', title: 'About Innoalaxy', icon: Info, action: 'navigate' },
        { id: 'privacy', title: 'Privacy Policy', icon: Shield, action: 'navigate' },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity 
        key={item.id} 
        style={styles.settingItem}
        onPress={() => item.action === 'navigate' ? handleSettingPress(item.id) : undefined}>
        <View style={styles.settingLeft}>
          <View style={styles.iconContainer}>
            <IconComponent size={18} color="#7C3AED" />
          </View>
          <Text style={styles.settingTitle}>{item.title}</Text>
        </View>
        <View style={styles.settingRight}>
          {item.action === 'toggle' ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#E2E8F0', true: '#7C3AED' }}
              thumbColor={item.value ? '#FFFFFF' : '#94A3B8'}
            />
          ) : (
            <ChevronRight size={18} color="#94A3B8" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Compact Header */}
      <LinearGradient
        colors={['#7C3AED', '#3B82F6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <Text style={styles.logo}>Settings</Text>
          <Text style={styles.tagline}>Customize your experience</Text>
        </Animated.View>
      </LinearGradient>

      <Animated.View style={[
        styles.contentWrapper,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {settingsSections.map((section, sectionIndex) => (
            <Animated.View 
              key={section.title} 
              style={[
                styles.section,
                {
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, 30 + (sectionIndex * 8)],
                    })
                  }]
                }
              ]}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionContent}>
                {section.items.map(renderSettingItem)}
              </View>
            </Animated.View>
          ))}

          <Animated.View style={[
            styles.appInfo,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, 60],
                })
              }]
            }
          ]}>
            <Text style={styles.appName}>Innoalaxy</Text>
            <Text style={styles.appVersion}>Version 1.0.0</Text>
            <Text style={styles.appTagline}>Ultra-smart AI Tools. Ultra-fast Work.</Text>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#E2E8F0',
    textAlign: 'center',
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748B',
    marginBottom: 10,
    marginLeft: 2,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
  },
  settingRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginBottom: 3,
  },
  appVersion: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 6,
  },
  appTagline: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});