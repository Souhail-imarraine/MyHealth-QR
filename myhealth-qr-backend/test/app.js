import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

import authRoutes from '../src/routes/authRoutes.js';
import patientRoutes from '../src/routes/patientRoutes.js';
import doctorRoutes from '../src/routes/doctorRoutes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur interne du serveur'
  });
});

export default app;
