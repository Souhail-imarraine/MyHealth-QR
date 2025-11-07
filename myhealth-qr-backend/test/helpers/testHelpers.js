import jwt from 'jsonwebtoken';
import { User, Patient, Doctor } from '../../src/models/index.js';

export const createTestUser = async (userData = {}) => {
  const defaultData = {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    role: 'patient',
    phone: '1234567890'
  };
  
  return await User.create({ ...defaultData, ...userData });
};

export const createTestPatient = async (userId) => {
  return await Patient.create({ userId });
};

export const createTestDoctor = async (userId) => {
  return await Doctor.create({
    userId,
    specialization: 'Médecine Générale',
    licenseNumber: `DOC${Date.now()}`
  });
};

export const generateAuthToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};
