import api from './api';

export const patientService = {
  // Récupérer le profil patient
  getProfile: async () => {
    const response = await api.get('/patient/profile');
    return response.data;
  },

  // Mettre à jour le profil
  updateProfile: async (profileData) => {
    const response = await api.put('/patient/profile', profileData);
    return response.data;
  },

  // Récupérer le QR Code
  getQRCode: async () => {
    const response = await api.get('/patient/qr-code');
    return response.data;
  },

  // Régénérer le QR Code
  regenerateQRCode: async () => {
    const response = await api.post('/patient/qr-code/regenerate');
    return response.data;
  },

  // Récupérer les dossiers médicaux
  getMedicalRecords: async () => {
    const response = await api.get('/patient/medical-records');
    return response.data;
  },

  // Récupérer les demandes d'accès
  getAccessRequests: async () => {
    const response = await api.get('/patient/access-requests');
    return response.data;
  },

  // Répondre à une demande d'accès
  respondToAccessRequest: async (requestId, status) => {
    const response = await api.put(`/patient/access-requests/${requestId}`, { status });
    return response.data;
  },
};
