import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const AccessRequest = sequelize.define('AccessRequest', {
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
    allowNull: false,
    field: 'doctor_id',
    references: {
      model: 'doctors',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'revoked'),
    allowNull: false,
    defaultValue: 'pending'
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Raison de la demande d\'accès'
  },
  requestDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'request_date'
  },
  responseDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'response_date'
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'expires_at',
    comment: 'Date d\'expiration de l\'accès (optionnel)'
  }
}, {
  tableName: 'access_requests',
  timestamps: true
});

export default AccessRequest;
