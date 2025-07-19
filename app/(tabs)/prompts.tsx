import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Copy, Zap, TrendingUp } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { promptsApi } from '@/utils/api';
import { AIPrompt } from '@/types/AIPrompt';
import { aiPromptsData } from '@/data/aiPromptsData';

export default function PromptsScreen() {
  const [prompts, setPrompts] = useState<AIPrompt[]>(aiPromptsData);
  const [selectedTool, setSelectedTool] = useState('All');
  const [filteredPrompts, setFilteredPrompts] = useState<AIPrompt[]>(aiPromptsData);
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

  const tools = ['All', 'ChatGPT', 'Midjourney', 'Claude'];

  useEffect(() => {
    loadPrompts();
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

  const loadPrompts = async () => {
    setLoading(true);
    try {
      const response = await promptsApi.getDaily();
      if (response.success && response.data) {
        setPrompts(response.data);
      } else {
        console.log('Using fallback prompts data');
        setPrompts(aiPromptsData);
      }
    } catch (error) {
      console.error('Error loading prompts:', error);
      setPrompts(aiPromptsData);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let filtered = prompts;
    
    if (selectedTool !== 'All') {
      filtered = filtered.filter(prompt => prompt.tool === selectedTool);
    }

    filtered.sort((a, b) => {
      if (a.isDaily && !b.isDaily) return -1;
      if (!a.isDaily && b.isDaily) return 1;
      return b.usageCount - a.usageCount;
    });

    setFilteredPrompts(filtered);
  }, [prompts, selectedTool]);

  const copyToClipboard = async (content: string, title: string, promptId?: number) => {
    await Clipboard.setStringAsync(content);
    Alert.alert('Copied!', `"${title}" has been copied to your clipboard.`);
    
    // Track usage if we have a prompt ID
    if (promptId) {
      try {
        await promptsApi.trackUsage(promptId.toString());
      } catch (error) {
        console.error('Error tracking usage:', error);
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10B981';
      case 'Intermediate': return '#F59E0B';
      case 'Advanced': return '#EF4444';
      default: return '#64748B';
    }
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
          <Text style={styles.logo}>Ultra Prompt Power</Text>
          <Text style={styles.tagline}>Unlock ultra-smart productivity</Text>
        </Animated.View>
      </LinearGradient>

      {/* Compact Tool Filter */}
      <Animated.View style={[styles.filterWrapper, { opacity: fadeAnim }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}>
          {tools.map((tool) => (
            <TouchableOpacity
              key={tool}
              style={[
                styles.filterChip,
                selectedTool === tool && styles.selectedFilterChip,
              ]}
              onPress={() => setSelectedTool(tool)}>
              <Text
                style={[
                  styles.filterText,
                  selectedTool === tool && styles.selectedFilterText,
                ]}>
                {tool}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Prompts List */}
      <Animated.View style={[
        styles.promptsListWrapper,
        { opacity: fadeAnim }
      ]}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7C3AED" />
            <Text style={styles.loadingText}>Loading prompts...</Text>
          </View>
        )}
        <ScrollView style={styles.promptsList} showsVerticalScrollIndicator={false}>
          {filteredPrompts.map((prompt, index) => (
            <Animated.View
              key={prompt.id}
              style={[
                styles.promptCard,
                {
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 30],
                      outputRange: [0, 30 + (index * 6)],
                    })
                  }]
                }
              ]}>
              <View style={styles.promptHeader}>
                <View style={styles.promptTitleContainer}>
                  <Text style={styles.promptTitle} numberOfLines={1}>{prompt.title}</Text>
                  {prompt.isDaily && (
                    <View style={styles.dailyBadge}>
                      <Zap size={10} color="#FFFFFF" />
                      <Text style={styles.dailyText}>Daily</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => copyToClipboard(prompt.content, prompt.title, prompt.id)}>
                  <Copy size={16} color="#7C3AED" />
                </TouchableOpacity>
              </View>

              <Text style={styles.promptContent} numberOfLines={3}>
                {prompt.content}
              </Text>

              <View style={styles.promptMeta}>
                <View style={styles.metaLeft}>
                  <View style={styles.toolBadge}>
                    <Text style={styles.toolText}>{prompt.tool}</Text>
                  </View>
                  <View style={[styles.difficultyBadge, { backgroundColor: `${getDifficultyColor(prompt.difficulty)}20` }]}>
                    <Text style={[styles.difficultyText, { color: getDifficultyColor(prompt.difficulty) }]}>
                      {prompt.difficulty}
                    </Text>
                  </View>
                </View>
                <View style={styles.usageContainer}>
                  <TrendingUp size={12} color="#94A3B8" />
                  <Text style={styles.usageText}>{prompt.usageCount.toLocaleString()}</Text>
                </View>
              </View>

              <View style={styles.tagsContainer}>
                {prompt.tags.slice(0, 3).map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
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
  filterWrapper: {
    marginTop: 12,
  },
  filterContainer: {
    maxHeight: 36,
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingRight: 32,
  },
  filterChip: {
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
  selectedFilterChip: {
    backgroundColor: '#7C3AED',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
  promptsListWrapper: {
    flex: 1,
    paddingTop: 12,
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
  promptsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  promptCard: {
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
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  promptTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  promptTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E293B',
    marginRight: 6,
    flex: 1,
  },
  dailyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  dailyText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  copyButton: {
    padding: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
  },
  promptContent: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 12,
  },
  promptMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolBadge: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    marginRight: 6,
  },
  toolText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  usageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usageText: {
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 3,
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