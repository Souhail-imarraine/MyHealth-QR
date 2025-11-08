import { Doctor, User, Patient, AccessRequest, MedicalRecord } from '../models/index.js';
import { verifyQRCode } from '../utils/qrCodeGenerator.js';
import { emitToUser } from '../utils/socketManager.js';

/**
 * Récupérer le profil médecin complet
 */
export const getDoctorProfile = async (req, res) => {
  try {
    console.log('🔍 getDoctorProfile appelé pour userId:', req.user.id);
    
    let doctor = await Doctor.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'firstName', 'lastName', 'phone']
        }
      ]
    });

    console.log('👨‍⚕️ Doctor trouvé:', doctor ? 'Oui' : 'Non');

    // Si le profil médecin n'existe pas, le créer
    if (!doctor) {
      console.log('🏗️ Création du profil médecin...');
      
      doctor = await Doctor.create({
        userId: req.user.id,
        specialty: '',
        licenseNumber: '',
        hospital: '',
        graduationYear: null,
        experience: null,
        bio: ''
      });

      console.log('✅ Profil médecin créé:', doctor.id);

      // Récupérer le profil créé avec les informations de l'utilisateur
      doctor = await Doctor.findOne({
        where: { userId: req.user.id },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'email', 'firstName', 'lastName', 'phone']
          }
        ]
      });
    }

    console.log('📤 Envoi de la réponse, doctor:', doctor ? 'Trouvé' : 'Null');
    
    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('❌ Erreur getDoctorProfile:', error);
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
    console.log('🔄 updateDoctorProfile appelé pour userId:', req.user.id);
    console.log('📝 Données reçues:', req.body);
    
    let doctor = await Doctor.findOne({ where: { userId: req.user.id } });
    const user = await User.findByPk(req.user.id);

    const { 
      firstName, 
      lastName, 
      phone, 
      specialty, 
      licenseNumber, 
      hospital, 
      graduationYear, 
      experience, 
      bio 
    } = req.body;

    // Mettre à jour les informations de l'utilisateur
    if (firstName || lastName || phone) {
      await user.update({
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        phone: phone || user.phone
      });
    }

    // Créer ou mettre à jour le profil médecin
    if (!doctor) {
      doctor = await Doctor.create({
        userId: req.user.id,
        specialty: specialty || '',
        licenseNumber: licenseNumber || '',
        hospital: hospital || '',
        graduationYear: graduationYear || null,
        experience: experience || null,
        bio: bio || ''
      });
    } else {
      await doctor.update({
        specialty: specialty !== undefined ? specialty : doctor.specialty,
        licenseNumber: licenseNumber !== undefined ? licenseNumber : doctor.licenseNumber,
        hospital: hospital !== undefined ? hospital : doctor.hospital,
        graduationYear: graduationYear !== undefined ? graduationYear : doctor.graduationYear,
        experience: experience !== undefined ? experience : doctor.experience,
        bio: bio !== undefined ? bio : doctor.bio
      });
    }

    // Récupérer le profil complet mis à jour

    const updatedDoctor = await Doctor.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'firstName', 'lastName', 'phone']
        }
      ]
    });

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: updatedDoctor
    });
  } catch (error) {
    console.error('❌ Erreur updateDoctorProfile:', error);
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

    let accessRequest;

    if (existingRequest) {
      if (existingRequest.status === 'approved') {
        return res.status(200).json({
          success: true,
          message: 'Vous avez déjà accès au dossier de ce patient',
          data: {
            accessRequest: existingRequest,
            patient: {
              user: patient.user
            },
            alreadyApproved: true
          }
        });
      }
      
      // Si la demande est en attente, renvoyer une notification au patient
      accessRequest = existingRequest;
      console.log(`📢 Renvoi de notification pour demande existante ${existingRequest.id}`);
    } else {
      // Créer une nouvelle demande d'accès
      accessRequest = await AccessRequest.create({
        patientId: patient.id,
        doctorId: doctor.id,
        reason: reason || 'Consultation médicale',
        status: 'pending'
      });
      console.log(`📢 Nouvelle demande d'accès créée ${accessRequest.id}`);
    }

    // Émettre une notification Socket.IO en temps réel au patient
    emitToUser(patient.user.id, 'new_access_request', {
      id: accessRequest.id,
      doctorId: doctor.id,
      doctorName: `Dr. ${doctor.user.firstName} ${doctor.user.lastName}`,
      specialty: doctor.specialty,
      reason: accessRequest.reason,
      createdAt: accessRequest.createdAt,
      message: `Dr. ${doctor.user.firstName} ${doctor.user.lastName} demande l'accès à votre dossier médical`
    });

    console.log(`📢 Notification envoyée au patient ${patient.user.id}`);

    const isNewRequest = !existingRequest || existingRequest.status === 'rejected';
    
    res.status(200).json({
      success: true,
      message: isNewRequest 
        ? 'Demande d\'accès envoyée au patient avec succès'
        : 'Notification renvoyée au patient avec succès',
      data: {
        accessRequest,
        patient: {
          user: patient.user
        },
        isNewRequest,
        notificationSent: true
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
