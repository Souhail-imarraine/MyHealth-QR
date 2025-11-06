import { Patient, User, MedicalRecord, AccessRequest } from '../models/index.js';
import { generateQRCode } from '../utils/qrCodeGenerator.js';

/**
 * Récupérer le profil patient complet
 */
export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'firstName', 'lastName', 'phone']
        }
      ]
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Profil patient non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil',
      error: error.message
    });
  }
};

/**
 * Mettre à jour le profil patient
 */
export const updatePatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { userId: req.user.id } });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Profil patient non trouvé'
      });
    }

    const {
      dateOfBirth,
      gender,
      bloodType,
      height,
      weight,
      address,
      city,
      emergencyContact,
      emergencyContactPhone
    } = req.body;

    await patient.update({
      dateOfBirth: dateOfBirth || patient.dateOfBirth,
      gender: gender || patient.gender,
      bloodType: bloodType || patient.bloodType,
      height: height || patient.height,
      weight: weight || patient.weight,
      address: address || patient.address,
      city: city || patient.city,
      emergencyContact: emergencyContact || patient.emergencyContact,
      emergencyContactPhone: emergencyContactPhone || patient.emergencyContactPhone
    });

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: patient
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour',
      error: error.message
    });
  }
};

/**
 * Récupérer le QR Code du patient
 */
export const getQRCode = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { userId: req.user.id } });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Profil patient non trouvé'
      });
    }

    // Si le QR code n'existe pas, le générer
    if (!patient.qrCode || !patient.qrCodeToken) {
      const { token, qrCode } = await generateQRCode(patient.id);
      await patient.update({
        qrCodeToken: token,
        qrCode: qrCode
      });
    }

    res.status(200).json({
      success: true,
      data: {
        qrCode: patient.qrCode,
        token: patient.qrCodeToken
      }
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du QR code',
      error: error.message
    });
  }
};

/**
 * Régénérer le QR Code du patient
 */
export const regenerateQRCode = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { userId: req.user.id } });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Profil patient non trouvé'
      });
    }

    const { token, qrCode } = await generateQRCode(patient.id);
    await patient.update({
      qrCodeToken: token,
      qrCode: qrCode
    });

    res.status(200).json({
      success: true,
      message: 'QR Code régénéré avec succès',
      data: {
        qrCode: patient.qrCode,
        token: patient.qrCodeToken
      }
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la régénération du QR code',
      error: error.message
    });
  }
};

/**
 * Récupérer les dossiers médicaux du patient
 */
export const getMedicalRecords = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { userId: req.user.id } });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Profil patient non trouvé'
      });
    }

    const records = await MedicalRecord.findAll({
      where: { patientId: patient.id },
      order: [['visitDate', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: records
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des dossiers',
      error: error.message
    });
  }
};

/**
 * Récupérer les demandes d'accès pour le patient
 */
export const getAccessRequests = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { userId: req.user.id } });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Profil patient non trouvé'
      });
    }

    const requests = await AccessRequest.findAll({
      where: { patientId: patient.id },
      order: [['requestDate', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: requests
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des demandes',
      error: error.message
    });
  }
};

/**
 * Répondre à une demande d'accès (approuver/rejeter)
 */
export const respondToAccessRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // 'approved' ou 'rejected'

    const patient = await Patient.findOne({ where: { userId: req.user.id } });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Profil patient non trouvé'
      });
    }

    const request = await AccessRequest.findOne({
      where: { id: requestId, patientId: patient.id }
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Demande d\'accès non trouvée'
      });
    }

    await request.update({
      status,
      responseDate: new Date()
    });

    res.status(200).json({
      success: true,
      message: `Demande ${status === 'approved' ? 'approuvée' : 'rejetée'} avec succès`,
      data: request
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la réponse à la demande',
      error: error.message
    });
  }
};
