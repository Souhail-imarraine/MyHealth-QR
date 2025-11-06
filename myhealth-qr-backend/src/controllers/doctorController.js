import { Doctor, User, Patient, AccessRequest, MedicalRecord } from '../models/index.js';
import { verifyQRCode } from '../utils/qrCodeGenerator.js';

/**
 * Récupérer le profil médecin complet
 */
export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'firstName', 'lastName', 'phone']
        }
      ]
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Profil médecin non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
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
 * Mettre à jour le profil médecin
 */
export const updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Profil médecin non trouvé'
      });
    }

    const { specialization, hospital, address, city } = req.body;

    await doctor.update({
      specialization: specialization || doctor.specialization,
      hospital: hospital || doctor.hospital,
      address: address || doctor.address,
      city: city || doctor.city
    });

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: doctor
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
 * Scanner le QR Code d'un patient et envoyer une demande d'accès
 * IMPORTANT: Seulement pour les médecins authentifiés
 */
export const scanQRCode = async (req, res) => {
  try {
    const { qrData, reason } = req.body;

    // Vérifier que l'utilisateur est bien un médecin
    if (req.user.role !== 'doctor') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé: Seuls les médecins peuvent scanner les QR codes patients',
        error: 'UNAUTHORIZED_ROLE'
      });
    }

    // Vérifier le QR code
    const decoded = verifyQRCode(qrData);
    const { patientId, token } = decoded;

    // Vérifier que le patient existe
    const patient = await Patient.findOne({
      where: { id: patientId, qrCodeToken: token },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'QR Code invalide ou patient non trouvé'
      });
    }

    // Récupérer le profil médecin
    const doctor = await Doctor.findOne({ 
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Profil médecin non trouvé'
      });
    }

    // Vérifier s'il existe déjà une demande en attente ou approuvée
    const existingRequest = await AccessRequest.findOne({
      where: {
        patientId: patient.id,
        doctorId: doctor.id,
        status: ['pending', 'approved']
      }
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: existingRequest.status === 'approved' 
          ? 'Vous avez déjà accès au dossier de ce patient'
          : 'Une demande d\'accès est déjà en attente pour ce patient',
        data: existingRequest
      });
    }

    // Créer une nouvelle demande d'accès
    const accessRequest = await AccessRequest.create({
      patientId: patient.id,
      doctorId: doctor.id,
      reason: reason || 'Consultation médicale',
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Demande d\'accès envoyée au patient avec succès',
      data: {
        accessRequest,
        patient: {
          user: patient.user
        }
      }
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du scan du QR code',
      error: error.message
    });
  }
};

/**
 * Récupérer les demandes d'accès du médecin
 */
export const getAccessRequests = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Profil médecin non trouvé'
      });
    }

    const requests = await AccessRequest.findAll({
      where: { doctorId: doctor.id },
      include: [
        {
          model: Patient,
          as: 'patient',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['firstName', 'lastName', 'email', 'phone']
            }
          ]
        }
      ],
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
 * Consulter le dossier médical d'un patient (si accès approuvé)
 */
export const getPatientMedicalRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Profil médecin non trouvé'
      });
    }

    // Vérifier l'accès
    const accessRequest = await AccessRequest.findOne({
      where: {
        patientId,
        doctorId: doctor.id,
        status: 'approved'
      }
    });

    if (!accessRequest) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé. Demande d\'accès requise.'
      });
    }

    // Récupérer le patient et ses dossiers
    const patient = await Patient.findByPk(patientId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'email', 'phone']
        },
        {
          model: MedicalRecord,
          as: 'medicalRecords',
          order: [['visitDate', 'DESC']]
        }
      ]
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient non trouvé'
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
      message: 'Erreur lors de la récupération du dossier',
      error: error.message
    });
  }
};

/**
 * Ajouter un dossier médical pour un patient
 */
export const addMedicalRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Profil médecin non trouvé'
      });
    }

    // Vérifier l'accès
    const accessRequest = await AccessRequest.findOne({
      where: {
        patientId,
        doctorId: doctor.id,
        status: 'approved'
      }
    });

    if (!accessRequest) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé'
      });
    }

    const {
      recordType,
      title,
      description,
      diagnosis,
      treatment,
      medications,
      labResults,
      notes,
      visitDate
    } = req.body;

    const medicalRecord = await MedicalRecord.create({
      patientId,
      doctorId: doctor.id,
      recordType,
      title,
      description,
      diagnosis,
      treatment,
      medications,
      labResults,
      notes,
      visitDate: visitDate || new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Dossier médical ajouté avec succès',
      data: medicalRecord
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout du dossier',
      error: error.message
    });
  }
};

/**
 * Récupérer les patients dont le médecin a l'accès
 */
export const getMyPatients = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ where: { userId: req.user.id } });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Profil médecin non trouvé'
      });
    }

    const approvedRequests = await AccessRequest.findAll({
      where: {
        doctorId: doctor.id,
        status: 'approved'
      },
      include: [
        {
          model: Patient,
          as: 'patient',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['firstName', 'lastName', 'email', 'phone']
            }
          ]
        }
      ]
    });

    const patients = approvedRequests.map(req => req.patient);

    res.status(200).json({
      success: true,
      data: patients
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des patients',
      error: error.message
    });
  }
};
