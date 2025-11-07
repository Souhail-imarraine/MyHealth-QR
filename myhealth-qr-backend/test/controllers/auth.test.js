import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';
import { User } from '../../src/models/index.js';

describe('Auth Controller', () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, force: true });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new patient', async () => {
      const userData = {
        email: 'patient@test.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'patient',
        phone: '1234567890'
      };

      const res = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(res.body.success).to.be.true;
      expect(res.body.data.user.email).to.equal(userData.email);
      expect(res.body.data.token).to.exist;
    });

    it('should not register user with existing email', async () => {
      const userData = {
        email: 'existing@test.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'patient'
      };

      await User.create(userData);

      const res = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(res.body.success).to.be.false;
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const user = await User.create({
        email: 'login@test.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'patient'
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@test.com',
          password: 'password123'
        })
        .expect(200);

      expect(res.body.success).to.be.true;
      expect(res.body.data.token).to.exist;
    });
  });
});
