import AsyncStorage from '@react-native-async-storage/async-storage';
import { AITool } from '@/types/AITool';

const FAVORITES_KEY = 'innoalaxy_favorites';

export const getFavorites = async (): Promise<AITool[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = async (tool: AITool): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const isAlreadyFavorite = favorites.some(fav => fav.id === tool.id);
    
    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, tool];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const removeFromFavorites = async (toolId: number): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter(fav => fav.id !== toolId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

export const removeFavorite = async (toolId: number): Promise<void> => {
  return removeFromFavorites(toolId);
};

export const isFavorite = async (toolId: number): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.id === toolId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};