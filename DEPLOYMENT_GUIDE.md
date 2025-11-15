# 🚀 Guide de Déploiement MyHealth QR sur Vercel

## 📋 Prérequis

- Compte Vercel (gratuit)
- Compte GitHub avec le repository
- Base de données MySQL accessible en ligne (PlanetScale, Railway, ou autre)
- Node.js installé localement

---

## 🎯 Option Recommandée : Backend sur Railway + Frontend sur Vercel

### Étape 1 : Déployer le Backend sur Railway

#### 1.1 Créer un compte Railway
1. Allez sur [railway.app](https://railway.app)
2. Connectez-vous avec GitHub
3. Cliquez sur **"New Project"**

#### 1.2 Déployer le Backend
1. Sélectionnez **"Deploy from GitHub repo"**
2. Choisissez votre repository `MyHealth-QR`
3. Sélectionnez le dossier `myhealth-qr-backend`

#### 1.3 Ajouter une Base de Données MySQL
1. Cliquez sur **"+ New"** → **"Database"** → **"MySQL"**
2. Railway créera automatiquement les variables de connexion
3. Notez l'URL de connexion

#### 1.4 Configurer les Variables d'Environnement
Dans Railway, allez dans **Variables** et ajoutez :

```env
NODE_ENV=production
PORT=5000
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=3306
DB_NAME=railway
DB_USER=root
DB_PASSWORD=xxx
JWT_SECRET=votre-secret-jwt-super-securise-changez-moi
JWT_EXPIRE=7d
QR_ENCRYPTION_KEY=votre-cle-32-caracteres-exactement
FRONTEND_URL=https://votre-app.vercel.app
CORS_ORIGIN=https://votre-app.vercel.app
```

#### 1.5 Déployer
1. Railway déploiera automatiquement
2. Notez l'URL de votre backend : `https://myhealth-qr-backend.up.railway.app`

---

### Étape 2 : Déployer le Frontend sur Vercel

#### 2.1 Installer Vercel CLI (optionnel)
```bash
npm install -g vercel
```

#### 2.2 Méthode A : Via le Dashboard Vercel (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Cliquez sur **"Add New Project"**
4. Sélectionnez votre repository `MyHealth-QR`
5. Configurez le projet :
   - **Framework Preset** : Vite
   - **Root Directory** : `myhealth-qr-frontend`
   - **Build Command** : `npm run build` (automatique)
   - **Output Directory** : `dist` (automatique)

6. **Ajoutez les Variables d'Environnement** :
   ```
   VITE_API_URL=https://myhealth-qr-backend.up.railway.app/api
   VITE_SOCKET_URL=https://myhealth-qr-backend.up.railway.app
   ```

7. Cliquez sur **"Deploy"**

#### 2.3 Méthode B : Via le CLI

```bash
cd myhealth-qr-frontend

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Suivre les instructions
# - Set up project: Yes
# - Link to existing project: No
# - Project name: myhealth-qr-frontend
# - Directory: ./
# - Override settings: No

# Déployer en production
vercel --prod
```

---

### Étape 3 : Mettre à Jour les URLs

#### 3.1 Mettre à jour le Backend
1. Dans Railway, mettez à jour la variable :
   ```
   FRONTEND_URL=https://votre-app.vercel.app
   CORS_ORIGIN=https://votre-app.vercel.app
   ```

2. Railway redéploiera automatiquement

#### 3.2 Vérifier le Frontend
1. Dans Vercel, vérifiez les variables d'environnement
2. Si besoin, redéployez : Deployments → ... → Redeploy

---

## 🎯 Option Alternative : Tout sur Vercel

### Backend sur Vercel

1. Déployez le backend :
   ```bash
   cd myhealth-qr-backend
   vercel
   ```

2. Configurez les variables d'environnement dans Vercel Dashboard :
   - DB_HOST, DB_NAME, DB_USER, DB_PASSWORD
   - JWT_SECRET
   - QR_ENCRYPTION_KEY
   - FRONTEND_URL

3. **Important** : Vercel Serverless Functions ont des limitations :
   - Timeout de 10s (hobby) / 60s (pro)
   - Pas de WebSocket persistant (Socket.io limité)
   - Pas idéal pour les longues connexions

### Frontend sur Vercel

Suivez les mêmes étapes que l'Option Recommandée (Étape 2)

---

## 📊 Bases de Données Cloud (Alternatives)

### Option 1 : PlanetScale (Recommandé)
- Gratuit jusqu'à 5GB
- Compatible MySQL
- [planetscale.com](https://planetscale.com)

### Option 2 : Railway MySQL
- Inclus avec Railway
- Facile à configurer
- 500MB gratuit

### Option 3 : Aiven MySQL
- 30 jours gratuit
- [aiven.io](https://aiven.io)

### Option 4 : Amazon RDS
- Tier gratuit 12 mois
- Plus complexe

---

## ✅ Checklist Finale

- [ ] Backend déployé et accessible
- [ ] Base de données MySQL en ligne
- [ ] Variables d'environnement configurées
- [ ] Frontend déployé
- [ ] URLs mises à jour (backend → frontend → backend)
- [ ] CORS configuré correctement
- [ ] Test de connexion réussi
- [ ] Test d'inscription/connexion
- [ ] Test QR Code
- [ ] Socket.io fonctionne (notifications)

---

## 🐛 Dépannage

### Erreur : "Cannot connect to database"
- Vérifiez les credentials de la base de données
- Vérifiez que la base de données autorise les connexions externes
- Testez la connexion avec MySQL Workbench

### Erreur : "CORS policy blocked"
- Vérifiez la variable `FRONTEND_URL` dans le backend
- Vérifiez que l'URL du frontend est correcte
- Redéployez le backend après modification

### Erreur : "Socket.io not connecting"
- Socket.io a des limitations sur Vercel Serverless
- Utilisez Railway pour le backend (recommandé)
- Vérifiez les CORS du Socket.io

### Erreur : "Environment variables not found"
- Vérifiez que toutes les variables sont définies
- Redéployez après ajout de variables
- Vérifiez que les noms commencent par `VITE_` pour le frontend

### Le build échoue
```bash
# Testez localement d'abord
cd myhealth-qr-frontend
npm install
npm run build

cd myhealth-qr-backend
npm install
npm start
```

---

## 🔒 Sécurité en Production

### 1. Changez TOUS les secrets
- Générez un nouveau JWT_SECRET :
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

- Générez une nouvelle QR_ENCRYPTION_KEY :
  ```bash
  node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
  ```

### 2. Utilisez des variables d'environnement
- JAMAIS de secrets dans le code
- Utilisez Vercel/Railway Environment Variables

### 3. Configurez HTTPS
- Automatique sur Vercel et Railway

### 4. Limitez les CORS
- Seulement votre domaine frontend

---

## 📞 Commandes Utiles

### Vercel CLI
```bash
# Se connecter
vercel login

# Déployer en dev
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Lister les projets
vercel list

# Variables d'environnement
vercel env add
vercel env ls
```

### Railway CLI (optionnel)
```bash
# Installer
npm install -g @railway/cli

# Se connecter
railway login

# Lier le projet
railway link

# Voir les logs
railway logs

# Variables
railway variables
```

---

## 🎉 C'est Déployé !

Votre application est maintenant en ligne :

- **Frontend** : https://votre-app.vercel.app
- **Backend** : https://myhealth-qr-backend.up.railway.app
- **API** : https://myhealth-qr-backend.up.railway.app/api

Testez l'application et profitez ! 🚀

---

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Railway](https://docs.railway.app)
- [Documentation Vite](https://vitejs.dev/guide/build.html)
- [Documentation Express](https://expressjs.com/en/advanced/best-practice-performance.html)

---

**Besoin d'aide ?** Consultez les logs :
- Vercel : Dashboard → Deployments → Logs
- Railway : Dashboard → Deployments → View Logs
