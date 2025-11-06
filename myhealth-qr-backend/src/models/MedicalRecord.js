import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const MedicalRecord = sequelize.define('MedicalRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'patient_id',
    references: {
      model: 'patients',
      key: 'id'
    }
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'doctor_id',
    references: {
      model: 'doctors',
      key: 'id'
    }
  },
  recordType: {
    type: DataTypes.ENUM('consultation', 'prescription', 'lab_result', 'imaging', 'vaccination', 'allergy', 'chronic_condition', 'surgery', 'other'),
    allowNull: false,
    field: 'record_type'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  treatment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  medications: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Liste des médicaments prescrits'
  },
  labResults: {
    type: DataTypes.JSON,
    allowNull: true,
    field: 'lab_results',
    comment: 'Résultats d\'analyses'
  },
  attachments: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'URLs des fichiers attachés (radios, documents, etc.)'
  },
  visitDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'visit_date'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Notes additionnelles du médecin'
  }
}, {
  tableName: 'medical_records',
  timestamps: true
});

export default MedicalRecord;
