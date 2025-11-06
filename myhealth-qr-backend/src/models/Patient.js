import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'date_of_birth'
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true
  },
  bloodType: {
    type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allowNull: true,
    field: 'blood_type'
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Height in cm'
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Weight in kg'
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  emergencyContact: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'emergency_contact'
  },
  emergencyContactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'emergency_contact_phone'
  },
  qrCode: {
    type: DataTypes.TEXT,
    allowNull: true,
    unique: true,
    field: 'qr_code',
    comment: 'QR Code unique du patient en base64'
  },
  qrCodeToken: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    field: 'qr_code_token',
    comment: 'Token unique pour identifier le QR code'
  }
}, {
  tableName: 'patients',
  timestamps: true
});

export default Patient;
