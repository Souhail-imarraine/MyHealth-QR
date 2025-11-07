import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import { createTestUser, createTestPatient, generateAuthToken } from '../helpers/testHelpers.js';

describe('Patient Controller', () => {
  let patientUser, patientProfile, authToken;

  beforeEach(async () => {
    patientUser = await createTestUser({ 
      email: `patient${Date.now()}@test.com`,
      role: 'patient' 
    });
    patientProfile = await createTestPatient(patientUser.id);
    authToken = generateAuthToken(patientUser);
  });

  describe('GET /api/patient/profile', () => {
    it('should get patient profile', async () => {
      const res = await request(app)
        .get('/api/patient/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).to.be.true;
      expect(res.body.data.userId).to.equal(patientUser.id);
    });

    it('should return 401 without token', async () => {
      await request(app)
        .get('/api/patient/profile')
        .expect(401);
    });
  });

  describe('PUT /api/patient/profile', () => {
    it('should update patient profile', async () => {
      const updateData = {
        dateOfBirth: '1990-01-01',
        gender: 'male',
        bloodType: 'A+',
        height: 180,
        weight: 75
      };

      const res = await request(app)
        .put('/api/patient/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(res.body.success).to.be.true;
      expect(res.body.data.bloodType).to.equal('A+');
    });
  });

  describe('GET /api/patient/qr-code', () => {
    it('should get QR code', async () => {
      const res = await request(app)
        .get('/api/patient/qr-code')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.success).to.be.true;
      expect(res.body.data.qrCode).to.exist;
      expect(res.body.data.token).to.exist;
    });
  });
});
