import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Animated,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ExternalLink, Heart, Star, Check } from 'lucide-react-native';
import { aiToolsData } from '@/data/aiToolsData';
import { AITool } from '@/types/AITool';
import { addToFavorites, removeFromFavorites, isFavorite } from '@/utils/favorites';

export default function ToolDetailsScreen() {
  const { toolId } = useLocalSearchParams();
  const [tool, setTool] = useState<AITool | null>(null);
  const [isFav, setIsFav] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    if (toolId) {
      const foundTool = aiToolsData.find(t => t.id === parseInt(toolId as string));
      setTool(foundTool || null);
      
      if (foundTool) {
        checkFavoriteStatus(foundTool.id);
      }
    }

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
  }, [toolId]);

  const checkFavoriteStatus = async (id: number) => {
    const favStatus = await isFavorite(id);
    setIsFav(favStatus);
  };

  const toggleFavorite = async () => {
    if (!tool) return;

    if (isFav) {
      await removeFromFavorites(tool.id);
    } else {
      await addToFavorites(tool);
    }
    setIsFav(!isFav);
  };

  const openTool = () => {
    if (tool?.link) {
      Linking.openURL(tool.link);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          color={i <= rating ? '#F59E0B' : '#E5E7EB'}
          fill={i <= rating ? '#F59E0B' : 'transparent'}
        />
      );
    }
    return stars;
  };

  if (!tool) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Tool not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Compact Header */}
      <LinearGradient
        colors={['#7C3AED', '#3B82F6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Animated.View style={[styles.headerTop, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
            <Heart 
              size={20} 
              color={isFav ? '#EF4444' : '#FFFFFF'} 
              fill={isFav ? '#EF4444' : 'transparent'} 
            />
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View style={[
          styles.toolHero,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <Image source={{ uri: tool.logo }} style={styles.heroLogo} />
          <Text style={styles.heroTitle}>{tool.name}</Text>
          <View style={styles.heroRating}>
            {renderStars(tool.rating)}
            <Text style={styles.heroRatingText}>{tool.rating}</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <Animated.View style={[
        styles.contentWrapper,
        { opacity: fadeAnim }
      ]}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Quick Actions */}
          <Animated.View style={[
            styles.actionsContainer,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, 20],
                })
              }]
            }
          ]}>
            <TouchableOpacity style={styles.primaryButton} onPress={openTool}>
              <ExternalLink size={18} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Visit Tool</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Description */}
          <Animated.View style={[
            styles.section,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, 30],
                })
              }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{tool.description}</Text>
          </Animated.View>

          {/* Features */}
          <Animated.View style={[
            styles.section,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, 40],
                })
              }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresContainer}>
              {tool.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={14} color="#10B981" style={styles.featureIcon} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Tags */}
          <Animated.View style={[
            styles.section,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, 50],
                })
              }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {tool.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Category */}
          <Animated.View style={[
            styles.section,
            {
              transform: [{
                translateY: slideAnim.interpolate({
                  inputRange: [0, 30],
                  outputRange: [0, 60],
                })
              }]
            }
          ]}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{tool.category}</Text>
            </View>
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
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolHero: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heroLogo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
  },
  heroRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroRatingText: {
    fontSize: 14,
    color: '#E2E8F0',
    marginLeft: 6,
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  actionsContainer: {
    paddingVertical: 16,
  },
  primaryButton: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  featuresContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureIcon: {
    marginRight: 10,
  },
  featureText: {
    fontSize: 13,
    color: '#475569',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  tagText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  categoryText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 80,
  },
});