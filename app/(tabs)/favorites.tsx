import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Star, Trash2 } from 'lucide-react-native';
import { router } from 'expo-router';
import { AITool } from '@/types/AITool';
import { getFavorites, removeFavorite } from '@/utils/favorites';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<AITool[]>([]);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  useEffect(() => {
    loadFavorites();
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

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const handleRemoveFavorite = async (toolId: number) => {
    await removeFavorite(toolId);
    loadFavorites();
  };

  const handleToolPress = (tool: AITool) => {
    router.push({
      pathname: '/tool-details',
      params: { toolId: tool.id.toString() },
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={12}
          color={i <= rating ? '#F59E0B' : '#E5E7EB'}
          fill={i <= rating ? '#F59E0B' : 'transparent'}
        />
      );
    }
    return stars;
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
          <Text style={styles.logo}>Favorites</Text>
          <Text style={styles.tagline}>Your saved AI tools</Text>
        </Animated.View>
      </LinearGradient>

      {favorites.length === 0 ? (
        <Animated.View style={[
          styles.emptyState,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}>
          <Heart size={56} color="#E2E8F0" />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyMessage}>
            Start exploring AI tools and add them to your favorites!
          </Text>
        </Animated.View>
      ) : (
        <Animated.View style={[
          styles.toolsListWrapper,
          { opacity: fadeAnim }
        ]}>
          <ScrollView style={styles.toolsList} showsVerticalScrollIndicator={false}>
            {favorites.map((tool, index) => (
              <Animated.View
                key={tool.id}
                style={[
                  styles.toolCard,
                  {
                    transform: [{
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 30],
                        outputRange: [0, 30 + (index * 8)],
                      })
                    }]
                  }
                ]}>
                <TouchableOpacity onPress={() => handleToolPress(tool)}>
                  <View style={styles.toolHeader}>
                    <Image source={{ uri: tool.logo }} style={styles.toolLogo} />
                    <View style={styles.toolInfo}>
                      <Text style={styles.toolName} numberOfLines={1}>{tool.name}</Text>
                      <View style={styles.ratingContainer}>
                        {renderStars(tool.rating)}
                        <Text style={styles.ratingText}>{tool.rating}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveFavorite(tool.id)}>
                      <Trash2 size={18} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.toolDescription} numberOfLines={2}>
                    {tool.description}
                  </Text>
                  <View style={styles.tagsContainer}>
                    {tool.tags.slice(0, 3).map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>
      )}
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  toolsListWrapper: {
    flex: 1,
    paddingTop: 16,
  },
  toolsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  toolCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  toolLogo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  toolInfo: {
    flex: 1,
  },
  toolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 5,
  },
  removeButton: {
    padding: 6,
  },
  toolDescription: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    marginRight: 6,
    marginBottom: 3,
  },
  tagText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
});