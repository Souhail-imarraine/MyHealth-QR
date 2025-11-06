import express from 'express';
import {
  getPatientProfile,
  updatePatientProfile,
  getQRCode,
  regenerateQRCode,
  getMedicalRecords,
  getAccessRequests,
  respondToAccessRequest
} from '../controllers/patientController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validatePatientProfile } from '../middlewares/validators.js';

const router = express.Router();

// Toutes les routes nécessitent une authentification patient
router.use(authenticate, authorize('patient'));

// Profil patient
router.get('/profile', getPatientProfile);
router.put('/profile', validatePatientProfile, updatePatientProfile);

// QR Code
router.get('/qr-code', getQRCode);
router.post('/qr-code/regenerate', regenerateQRCode);

// Dossiers médicaux
router.get('/medical-records', getMedicalRecords);

// Demandes d'accès
router.get('/access-requests', getAccessRequests);
router.put('/access-requests/:requestId', respondToAccessRequest);

export default router;
