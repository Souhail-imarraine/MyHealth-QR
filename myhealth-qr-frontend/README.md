# 🏥 MyHealth QR - Frontend

Interface utilisateur moderne et responsive pour le système de dossier médical personnel MyHealth QR.

## 📋 Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Structure du projet](#structure-du-projet)
- [Palette de couleurs](#palette-de-couleurs)

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI
- **Vite** - Build tool ultra-rapide
- **TailwindCSS** - Framework CSS utility-first
- **React Router DOM** - Navigation SPA
- **Zustand** - State management léger
- **Axios** - Client HTTP
- **Socket.io Client** - WebSocket pour temps réel
- **React Hot Toast** - Notifications élégantes
- **Lucide React** - Icônes modernes
- **HTML5 QRCode** - Scanner de QR codes

## ✨ Fonctionnalités

### Pour les Patients
- ✅ Inscription et connexion sécurisée
- ✅ Dashboard personnalisé
- ✅ Génération et téléchargement de QR Code unique
- ✅ Consultation des dossiers médicaux
- ✅ Gestion des demandes d'accès
- ✅ Profil médical complet
- ✅ Notifications en temps réel

### Pour les Médecins
- ✅ Espace professionnel dédié
- ✅ Scanner de QR Code patient
- ✅ Demandes d'accès aux dossiers
- ✅ Liste des patients autorisés
- ✅ Ajout de dossiers médicaux
- ✅ Profil professionnel

### Design
- 🎨 Interface moderne sans couleur bleue
- 📱 Fully responsive (mobile-first)
- 🌈 Palette de couleurs professionnelle (rose, vert, gris)
- ✨ Animations et transitions fluides
- 🎯 UX optimisée

## 📦 Installation

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn
- Backend API en cours d'exécution

### Étapes

1. **Aller dans le dossier frontend**
```bash
cd myhealth-qr-frontend
```

2. **Installer les dépendances**
```bash
npm install
```

## ⚙️ Configuration

1. **Créer le fichier `.env`**
```bash
cp .env.example .env
```

2. **Configurer les variables d'environnement**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🚀 Démarrage

### Mode développement
```bash
npm run dev
```

L'application démarre sur `http://localhost:5173`

### Build de production
```bash
npm run build
```

### Prévisualiser le build
```bash
npm run preview
```

## 🏗️ Structure du projet

```
myhealth-qr-frontend/
├── public/                    # Fichiers statiques
├── src/
│   ├── components/           # Composants réutilisables
│   │   └── patient/         # Composants spécifiques patient
│   ├── pages/               # Pages principales
│   │   ├── LandingPage.jsx  # Page d'accueil
│   │   ├── LoginPage.jsx    # Connexion
│   │   ├── RegisterPage.jsx # Inscription
│   │   ├── PatientDashboard.jsx  # Dashboard patient
│   │   └── DoctorDashboard.jsx   # Dashboard médecin
│   ├── services/            # Services API
│   │   ├── api.js          # Configuration Axios
│   │   ├── authService.js  # Auth API
│   │   ├── patientService.js  # Patient API
│   │   └── doctorService.js   # Doctor API
│   ├── store/              # State management
│   │   └── authStore.js    # Store d'authentification
│   ├── App.jsx             # Composant principal
│   ├── main.jsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── .env.example            # Exemple de configuration
├── index.html              # Template HTML
├── package.json            # Dépendances
├── tailwind.config.js      # Configuration Tailwind
├── vite.config.js          # Configuration Vite
└── README.md
```

## 🎨 Palette de couleurs

### Primary (Rose/Pink)
```css
primary-50: #fdf2f8
primary-600: #ec4899
primary-700: #be185d
```

### Accent (Vert)
```css
accent-50: #f0fdf4
accent-600: #22c55e
accent-700: #15803d
```

### Secondary (Gris)
```css
secondary-50: #fafaf9
secondary-600: #78716c
secondary-900: #1c1917
```

### Medical (Couleurs supplémentaires)
```css
medical-teal: #14b8a6
medical-coral: #f97316
medical-purple: #a855f7
medical-amber: #f59e0b
```

## 🔑 Comptes de démonstration

**Patient:**
- Email: patient@demo.com
- Password: password123

**Médecin:**
- Email: doctor@demo.com
- Password: password123

## 📱 Pages disponibles

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/login` | Connexion |
| `/register` | Inscription |
| `/patient/dashboard` | Dashboard patient |
| `/patient/qr-code` | QR Code du patient |
| `/patient/records` | Dossiers médicaux |
| `/patient/requests` | Demandes d'accès |
| `/patient/profile` | Profil patient |
| `/doctor/dashboard` | Dashboard médecin |
| `/doctor/scanner` | Scanner QR Code |
| `/doctor/patients` | Liste patients |
| `/doctor/requests` | Demandes d'accès |
| `/doctor/profile` | Profil médecin |

## 🔐 Sécurité

- Authentification JWT avec token stocké localement
- Routes protégées par rôle (patient/doctor)
- Auto-déconnexion en cas de token expiré
- Validation des formulaires côté client

## 🚀 Prochaines fonctionnalités

- [ ] Scanner QR Code avec caméra
- [ ] Gestion complète des dossiers médicaux
- [ ] Upload de documents (analyses, radios)
- [ ] Historique des accès
- [ ] Notifications push
- [ ] Mode sombre
- [ ] Support multilingue (FR/EN/AR)
- [ ] PWA (Progressive Web App)

## 📝 Scripts disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview du build
npm run preview

# Linter (si configuré)
npm run lint
```

## 🐛 Débogage

### Problèmes courants

**1. Erreur de connexion à l'API**
- Vérifiez que le backend est démarré
- Vérifiez l'URL dans `.env`
- Vérifiez CORS dans le backend

**2. TailwindCSS ne fonctionne pas**
- Exécutez `npm install`
- Vérifiez `tailwind.config.js`
- Redémarrez le serveur de développement

**3. Routes protégées ne fonctionnent pas**
- Vérifiez le token dans localStorage
- Vérifiez l'expiration du token
- Reconnectez-vous

## 📄 Licence

MIT

## 👥 Auteurs

MyHealth QR Team - 2025

---

**Note importante**: Pour un déploiement en production, pensez à :
- Changer les URLs de l'API
- Activer HTTPS
- Configurer les variables d'environnement de production
- Optimiser les images et assets
- Activer la compression
