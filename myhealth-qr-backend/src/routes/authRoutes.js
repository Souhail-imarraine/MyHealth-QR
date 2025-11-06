import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { validateRegister, validateLogin } from '../middlewares/validators.js';

const router = express.Router();

// Routes publiques
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Routes protégées
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;
