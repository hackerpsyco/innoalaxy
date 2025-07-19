import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Image, 
  FileText, 
  Headphones, 
  Video, 
  Code, 
  Zap,
  Brain,
  Palette
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const categories = [
  { id: 'Image', name: 'Image AI', icon: Image, color: '#F59E0B', count: 25 },
  { id: 'Text', name: 'Text AI', icon: FileText, color: '#10B981', count: 18 },
  { id: 'Audio', name: 'Audio AI', icon: Headphones, color: '#8B5CF6', count: 12 },
  { id: 'Video', name: 'Video AI', icon: Video, color: '#EF4444', count: 15 },
  { id: 'Code', name: 'Code AI', icon: Code, color: '#3B82F6', count: 22 },
  { id: 'Productivity', name: 'Productivity', icon: Zap, color: '#F97316', count: 20 },
  { id: 'Analytics', name: 'Analytics', icon: Brain, color: '#06B6D4', count: 8 },
  { id: 'Design', name: 'Design', icon: Palette, color: '#EC4899', count: 14 },
];

export default function CategoriesScreen() {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: '/(tabs)',
      params: { category: categoryId },
    });
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
          <Text style={styles.logo}>Categories</Text>
          <Text style={styles.tagline}>Explore AI tools by category</Text>
        </Animated.View>
      </LinearGradient>

      <Animated.View style={[
        styles.content, 
        { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Animated.View
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    {
                      transform: [{
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50 + (index * 10), 0],
                        })
                      }]
                    }
                  ]}>
                  <TouchableOpacity onPress={() => handleCategoryPress(category.id)}>
                    <View style={[styles.iconContainer, { backgroundColor: `${category.color}20` }]}>
                      <IconComponent size={28} color={category.color} />
                    </View>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryCount}>{category.count} tools</Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 3,
  },
  categoryCount: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});