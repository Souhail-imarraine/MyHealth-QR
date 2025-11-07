import toast from 'react-hot-toast';

class NotificationService {
  constructor() {
    this.audio = new Audio('/notification-sound.wav');
    this.audio.volume = 0.6; // Volume (0.0 à 1.0)
    this.isAudioEnabled = true;
  }

  // Jouer le son de notification MP3
  playNotificationSound() {
    if (!this.isAudioEnabled) return;

    try {
      // Reset audio to start from beginning
      this.audio.currentTime = 0;
      this.audio.play().catch(error => {
        console.error('Erreur lors de la lecture du son:', error);
      });
    } catch (error) {
      console.error('Erreur lors de la lecture du son:', error);
    }
  }

  // Afficher une notification avec son
  showAccessRequestNotification(data) {
    this.playNotificationSound();
    
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-2 ring-accent-500 ring-opacity-50`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
            <div className="ltr:ml-3 rtl:mr-3 flex-1">
              <p className="text-sm font-bold text-secondary-900">
                📋 Nouvelle demande d'accès
              </p>
              <p className="mt-1 text-sm text-secondary-600">
                {data.message}
              </p>
              <p className="mt-1 text-xs text-accent-600 font-medium">
                {data.specialty}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-secondary-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-medium text-accent-600 hover:text-accent-500 focus:outline-none"
          >
            Fermer
          </button>
        </div>
      </div>
    ), {
      duration: 8000,
      position: 'top-right',
    });

    // Notification système si disponible
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Nouvelle demande d\'accès', {
        body: data.message,
        icon: '/logo.png',
        badge: '/logo.png',
        tag: 'access-request',
        requireInteraction: true
      });
    }
  }

  // Afficher une notification de réponse à une demande d'accès (pour le docteur)
  showAccessResponseNotification(data) {
    this.playNotificationSound();
    
    const isApproved = data.status === 'approved';
    
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex ring-2 ${
          isApproved ? 'ring-green-500' : 'ring-red-500'
        } ring-opacity-50`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className={`w-12 h-12 rounded-full ${
                isApproved 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                  : 'bg-gradient-to-br from-red-500 to-rose-500'
              } flex items-center justify-center`}>
                {isApproved ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
            </div>
            <div className="ltr:ml-3 rtl:mr-3 flex-1">
              <p className="text-sm font-bold text-secondary-900">
                {isApproved ? '✅ Demande acceptée' : '❌ Demande refusée'}
              </p>
              <p className="mt-1 text-sm text-secondary-600">
                {data.message}
              </p>
              <p className="mt-1 text-xs font-medium" style={{ color: isApproved ? '#10b981' : '#ef4444' }}>
                Patient: {data.patientName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-secondary-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className={`w-full border border-transparent rounded-none rounded-r-2xl p-4 flex items-center justify-center text-sm font-medium ${
              isApproved ? 'text-green-600 hover:text-green-500' : 'text-red-600 hover:text-red-500'
            } focus:outline-none`}
          >
            Fermer
          </button>
        </div>
      </div>
    ), {
      duration: 8000,
      position: 'top-right',
    });

    // Notification système si disponible
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(isApproved ? 'Demande acceptée' : 'Demande refusée', {
        body: data.message,
        icon: '/logo.png',
        badge: '/logo.png',
        tag: 'access-response',
        requireInteraction: true
      });
    }
  }

  // Demander la permission pour les notifications système
  async requestPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  }

  // Activer/désactiver le son
  toggleSound(enabled) {
    this.isAudioEnabled = enabled;
    localStorage.setItem('notificationSoundEnabled', enabled);
  }

  // Vérifier si le son est activé
  isSoundEnabled() {
    const saved = localStorage.getItem('notificationSoundEnabled');
    return saved === null ? true : saved === 'true';
  }
}

export default new NotificationService();
