import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import { createTestUser, createTestDoctor, createTestPatient, generateAuthToken } from '../helpers/testHelpers.js';
import { AccessRequest } from '../../src/models/index.js';

describe('Doctor Controller', () => {
  let doctorUser, doctorProfile, patientUser, patientProfile, authToken;

  beforeEach(async () => {
    doctorUser = await createTestUser({ 
      email: `doctor${Date.now()}@test.com`,
      role: 'doctor' 
    });
    doctorProfile = await createTestDoctor(doctorUser.id);
    authToken = generateAuthToken(doctorUser);

    patientUser = await createTestUser({
      email: `patient${Date.now()}@test.com`,
      role: 'patient'
    });
    patientProfile = await createTestPatient(patientUser.id);
  });

  describe('GET /api/doctor/profile', () => {
    it('should get doctor profile', async () => {
      const res = await request(app)
        .get('/api/doctor/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).to.be.true;
      expect(res.body.data.userId).to.equal(doctorUser.id);
    });
  });

  describe('PUT /api/doctor/profile', () => {
    it('should update doctor profile', async () => {
      const updateData = {
        specialization: 'Cardiologie',
        licenseNumber: 'DOC123456',
        hospital: 'Hôpital Central',
        city: 'Paris'
      };

      const res = await request(app)
        .put('/api/doctor/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(res.body.success).to.be.true;
      expect(res.body.data.specialization).to.equal('Cardiologie');
    });
  });

  describe('GET /api/doctor/access-requests', () => {
    it('should get access requests', async () => {
      const res = await request(app)
        .get('/api/doctor/access-requests')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).to.be.true;
      expect(res.body.data).to.be.an('array');
    });
  });
});
