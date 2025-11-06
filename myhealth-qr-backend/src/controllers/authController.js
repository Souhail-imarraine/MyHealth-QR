import { User, Doctor, Patient } from '../models/index.js';
import { generateToken } from '../utils/generateToken.js';
import { generateQRCode } from '../utils/qrCodeGenerator.js';

/**
 * Inscription d'un nouvel utilisateur
 */
export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, phone } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }

    // Créer l'utilisateur
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role,
      phone
    });

    // Créer le profil correspondant selon le rôle
    if (role === 'patient') {
      const patient = await Patient.create({ userId: user.id });
      
      // Générer le QR Code pour le patient
      const { token, qrCode } = await generateQRCode(patient.id);
      await patient.update({
        qrCodeToken: token,
        qrCode: qrCode
      });
    } else if (role === 'doctor') {
      await Doctor.create({ 
        userId: user.id,
        specialization: req.body.specialization || 'Médecine Générale',
        licenseNumber: req.body.licenseNumber || `DOC${Date.now()}`
      });
    }

    // Générer le token JWT
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription',
      error: error.message
    });
  }
};

/**
 * Connexion d'un utilisateur
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier si l'utilisateur est actif
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Votre compte est désactivé. Contactez l\'administrateur.'
      });
    }

    // Générer le token JWT
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: error.message
    });
  }
};

/**
 * Récupérer le profil de l'utilisateur connecté
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        { 
          model: Patient, 
          as: 'patientProfile' 
        },
        { 
          model: Doctor, 
          as: 'doctorProfile' 
        }
      ]
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil',
      error: error.message
    });
  }
};

/**
 * Mettre à jour le profil utilisateur
 */
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const user = await User.findByPk(req.user.id);

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      phone: phone || user.phone
    });

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: user
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour',
      error: error.message
    });
  }
};
