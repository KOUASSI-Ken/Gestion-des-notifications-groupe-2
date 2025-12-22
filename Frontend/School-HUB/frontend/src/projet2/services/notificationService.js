import api from './api';
import { mockNotifications, generateRandomNotification } from '../mockData/notifications';

// Toggle : true = utiliser les mocks, false = utiliser la vraie API
const USE_MOCK = true;

class NotificationService {
  // Récupérer toutes les notifications
  async getAll() {
    if (USE_MOCK) {
      // Simuler une latence réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        data: {
          notifications: mockNotifications,
          unread_count: mockNotifications.filter(n => !n.read_at).length,
          total: mockNotifications.length
        }
      };
    }
    
    // Vraie API (quand le backend sera prêt)
    const response = await api.get('/notifications');
    return response.data;
  }

  // Marquer une notification comme lue
  async markAsRead(notificationId) {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true };
    }
    
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  }

  // Marquer toutes les notifications comme lues
  async markAllAsRead() {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    }
    
    const response = await api.post('/notifications/mark-all-read');
    return response.data;
  }

  // Supprimer une notification
  async delete(notificationId) {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true };
    }
    
    await api.delete(`/notifications/${notificationId}`);
    return { success: true };
  }

  // Envoyer une nouvelle notification (pour admin)
  async send(notificationData) {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return {
        success: true,
        data: generateRandomNotification()
      };
    }
    
    const response = await api.post('/notifications/send', notificationData);
    return response.data;
  }
}

export default new NotificationService();