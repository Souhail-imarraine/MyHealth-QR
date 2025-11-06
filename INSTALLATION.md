# 🏥 MyHealth QR - Guide d'Installation Locale

Ce guide vous explique comment installer et exécuter le projet **MyHealth QR** sur votre machine locale.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- ✅ **Node.js** (version 16 ou supérieure) - [Télécharger](https://nodejs.org/)
- ✅ **MySQL** (version 8.0 ou supérieure) - [Télécharger](https://dev.mysql.com/downloads/mysql/)
- ✅ **Git** - [Télécharger](https://git-scm.com/)
- ✅ **Un éditeur de code** (VS Code recommandé) - [Télécharger](https://code.visualstudio.com/)

### Vérifier les installations :

```bash
node --version    # Doit afficher v16.x.x ou supérieur
npm --version     # Doit afficher 8.x.x ou supérieur
mysql --version   # Doit afficher 8.0.x ou supérieur
git --version     # Doit afficher 2.x.x ou supérieur
```

---

## 🚀 Installation - Étape par Étape

### 1️⃣ Cloner le Projet

```bash
# Cloner le repository
git clone https://github.com/Souhail-imarraine/MyHealth-QR.git

# Aller dans le dossier du projet
cd MyHealth-QR
```

---

### 2️⃣ Configuration de la Base de Données MySQL

#### a) Démarrer MySQL

**Sur Windows :**
```bash
# Démarrer le service MySQL
net start MySQL80

# Ou via MySQL Workbench
```

**Sur Mac/Linux :**
```bash
sudo mysql.server start
# ou
sudo systemctl start mysql
```

#### b) Créer la Base de Données

```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE myhealth_qr;

# Vérifier que la base est créée
SHOW DATABASES;

# Quitter MySQL
exit;
```

---

### 3️⃣ Configuration du Backend

```bash
# Aller dans le dossier backend
cd myhealth-qr-backend

# Installer les dépendances
npm install
```

#### Créer le fichier `.env` :

```bash
# Copier le fichier exemple
cp .env.example .env
```

#### Modifier le fichier `.env` avec vos informations :

```env
# Port du serveur
PORT=5000

# Configuration MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=myhealth_qr
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql

# JWT Secret (générer une clé aléatoire sécurisée)
JWT_SECRET=votre_secret_jwt_super_securise_123456789

# Environnement
NODE_ENV=development
```

> ⚠️ **Important** : Remplacez `DB_PASSWORD` par votre vrai mot de passe MySQL !

#### Créer les tables dans la base de données :

```bash
# Les tables seront créées automatiquement au démarrage du serveur
npm start
```

Le serveur backend démarre sur : **http://localhost:5000** 🎉

---

### 4️⃣ Configuration du Frontend

**Ouvrir un NOUVEAU terminal** (garder le backend actif) :

```bash
# Depuis la racine du projet
cd myhealth-qr-frontend

# Installer les dépendances
npm install
```

#### Créer le fichier `.env` :

```bash
# Copier le fichier exemple
cp .env.example .env
```

#### Le fichier `.env` doit contenir :

```env
VITE_API_URL=http://localhost:5000/api
```

#### Démarrer le frontend :

```bash
npm run dev
```

Le frontend démarre sur : **http://localhost:5173** 🎉

---

## 🎯 Accéder à l'Application

1. **Ouvrir votre navigateur**
2. **Aller sur** : http://localhost:5173
3. **Créer un compte** (Patient ou Médecin)
4. **Commencer à utiliser MyHealth QR !**

---

## 📁 Structure du Projet

```
MyHealth-QR/
│
├── myhealth-qr-backend/          # Backend Node.js + Express
│   ├── src/
│   │   ├── config/               # Configuration base de données
│   │   ├── controllers/          # Logique métier
│   │   ├── models/               # Modèles Sequelize
│   │   ├── routes/               # Routes API
│   │   ├── middlewares/          # Authentification JWT
│   │   └── utils/                # QR Code generator
│   ├── .env                      # Variables d'environnement
│   └── package.json
│
├── myhealth-qr-frontend/         # Frontend React + Vite
│   ├── src/
│   │   ├── components/           # Composants React
│   │   ├── pages/                # Pages principales
│   │   ├── services/             # API services
│   │   ├── store/                # Zustand stores
│   │   ├── i18n/                 # Traductions FR/AR/EN
│   │   └── utils/                # Utilitaires
│   ├── .env                      # Variables d'environnement
│   └── package.json
│
└── README.md
```

---

## 🔧 Commandes Utiles

### Backend :

```bash
# Démarrer le serveur
npm start

# Mode développement (auto-reload)
npm run dev

# Arrêter le serveur
Ctrl + C
```

### Frontend :

```bash
# Démarrer en mode développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview

# Arrêter le serveur
Ctrl + C
```

### Base de Données :

```bash
# Se connecter à MySQL
mysql -u root -p

# Voir les tables
USE myhealth_qr;
SHOW TABLES;

# Voir les utilisateurs
SELECT * FROM users;

# Supprimer toutes les données (ATTENTION!)
DROP DATABASE myhealth_qr;
CREATE DATABASE myhealth_qr;
```

---

## 🌍 Changer la Langue

L'application supporte **3 langues** :
- 🇫🇷 **Français** (par défaut)
- 🇸🇦 **العربية** (Arabe avec support RTL)
- 🇬🇧 **English** (Anglais)

**Cliquer sur le sélecteur de langue** en haut à droite de l'application 🌐

---

## 🎨 Fonctionnalités Disponibles

### Pour les Patients 👤 :
- ✅ Inscription et connexion
- ✅ Génération de QR Code personnel
- ✅ Gestion du dossier médical
- ✅ Consultation des demandes d'accès
- ✅ Approuver/Refuser les accès médecins
- ✅ Profil avec photo

### Pour les Médecins 👨‍⚕️ :
- ✅ Inscription et connexion
- ✅ Scanner les QR Codes patients
- ✅ Demander l'accès aux dossiers
- ✅ Consulter les patients approuvés
- ✅ Profil professionnel (INPE, spécialité)

---

## 🐛 Résolution des Problèmes

### ❌ Erreur : "Cannot connect to MySQL"
```bash
# Vérifier que MySQL est démarré
mysql -u root -p

# Vérifier le mot de passe dans .env
DB_PASSWORD=votre_mot_de_passe
```

### ❌ Erreur : "Port 5000 already in use"
```bash
# Changer le port dans backend/.env
PORT=5001

# Et dans frontend/.env
VITE_API_URL=http://localhost:5001/api
```

### ❌ Erreur : "Module not found"
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### ❌ Les traductions ne fonctionnent pas
```bash
# Vider le cache du navigateur
Ctrl + Shift + Delete

# Ou mode incognito
Ctrl + Shift + N
```

### ❌ Le QR Code ne se génère pas
```bash
# Vérifier que le backend tourne
# Ouvrir http://localhost:5000/api/health
# Doit retourner : {"status": "OK"}
```

---

## 📱 Tester en Mode Mobile

### Méthode 1 : DevTools du Navigateur
1. Ouvrir **Chrome DevTools** : `F12`
2. Cliquer sur l'icône **mobile** (📱)
3. Choisir un appareil (iPhone, Samsung, etc.)

### Méthode 2 : Tester sur un Vrai Téléphone
1. **Trouver l'IP de votre ordinateur** :
   ```bash
   # Windows
   ipconfig
   # Chercher "IPv4 Address" : 192.168.x.x
   
   # Mac/Linux
   ifconfig | grep inet
   ```

2. **Modifier le frontend/.env** :
   ```env
   VITE_API_URL=http://192.168.x.x:5000/api
   ```

3. **Accéder depuis le téléphone** :
   ```
   http://192.168.x.x:5173
   ```

> ⚠️ **Important** : Le téléphone et l'ordinateur doivent être sur le **même WiFi** !

---

## 🚀 Déploiement en Production

### Backend :
- **Heroku**, **Railway**, **Render**, ou **DigitalOcean**
- Base de données : **PlanetScale**, **ClearDB**, ou **AWS RDS**

### Frontend :
- **Vercel**, **Netlify**, ou **GitHub Pages**

### Guide de déploiement complet disponible dans `DEPLOYMENT.md`

---

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifier les logs** :
   - Backend : Regarder le terminal du backend
   - Frontend : Ouvrir la Console du navigateur (`F12`)

2. **Créer une issue** sur GitHub :
   https://github.com/Souhail-imarraine/MyHealth-QR/issues

3. **Contacter le développeur** :
   - Email : souhail.imarraine@example.com
   - GitHub : [@Souhail-imarraine](https://github.com/Souhail-imarraine)

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

---

## 🎉 Félicitations !

Vous avez installé **MyHealth QR** avec succès ! 🚀

**Bon développement !** 💚

---

**Développé avec ❤️ par Souhail Imarraine**
