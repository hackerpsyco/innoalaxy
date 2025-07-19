const API_BASE_URL = 'http://localhost:5000/api';

// API utility functions
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    console.log(`Making API request to: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      mode: 'cors',
      ...options,
    });

    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('API request failed:', error.message);
    // Return fallback data structure
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: true
    };
  }
};

// AI Tools API
export const toolsApi = {
  getAll: (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.category && params.category !== 'All') queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return apiRequest(`/tools${query ? `?${query}` : ''}`);
  },
  
  getFeatured: () => apiRequest('/tools/featured'),
  getCategories: () => apiRequest('/tools/categories'),
  getById: (id: string) => apiRequest(`/tools/${id}`),
};

// AI News API
export const newsApi = {
  getAll: (params?: { category?: string; source?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.source) queryParams.append('source', params.source);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return apiRequest(`/news${query ? `?${query}` : ''}`);
  },
  
  getLatest: () => apiRequest('/news/latest'),
  getSources: () => apiRequest('/news/sources'),
  getById: (id: string) => apiRequest(`/news/${id}`),
};

// AI Prompts API
export const promptsApi = {
  getAll: (params?: { tool?: string; category?: string; difficulty?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.tool && params.tool !== 'All') queryParams.append('tool', params.tool);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const query = queryParams.toString();
    return apiRequest(`/prompts${query ? `?${query}` : ''}`);
  },
  
  getDaily: () => apiRequest('/prompts/daily'),
  getPopular: () => apiRequest('/prompts/popular'),
  getTools: () => apiRequest('/prompts/tools'),
  trackUsage: (id: string) => apiRequest(`/prompts/${id}/use`, { method: 'POST' }),
};

// User API
export const userApi = {
  register: (userData: { name: string; email: string; password: string }) =>
    apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  getProfile: (token: string) =>
    apiRequest('/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  
  updateProfile: (token: string, profileData: { name?: string; bio?: string; avatar?: string }) =>
    apiRequest('/users/profile', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(profileData),
    }),
};