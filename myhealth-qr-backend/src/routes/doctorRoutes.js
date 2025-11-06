import express from 'express';
import {
  getDoctorProfile,
  updateDoctorProfile,
  scanQRCode,
  getAccessRequests,
  getPatientMedicalRecord,
  addMedicalRecord,
  getMyPatients
} from '../controllers/doctorController.js';
import { authenticate, authorize } from '../middlewares/auth.js';
import { validateDoctorProfile, validateMedicalRecord } from '../middlewares/validators.js';

const router = express.Router();

// Toutes les routes nécessitent une authentification médecin
router.use(authenticate, authorize('doctor'));

// Profil médecin
router.get('/profile', getDoctorProfile);
router.put('/profile', validateDoctorProfile, updateDoctorProfile);

// Scanner QR Code et demande d'accès
router.post('/scan-qr', scanQRCode);
router.get('/access-requests', getAccessRequests);

// Patients
router.get('/patients', getMyPatients);
router.get('/patients/:patientId', getPatientMedicalRecord);

// Dossiers médicaux
router.post('/patients/:patientId/records', validateMedicalRecord, addMedicalRecord);

export default router;
