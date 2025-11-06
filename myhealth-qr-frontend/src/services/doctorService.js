import api from './api';

export const doctorService = {
  // Récupérer le profil médecin
  getProfile: async () => {
    const response = await api.get('/doctor/profile');
    return response.data;
  },

  // Mettre à jour le profil
  updateProfile: async (profileData) => {
    const response = await api.put('/doctor/profile', profileData);
    return response.data;
  },

  // Scanner un QR Code
  scanQRCode: async (qrData, reason) => {
    const response = await api.post('/doctor/scan-qr', { qrData, reason });
    return response.data;
  },

  // Alias pour scanner un QR Code patient
  scanPatientQR: async (qrData, reason) => {
    const response = await api.post('/doctor/scan-qr', { qrData, reason });
    return response.data;
  },

  // Récupérer les demandes d'accès
  getAccessRequests: async () => {
    const response = await api.get('/doctor/access-requests');
    return response.data;
  },

  // Récupérer la liste des patients
  getMyPatients: async () => {
    const response = await api.get('/doctor/patients');
    return response.data;
  },

  // Récupérer le dossier d'un patient
  getPatientMedicalRecord: async (patientId) => {
    const response = await api.get(`/doctor/patients/${patientId}`);
    return response.data;
  },

  // Ajouter un dossier médical
  addMedicalRecord: async (patientId, recordData) => {
    const response = await api.post(`/doctor/patients/${patientId}/records`, recordData);
    return response.data;
  },
};

// Exporter aussi les fonctions individuellement
export const {
  getProfile,
  updateProfile,
  scanQRCode,
  scanPatientQR,
  getAccessRequests,
  getMyPatients,
  getPatientMedicalRecord,
  addMedicalRecord
} = doctorService;

export default doctorService;
