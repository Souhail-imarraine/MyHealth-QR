import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(userId) {
    if (!this.socket || !this.socket.connected) {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      });

      this.socket.on('connect', () => {
        console.log('✅ Socket.IO connecté:', this.socket.id);
        if (userId) {
          this.socket.emit('join', userId);
        }
      });

      this.socket.on('disconnect', () => {
        console.log('❌ Socket.IO déconnecté');
      });

      this.socket.on('connect_error', (error) => {
        console.error('Erreur de connexion Socket.IO:', error);
      });

      // Réenregistrer tous les listeners existants
      this.listeners.forEach((callback, event) => {
        this.socket.on(event, callback);
      });
    }

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
    }
  }

  on(event, callback) {
    this.listeners.set(event, callback);
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event) {
    this.listeners.delete(event);
    if (this.socket) {
      this.socket.off(event);
    }
  }

  emit(event, data) {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    }
  }

  isConnected() {
    return this.socket && this.socket.connected;
  }
}

// Export singleton instance
export default new SocketService();
