# 🏥 MyHealth QR - Backend API

Backend RESTful API pour le système de dossier médical personnel sécurisé MyHealth QR.

## 📋 Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [API Endpoints](#api-endpoints)
- [Modèles de données](#modèles-de-données)
- [Sécurité](#sécurité)

## 🛠️ Technologies utilisées

- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web
- **MySQL** - Base de données relationnelle
- **Sequelize** - ORM pour MySQL
- **JWT** - Authentification sécurisée
- **bcryptjs** - Hachage des mots de passe
- **Socket.io** - Notifications en temps réel
- **QRCode** - Génération de QR codes
- **Helmet** - Sécurité HTTP
- **CORS** - Gestion des requêtes cross-origin

## 🏗️ Architecture

```
myhealth-qr-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuration MySQL
│   ├── models/
│   │   ├── User.js              # Modèle utilisateur
│   │   ├── Doctor.js            # Modèle médecin
│   │   ├── Patient.js           # Modèle patient
│   │   ├── MedicalRecord.js     # Modèle dossier médical
│   │   ├── AccessRequest.js     # Modèle demande d'accès
│   │   └── index.js             # Relations et export
│   ├── controllers/
│   │   ├── authController.js    # Authentification
│   │   ├── patientController.js # Gestion patients
│   │   └── doctorController.js  # Gestion médecins
│   ├── routes/
│   │   ├── authRoutes.js        # Routes auth
│   │   ├── patientRoutes.js     # Routes patients
│   │   └── doctorRoutes.js      # Routes médecins
│   ├── middlewares/
│   │   ├── auth.js              # Authentification JWT
│   │   └── validators.js        # Validation des données
│   ├── utils/
│   │   ├── generateToken.js     # Génération JWT
│   │   └── qrCodeGenerator.js   # Génération QR codes
│   └── server.js                # Point d'entrée
├── .env.example                 # Exemple de configuration
├── .gitignore
├── package.json
└── README.md
```

## 📦 Installation

### Prérequis

- Node.js (v16 ou supérieur)
- MySQL (v8.0 ou supérieur)
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
cd myhealth-qr-backend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Créer la base de données MySQL**
```sql
CREATE DATABASE myhealth_qr;
```

## ⚙️ Configuration

1. **Créer le fichier `.env`**
```bash
cp .env.example .env
```

2. **Configurer les variables d'environnement**
```env
# Serveur
PORT=5000
NODE_ENV=development

# Base de données MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=myhealth_qr
DB_USER=root
DB_PASSWORD=votre_mot_de_passe

# JWT
JWT_SECRET=votre_secret_jwt_tres_securise
JWT_EXPIRES_IN=7d

# Frontend
FRONTEND_URL=http://localhost:5173
```

## 🚀 Démarrage

### Mode développement (avec nodemon)
```bash
npm run dev
```

### Mode production
```bash
npm start
```

Le serveur démarre sur `https://localhost:5000`

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/register` | Inscription utilisateur | Non |
| POST | `/login` | Connexion utilisateur | Non |
| GET | `/profile` | Récupérer profil | Oui |
| PUT | `/profile` | Mettre à jour profil | Oui |

### Patient (`/api/patient`)

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/profile` | Profil patient | Patient |
| PUT | `/profile` | Mettre à jour profil | Patient |
| GET | `/qr-code` | Récupérer QR code | Patient |
| POST | `/qr-code/regenerate` | Régénérer QR code | Patient |
| GET | `/medical-records` | Liste dossiers médicaux | Patient |
| GET | `/access-requests` | Liste demandes d'accès | Patient |
| PUT | `/access-requests/:id` | Répondre à une demande | Patient |

### Doctor (`/api/doctor`)

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/profile` | Profil médecin | Médecin |
| PUT | `/profile` | Mettre à jour profil | Médecin |
| POST | `/scan-qr` | Scanner QR code patient | Médecin |
| GET | `/access-requests` | Liste demandes d'accès | Médecin |
| GET | `/patients` | Liste patients autorisés | Médecin |
| GET | `/patients/:id` | Dossier médical patient | Médecin |
| POST | `/patients/:id/records` | Ajouter dossier médical | Médecin |

### Exemples de requêtes

**Inscription**
```json
POST /api/auth/register
{
  "email": "patient@example.com",
  "password": "password123",
  "firstName": "Ahmed",
  "lastName": "Alami",
  "role": "patient",
  "phone": "0612345678"
}
```

**Connexion**
```json
POST /api/auth/login
{
  "email": "patient@example.com",
  "password": "password123"
}
```

**Scanner QR Code (Médecin)**
```json
POST /api/doctor/scan-qr
Authorization: Bearer <token>
{
  "qrData": "{\"patientId\":\"...\",\"token\":\"...\",\"type\":\"myhealth-qr\"}",
  "reason": "Consultation de contrôle"
}
```

**Répondre à une demande (Patient)**
```json
PUT /api/patient/access-requests/:requestId
Authorization: Bearer <token>
{
  "status": "approved"
}
```

## 📊 Modèles de données

### User
- id (UUID)
- email (String, unique)
- password (String, hashed)
- firstName (String)
- lastName (String)
- role (Enum: patient, doctor, admin)
- phone (String)
- isActive (Boolean)
- profileImage (String)

### Patient
- id (UUID)
- userId (UUID, FK)
- dateOfBirth (Date)
- gender (Enum: male, female, other)
- bloodType (Enum: A+, A-, B+, B-, AB+, AB-, O+, O-)
- height (Float)
- weight (Float)
- address (Text)
- city (String)
- emergencyContact (String)
- emergencyContactPhone (String)
- qrCode (Text)
- qrCodeToken (String, unique)

### Doctor
- id (UUID)
- userId (UUID, FK)
- specialization (String)
- licenseNumber (String, unique)
- hospital (String)
- address (Text)
- city (String)
- isVerified (Boolean)

### MedicalRecord
- id (UUID)
- patientId (UUID, FK)
- doctorId (UUID, FK)
- recordType (Enum)
- title (String)
- description (Text)
- diagnosis (Text)
- treatment (Text)
- medications (JSON)
- labResults (JSON)
- attachments (JSON)
- visitDate (Date)
- notes (Text)

### AccessRequest
- id (UUID)
- patientId (UUID, FK)
- doctorId (UUID, FK)
- status (Enum: pending, approved, rejected, revoked)
- reason (Text)
- requestDate (Date)
- responseDate (Date)
- expiresAt (Date)

## 🔐 Sécurité

### Mesures implémentées

1. **Authentification JWT**
   - Tokens sécurisés avec expiration
   - Vérification à chaque requête protégée

2. **Hachage des mots de passe**
   - Utilisation de bcrypt avec salt
   - Mots de passe jamais stockés en clair

3. **Protection des headers**
   - Helmet.js pour sécuriser les headers HTTP
   - CORS configuré strictement

4. **Validation des données**
   - Express-validator pour toutes les entrées
   - Sanitization des données

5. **Contrôle d'accès**
   - Vérification des rôles (RBAC)
   - Vérification des permissions d'accès aux dossiers

6. **Socket.io sécurisé**
   - Authentification des connexions WebSocket
   - Rooms privées par utilisateur

## 📝 Scripts disponibles

```bash
# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start

# Tests (à implémenter)
npm test
```

## 🐛 Débogage

Pour activer les logs détaillés en développement, le serveur utilise `morgan` et affiche automatiquement les requêtes HTTP.

## 📄 Licence

MIT

## 👥 Auteurs

MyHealth QR Team - 2025

---

**Note**: Assurez-vous de changer le `JWT_SECRET` en production avec une clé aléatoire sécurisée !
