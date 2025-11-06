import { sequelize } from '../config/database.js';
import User from './User.js';
import Doctor from './Doctor.js';
import Patient from './Patient.js';
import MedicalRecord from './MedicalRecord.js';
import AccessRequest from './AccessRequest.js';

// Relations entre les modèles

// User -> Doctor (1:1)
User.hasOne(Doctor, { foreignKey: 'userId', as: 'doctorProfile' });
Doctor.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User -> Patient (1:1)
User.hasOne(Patient, { foreignKey: 'userId', as: 'patientProfile' });
Patient.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Patient -> MedicalRecords (1:N)
Patient.hasMany(MedicalRecord, { foreignKey: 'patientId', as: 'medicalRecords' });
MedicalRecord.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

// Doctor -> MedicalRecords (1:N)
Doctor.hasMany(MedicalRecord, { foreignKey: 'doctorId', as: 'medicalRecords' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

// Patient -> AccessRequests (1:N)
Patient.hasMany(AccessRequest, { foreignKey: 'patientId', as: 'accessRequests' });
AccessRequest.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

// Doctor -> AccessRequests (1:N)
Doctor.hasMany(AccessRequest, { foreignKey: 'doctorId', as: 'accessRequests' });
AccessRequest.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

// Synchronisation de la base de données
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Base de données synchronisée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
  }
};

export {
  sequelize,
  User,
  Doctor,
  Patient,
  MedicalRecord,
  AccessRequest,
  syncDatabase
};
