import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Doctor = sequelize.define('Doctor', {
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
  specialty: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'specialty'
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'license_number'
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: true
  },
  graduationYear: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'graduation_year'
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'experience'
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'bio'
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified'
  }
}, {
  tableName: 'doctors',
  timestamps: true
});

export default Doctor;
