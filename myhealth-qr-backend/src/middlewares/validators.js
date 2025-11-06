import { body, validationResult } from 'express-validator';

// Middleware pour gérer les erreurs de validation
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors: errors.array()
    });
  }
  next();
};

// Validation pour l'inscription
export const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('Le prénom est requis'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis'),
  body('role')
    .isIn(['patient', 'doctor'])
    .withMessage('Le rôle doit être patient ou doctor'),
  handleValidationErrors
];

// Validation pour la connexion
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis'),
  handleValidationErrors
];

// Validation pour le profil médecin
export const validateDoctorProfile = [
  body('specialization')
    .trim()
    .notEmpty()
    .withMessage('La spécialisation est requise'),
  body('licenseNumber')
    .trim()
    .notEmpty()
    .withMessage('Le numéro de licence est requis'),
  handleValidationErrors
];

// Validation pour le profil patient
export const validatePatientProfile = [
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Format de date invalide'),
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Genre invalide'),
  body('bloodType')
    .optional()
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Groupe sanguin invalide'),
  handleValidationErrors
];

// Validation pour les dossiers médicaux
export const validateMedicalRecord = [
  body('recordType')
    .isIn(['consultation', 'prescription', 'lab_result', 'imaging', 'vaccination', 'allergy', 'chronic_condition', 'surgery', 'other'])
    .withMessage('Type de dossier invalide'),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Le titre est requis'),
  handleValidationErrors
];
