import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Linking,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, ExternalLink } from 'lucide-react-native';
import { newsApi } from '@/utils/api';
import { AINews } from '@/types/AINews';
import { aiNewsData } from '@/data/aiNewsData';

export default function NewsScreen() {
  const [news, setNews] = useState<AINews[]>(aiNewsData);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(40);

  useEffect(() => {
    loadNews();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const response = await newsApi.getLatest();
      if (response.success && response.data) {
        setNews(response.data);
      } else {
        console.log('Using fallback news data');
        setNews(aiNewsData);
      }
    } catch (error) {
      console.error('Error loading news:', error);
      setNews(aiNewsData);
    } finally {
      setLoading(false);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  };

  const openNewsLink = (url: string) => {
    Linking.openURL(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
          <Text style={styles.logo}>AI News Boost</Text>
          <Text style={styles.tagline}>Stay on the edge of innovation</Text>
        </Animated.View>
      </LinearGradient>

      <Animated.View style={[
        styles.contentWrapper,
        { opacity: fadeAnim }
      ]}>
        {loading && !refreshing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#7C3AED" />
            <Text style={styles.loadingText}>Loading latest news...</Text>
          </View>
        )}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {news.map((article, index) => (
            <Animated.View
              key={article.id}
              style={[
                styles.newsCard,
                {
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 40],
                      outputRange: [0, 40 + (index * 8)],
                    })
                  }]
                }
              ]}>
              <TouchableOpacity onPress={() => openNewsLink(article.link)}>
                <View style={styles.newsHeader}>
                  <Text style={styles.newsTitle} numberOfLines={2}>
                    {article.title}
                  </Text>
                  <View style={styles.dateContainer}>
                    <Calendar size={12} color="#94A3B8" />
                    <Text style={styles.newsDate}>{formatDate(article.date)}</Text>
                  </View>
                </View>
                <Text style={styles.newsSummary} numberOfLines={3}>
                  {article.summary}
                </Text>
                <View style={styles.newsFooter}>
                  <View style={styles.sourceContainer}>
                    <Text style={styles.sourceText}>{article.source}</Text>
                  </View>
                  <View style={styles.readMoreContainer}>
                    <Text style={styles.readMoreText}>Read More</Text>
                    <ExternalLink size={14} color="#7C3AED" />
                  </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  newsCard: {
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
  newsHeader: {
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    lineHeight: 22,
    marginBottom: 6,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsDate: {
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 3,
  },
  newsSummary: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceContainer: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
  },
  sourceText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 13,
    color: '#7C3AED',
    fontWeight: '600',
    marginRight: 3,
  },
});