# 🏥 MyHealth QR - Dossier Médical Personnel Sécurisé

Plateforme web complète permettant aux patients de centraliser leurs dossiers médicaux et de les partager en toute sécurité avec des professionnels de santé via un QR Code unique.

> ✨ **Nouveau** : Configuration complète pour déploiement sur Vercel/Railway incluse !

## � Liens Rapides

- 📖 [Installation Locale](./INSTALLATION.md)
- 🌐 [Guide de Déploiement Complet](./DEPLOYMENT_GUIDE.md)
- ⚡ [Déploiement Rapide (5 min)](./QUICK_DEPLOY.md)
- ✅ [Checklist de Déploiement](./DEPLOYMENT_CHECKLIST.md)
- 📝 [Commandes Essentielles](./COMMANDS_REFERENCE.md)

## �📋 Présentation du projet

MyHealth QR est une solution numérique innovante qui révolutionne la gestion des dossiers médicaux en offrant :

- 🔐 **Sécurité maximale** : Chiffrement, JWT, contrôle d'accès basé sur les rôles
- 📱 **QR Code unique** : Chaque patient dispose d'un QR code personnel pour partager son dossier
- ✅ **Contrôle total** : Le patient approuve ou refuse chaque demande d'accès
- 🔔 **Notifications temps réel** : Socket.io pour des notifications instantanées
- 🎨 **Interface moderne** : Design professionnel et responsive sans couleur bleue
- 🌐 **API RESTful complète** : Backend Node.js/Express robuste et scalable
- ☁️ **Prêt pour le Cloud** : Déploiement facile sur Vercel/Railway

## 🛠️ Stack technique

### Backend
- **Node.js** + **Express.js** - Serveur API RESTful
- **MySQL** + **Sequelize ORM** - Base de données relationnelle
- **JWT** - Authentification sécurisée
- **Socket.io** - Notifications en temps réel
- **bcryptjs** - Hachage des mots de passe
- **QRCode** - Génération de QR codes
- **Helmet** + **CORS** - Sécurité HTTP

### Frontend
- **React 18** + **Vite** - Interface utilisateur moderne
- **TailwindCSS** - Design system professionnel
- **React Router** - Navigation SPA
- **Zustand** - State management
- **Axios** - Client HTTP
- **Socket.io Client** - WebSocket
- **React Hot Toast** - Notifications
- **Lucide React** - Icônes modernes

## 📂 Structure du projet

```
Solution/
├── myhealth-qr-backend/          # Backend API
│   ├── src/
│   │   ├── config/               # Configuration (DB, etc.)
│   │   ├── models/               # Modèles Sequelize
│   │   ├── controllers/          # Logique métier
│   │   ├── routes/               # Routes API
│   │   ├── middlewares/          # Middlewares (auth, validation)
│   │   ├── utils/                # Utilitaires (JWT, QR Code)
│   │   └── server.js             # Point d'entrée
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
└── myhealth-qr-frontend/         # Frontend React
    ├── src/
    │   ├── components/           # Composants réutilisables
    │   ├── pages/                # Pages principales
    │   ├── services/             # Services API
    │   ├── store/                # State management
    │   ├── App.jsx               # Composant principal
    │   └── main.jsx              # Point d'entrée
    ├── public/
    ├── .env.example
    ├── package.json
    ├── tailwind.config.js
    └── README.md
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js (v16+)
- MySQL (v8.0+)
- npm ou yarn

### 1. Cloner le projet
```bash
cd Solution
```

### 2. Configuration du Backend

```bash
cd myhealth-qr-backend

# Installer les dépendances
npm install

# Créer la base de données MySQL
mysql -u root -p
CREATE DATABASE myhealth_qr;
exit

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Démarrer le serveur
npm run dev
```

Le backend démarre sur `http://localhost:5000`

### 3. Configuration du Frontend

```bash
cd ../myhealth-qr-frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Vérifier que VITE_API_URL pointe vers le backend

# Démarrer l'application
npm run dev
```

Le frontend démarre sur `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Profil utilisateur
- `PUT /api/auth/profile` - Mise à jour profil

### Patient
- `GET /api/patient/profile` - Profil patient
- `PUT /api/patient/profile` - Mettre à jour profil
- `GET /api/patient/qr-code` - Récupérer QR code
- `POST /api/patient/qr-code/regenerate` - Régénérer QR code
- `GET /api/patient/medical-records` - Dossiers médicaux
- `GET /api/patient/access-requests` - Demandes d'accès
- `PUT /api/patient/access-requests/:id` - Répondre à une demande

### Médecin
- `GET /api/doctor/profile` - Profil médecin
- `PUT /api/doctor/profile` - Mettre à jour profil
- `POST /api/doctor/scan-qr` - Scanner QR code patient
- `GET /api/doctor/access-requests` - Demandes d'accès
- `GET /api/doctor/patients` - Liste des patients
- `GET /api/doctor/patients/:id` - Dossier patient
- `POST /api/doctor/patients/:id/records` - Ajouter dossier médical

## 🎨 Palette de couleurs (Sans bleu)

- **Primary (Rose)** : `#ec4899` - Actions principales, boutons
- **Accent (Vert)** : `#22c55e` - Succès, validation
- **Secondary (Gris)** : `#78716c` - Textes, bordures
- **Medical Teal** : `#14b8a6` - Médical/Santé
- **Medical Coral** : `#f97316` - Alertes importantes
- **Medical Purple** : `#a855f7` - Accent secondaire
- **Medical Amber** : `#f59e0b` - Avertissements

## 🔐 Sécurité

### Mesures implémentées
✅ Authentification JWT avec expiration
✅ Hachage bcrypt des mots de passe
✅ Protection CORS configurée
✅ Helmet.js pour sécuriser les headers HTTP
✅ Validation des entrées (express-validator)
✅ Contrôle d'accès basé sur les rôles (RBAC)
✅ Protection contre les injections SQL (ORM)
✅ Gestion des erreurs centralisée

## 👥 Acteurs du système

| Acteur | Rôle | Fonctionnalités principales |
|--------|------|----------------------------|
| **Patient** | Utilisateur final | Gestion dossier médical, QR Code, autorisations d'accès |
| **Médecin** | Professionnel de santé | Scanner QR, consulter dossiers, ajouter informations |
| **Admin** | Administrateur système | Supervision, gestion utilisateurs (à implémenter) |

## 🎯 Fonctionnalités principales

### ✅ Implémentées
- [x] Authentification complète (JWT)
- [x] Inscription Patient/Médecin
- [x] Dashboard Patient avec stats
- [x] Génération QR Code unique
- [x] Téléchargement QR Code
- [x] Régénération QR Code
- [x] Dashboard Médecin
- [x] Architecture Backend complète
- [x] API RESTful sécurisée
- [x] Modèles de données complets
- [x] Système de notifications (Socket.io)
- [x] Interface responsive moderne

### 🚧 À développer
- [ ] Scanner QR Code (caméra)
- [ ] Gestion complète dossiers médicaux
- [ ] Upload documents/images
- [ ] Historique des accès
- [ ] Notifications push
- [ ] Mode sombre
- [ ] PWA (Progressive Web App)
- [ ] Support multilingue

## 📊 Modèles de données

### User
- Informations de base (email, mot de passe, rôle)
- Relations : Patient ou Doctor

### Patient
- Informations médicales (groupe sanguin, taille, poids, allergies)
- QR Code unique
- Relations : User, MedicalRecords, AccessRequests

### Doctor
- Informations professionnelles (spécialisation, licence)
- Relations : User, MedicalRecords, AccessRequests

### MedicalRecord
- Type, diagnostic, traitement, médicaments
- Relations : Patient, Doctor

### AccessRequest
- Statut (pending, approved, rejected, revoked)
- Relations : Patient, Doctor

## 📱 Screenshots

### Page d'accueil
- Hero section moderne
- Fonctionnalités mises en avant
- Section sécurité
- CTA claire

### Dashboard Patient
- Stats en temps réel
- Accès rapide au QR Code
- Gestion des demandes
- Navigation intuitive

### Dashboard Médecin
- Scanner QR Code
- Liste des patients
- Ajout de dossiers médicaux

## 🧪 Tests

### Backend
```bash
cd myhealth-qr-backend
npm test
```

### Frontend
```bash
cd myhealth-qr-frontend
npm test
```

## 📝 Variables d'environnement

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_NAME=myhealth_qr
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🚀 Déploiement

### 🌐 Déploiement sur Vercel/Railway

**Guides de déploiement complets disponibles :**

- 📖 **[Guide Complet](./DEPLOYMENT_GUIDE.md)** - Documentation détaillée pas à pas
- ⚡ **[Déploiement Rapide](./QUICK_DEPLOY.md)** - Mise en production en 5 minutes
- ✅ **[Checklist](./DEPLOYMENT_CHECKLIST.md)** - Liste de vérification complète
- 📝 **[Commandes](./COMMANDS_REFERENCE.md)** - Référence des commandes essentielles

### 🚀 Déploiement Express

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Déployer le backend (ou utiliser Railway)
cd myhealth-qr-backend
vercel --prod

# 3. Déployer le frontend
cd ../myhealth-qr-frontend
vercel --prod
```

### 🤖 Déploiement Automatique

```powershell
# Windows
.\deploy.ps1 all

# Linux/Mac
chmod +x deploy.sh
./deploy.sh all
```

### ☁️ Architecture Cloud Recommandée

```
Frontend (Vercel)
    ↓
Backend (Railway/Vercel)
    ↓
MySQL Database (Railway/PlanetScale)
```

**Fichiers de configuration inclus :**
- ✅ `vercel.json` (backend + frontend)
- ✅ `.env.production` (templates)
- ✅ Scripts de déploiement automatique
- ✅ GitHub Actions workflow (optionnel)

### Backend (Production)
```bash
# Déploiement manuel
npm run build
npm start

# Ou via Vercel/Railway
vercel --prod
```

### Frontend (Production)
```bash
# Build
npm run build

# Les fichiers sont dans dist/
# Preview local
npm run preview

# Déploiement
vercel --prod
```

## 📄 Licence

MIT License - 2025 MyHealth QR Team

## 👨‍💻 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe : support@myhealth-qr.com

## 🙏 Remerciements

Merci à tous les contributeurs et à la communauté open-source pour les outils utilisés dans ce projet !

---

**Fait avec ❤️ par l'équipe MyHealth QR**

🏥 *Votre santé, notre priorité* 🏥
# MyHealth-QR
