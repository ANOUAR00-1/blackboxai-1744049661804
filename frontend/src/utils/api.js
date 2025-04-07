import axios from 'axios';

// Create axios instance with custom config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized responses
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      // Handle other error responses
      return Promise.reject({
        status: error.response.status,
        message: error.response.data.message || 'Une erreur est survenue',
      });
    }
    
    return Promise.reject({
      message: 'Erreur de connexion au serveur',
    });
  }
);

// Auth endpoints
export const auth = {
  login: (credentials) => api.post('/login', credentials),
  signup: (userData) => api.post('/signup', userData),
  logout: () => api.post('/logout'),
  forgotPassword: (data) => api.post('/forgot-password', data),
  resetPassword: (token, data) => api.post(`/reset-password/${token}`, data),
};

// Fuels endpoints
export const fuels = {
  getAll: () => api.get('/fuels'),
  getOne: (id) => api.get(`/fuels/${id}`),
  create: (data) => api.post('/fuels', data),
  update: (id, data) => api.put(`/fuels/${id}`, data),
  delete: (id) => api.delete(`/fuels/${id}`),
};

// Sales endpoints
export const sales = {
  getAll: () => api.get('/sales'),
  getOne: (id) => api.get(`/sales/${id}`),
  create: (data) => api.post('/sales', data),
  update: (id, data) => api.put(`/sales/${id}`, data),
  delete: (id) => api.delete(`/sales/${id}`),
};

// Reports endpoints
export const reports = {
  getSummary: (params) => api.get('/reports/summary', { params }),
  getSales: (params) => api.get('/reports/sales', { params }),
  getStock: (params) => api.get('/reports/stock', { params }),
  exportPdf: (params) => api.get('/reports/export/pdf', { 
    params,
    responseType: 'blob',
  }),
};

// Dashboard endpoints
export const dashboard = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentSales: () => api.get('/dashboard/recent-sales'),
  getLowStockAlerts: () => api.get('/dashboard/low-stock-alerts'),
};

// Error handler helper
export const handleError = (error) => {
  if (error.response && error.response.data) {
    return error.response.data.message || 'Une erreur est survenue';
  }
  return error.message || 'Erreur de connexion au serveur';
};

export default api;