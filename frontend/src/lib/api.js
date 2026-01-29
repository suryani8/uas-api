import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const authStorage = localStorage.getItem('auth-storage');
    console.log('Auth storage:', authStorage); // Debug
    
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        const token = state?.accessToken;
        console.log('Token found:', token ? 'Yes' : 'No'); // Debug
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('Authorization header set'); // Debug
        }
      } catch (e) {
        console.error('Error parsing auth storage:', e);
      }
    }
  }
  return config;
});

// Response interceptor (tetap sama)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && 
        error.response?.data?.code === 'TOKEN_EXPIRED' && 
        !originalRequest._retry) {
      
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (typeof window !== 'undefined') {
          const authStorage = localStorage.getItem('auth-storage');
          if (authStorage) {
            const parsed = JSON.parse(authStorage);
            parsed.state.accessToken = data.data.accessToken;
            localStorage.setItem('auth-storage', JSON.stringify(parsed));
          }
        }

        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
