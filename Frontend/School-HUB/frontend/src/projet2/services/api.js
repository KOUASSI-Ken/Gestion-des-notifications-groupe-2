import axios from 'axios';

// Configuration de base pour axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',  
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Ici on essai de reconnaitre l'utilisateur qui veux exécuteur l'action avec un token pour que le backend ne  rejette pas la requete 
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs globalement en cas de prolème avec l'authentification  ou le serveur 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Non authentifié - rediriger vers login
      localStorage.removeItem('auth_token');
      // window.location.href = '/login';
    }
    
    if (error.response?.status >= 500) {
      console.error('Erreur serveur:', error);
    }
    
    return Promise.reject(error);
  }
);

export default api; // permet d'utiliser api dans d'autes fichiers 