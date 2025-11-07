import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { testConnection, sequelize } from './config/database.js';
import { syncDatabase } from './models/index.js';
import { setSocketIO } from './utils/socketManager.js';

// Import des routes
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Configuration de Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'https://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Initialiser le socket manager
setSocketIO(io);

// Middlewares de sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://localhost:5173',
  credentials: true
}));

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Route de test
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API MyHealth QR - Serveur opérationnel 🏥',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      patient: '/api/patient',
      doctor: '/api/doctor'
    }
  });
});

// Routes de l'API
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Socket.io - Gestion des notifications en temps réel
io.on('connection', (socket) => {
  console.log('👤 Nouvelle connexion Socket.io:', socket.id);

  // Joindre une room spécifique à l'utilisateur
  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`✅ Utilisateur ${userId} a rejoint sa room`);
  });

  // Notification de nouvelle demande d'accès
  socket.on('access_request', (data) => {
    io.to(`user_${data.patientId}`).emit('new_access_request', data);
  });

  // Notification de réponse à une demande
  socket.on('access_response', (data) => {
    io.to(`user_${data.doctorId}`).emit('access_request_response', data);
  });

  socket.on('disconnect', () => {
    console.log('👋 Déconnexion Socket.io:', socket.id);
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Test de la connexion à la base de données
    await testConnection();
    
    // Synchronisation de la base de données
    await syncDatabase();
    
    // Démarrage du serveur
    httpServer.listen(PORT, () => {
      console.log('');
      console.log('╔════════════════════════════════════════════════╗');
      console.log('║                                                ║');
      console.log('║       🏥 MyHealth QR Backend Server 🏥        ║');
      console.log('║                                                ║');
      console.log('╚════════════════════════════════════════════════╝');
      console.log('');
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📡 API disponible sur: http://localhost:${PORT}`);
      console.log(`🔌 Socket.io activé pour les notifications temps réel`);
      console.log('');
      console.log('✅ Prêt à recevoir des requêtes!');
      console.log('');
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Gestion de l'arrêt gracieux
process.on('SIGTERM', async () => {
  console.log('⚠️  SIGTERM reçu. Arrêt du serveur...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('⚠️  SIGINT reçu. Arrêt du serveur...');
  await sequelize.close();
  process.exit(0);
});

startServer();
