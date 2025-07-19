import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Star, ExternalLink } from 'lucide-react-native';
import { router } from 'expo-router';
import { toolsApi } from '@/utils/api';
import { AITool } from '@/types/AITool';
import { aiToolsData } from '@/data/aiToolsData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tools, setTools] = useState<AITool[]>(aiToolsData);
  const [filteredTools, setFilteredTools] = useState<AITool[]>(aiToolsData);
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  const categories = ['All', 'Image', 'Text', 'Audio', 'Video', 'Code', 'Productivity'];

  useEffect(() => {
    loadTools();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const loadTools = async () => {
    setLoading(true);
    try {
      const response = await toolsApi.getAll();
      if (response.success && response.data) {
        setTools(response.data);
      } else {
        // Fallback to local data if API fails
        console.log('Using fallback data');
        setTools(aiToolsData);
      }
    } catch (error) {
      console.error('Error loading tools:', error);
      setTools(aiToolsData);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let filtered = tools;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTools(filtered);
  }, [searchQuery, selectedCategory, tools]);

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
          <Text style={styles.logo}>Innoalaxy</Text>
          <Text style={styles.tagline}>Ultra-smart AI Tools. Ultra-fast Work.</Text>
        </Animated.View>
      </LinearGradient>

      {/* Search Bar */}
      <Animated.View style={[styles.searchContainer, { 
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }]}>
        <Search size={18} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search AI tools..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Animated.View>

      {/* Compact Category Filters */}
      <Animated.View style={[styles.categoriesWrapper, { opacity: fadeAnim }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedCategoryChip,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Tools List */}
      <Animated.View style={[styles.toolsListWrapper, { opacity: fadeAnim }]}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7C3AED" />
            <Text style={styles.loadingText}>Loading AI tools...</Text>
          </View>
        )}
        <ScrollView style={styles.toolsList} showsVerticalScrollIndicator={false}>
          {filteredTools.map((tool, index) => (
            <Animated.View
              key={tool.id}
              style={[
                styles.toolCard,
                {
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 50],
                      outputRange: [0, 50 + (index * 10)],
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
                  <ExternalLink size={18} color="#7C3AED" />
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
    paddingBottom: 15,
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
    fontSize: 12,
    color: '#E2E8F0',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1E293B',
  },
  categoriesWrapper: {
    marginTop: 12,
  },
  categoriesContainer: {
    maxHeight: 40,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingRight: 32,
  },
  categoryChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    minHeight: 32,
    justifyContent: 'center',
  },
  selectedCategoryChip: {
    backgroundColor: '#7C3AED',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  toolsListWrapper: {
    flex: 1,
    marginTop: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#64748B',
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