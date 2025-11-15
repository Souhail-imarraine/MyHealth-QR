# 🚀 Déploiement Rapide - MyHealth QR

## ⚡ Déploiement Express (5 minutes)

### 📦 Option 1 : Frontend Seulement sur Vercel

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Aller dans le dossier frontend
cd myhealth-qr-frontend

# 3. Se connecter à Vercel
vercel login

# 4. Déployer
vercel --prod
```

**Ensuite :**
- Notez l'URL : `https://votre-app.vercel.app`
- Mettez à jour `VITE_API_URL` dans Vercel Dashboard → Settings → Environment Variables

---

### 📦 Option 2 : Backend sur Railway + Frontend sur Vercel (RECOMMANDÉ)

#### Backend sur Railway

1. **Créer un compte** : [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub**
3. **Sélectionner** : `myhealth-qr-backend`
4. **Ajouter MySQL** : + New → Database → MySQL
5. **Configurer les variables** :
   ```
   NODE_ENV=production
   JWT_SECRET=changez-moi-super-secret-jwt
   QR_ENCRYPTION_KEY=32-caracteres-exactement-changez
   FRONTEND_URL=https://votre-app.vercel.app
   ```
6. **Notez l'URL** : `https://myhealth-qr-backend.up.railway.app`

#### Frontend sur Vercel

```bash
cd myhealth-qr-frontend
vercel --prod
```

**Variables d'environnement à ajouter dans Vercel :**
```
VITE_API_URL=https://myhealth-qr-backend.up.railway.app/api
VITE_SOCKET_URL=https://myhealth-qr-backend.up.railway.app
```

---

### 📦 Option 3 : Tout sur Vercel

#### Backend
```bash
cd myhealth-qr-backend
vercel --prod
```

**⚠️ Configurer les variables dans Vercel Dashboard :**
- DB_HOST, DB_NAME, DB_USER, DB_PASSWORD
- JWT_SECRET, QR_ENCRYPTION_KEY
- FRONTEND_URL

#### Frontend
```bash
cd myhealth-qr-frontend
vercel --prod
```

---

## 🛠️ Scripts de Déploiement Automatique

### Windows (PowerShell)
```powershell
# Tout déployer
.\deploy.ps1 all

# Frontend seulement
.\deploy.ps1 frontend

# Backend seulement
.\deploy.ps1 backend
```

### Linux/Mac (Bash)
```bash
# Rendre le script exécutable
chmod +x deploy.sh

# Tout déployer
./deploy.sh all

# Frontend seulement
./deploy.sh frontend

# Backend seulement
./deploy.sh backend
```

---

## 🔑 Variables d'Environnement Essentielles

### Backend (.env.production ou Vercel/Railway Dashboard)

```env
# Serveur
NODE_ENV=production
PORT=5000

# Base de données (obtenir de Railway/PlanetScale/etc)
DB_HOST=votre-db-host.com
DB_PORT=3306
DB_NAME=myhealth_qr
DB_USER=votre-user
DB_PASSWORD=votre-password

# Sécurité
JWT_SECRET=votre-secret-jwt-changez-moi-128-caracteres-minimum
QR_ENCRYPTION_KEY=cle-32-caracteres-exactement-change

# CORS
FRONTEND_URL=https://votre-app.vercel.app
```

### Frontend (.env.production ou Vercel Dashboard)

```env
VITE_API_URL=https://votre-backend.railway.app/api
VITE_SOCKET_URL=https://votre-backend.railway.app
```

---

## 🔒 Générer des Secrets Sécurisés

### Générer JWT_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Générer QR_ENCRYPTION_KEY
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

---

## ✅ Checklist de Déploiement

### Avant le Déploiement
- [ ] Code poussé sur GitHub
- [ ] Tests locaux passés
- [ ] Variables d'environnement préparées
- [ ] Base de données cloud configurée

### Backend
- [ ] Backend déployé (Railway/Vercel)
- [ ] Variables d'environnement configurées
- [ ] Base de données connectée
- [ ] Test de l'API : `GET https://votre-backend.com/`
- [ ] CORS configuré avec URL du frontend

### Frontend
- [ ] Frontend déployé sur Vercel
- [ ] Variables VITE_API_URL et VITE_SOCKET_URL configurées
- [ ] Build réussi
- [ ] Test de connexion à l'API

### Post-Déploiement
- [ ] Test de connexion utilisateur
- [ ] Test d'inscription
- [ ] Test de génération QR Code
- [ ] Test des notifications temps réel
- [ ] Test sur mobile

---

## 🐛 Problèmes Courants

### ❌ "Cannot connect to database"
**Solution :**
```bash
# Vérifier que la base de données autorise les connexions externes
# Vérifier les credentials dans les variables d'environnement
# Tester avec MySQL Workbench
```

### ❌ "CORS policy blocked"
**Solution :**
```javascript
// Dans server.js, vérifier :
FRONTEND_URL=https://votre-app-exacte.vercel.app
```

### ❌ "Module not found"
**Solution :**
```bash
# Réinstaller les dépendances
npm install
vercel --prod
```

### ❌ Build échoue
**Solution :**
```bash
# Tester le build localement d'abord
npm run build

# Vérifier les logs dans Vercel Dashboard
```

---

## 📊 Bases de Données Cloud Recommandées

| Service | Gratuit | Facile | Recommandé |
|---------|---------|--------|------------|
| **Railway MySQL** | 500MB | ⭐⭐⭐⭐⭐ | ✅ OUI |
| **PlanetScale** | 5GB | ⭐⭐⭐⭐ | ✅ OUI |
| **Aiven** | 30j trial | ⭐⭐⭐ | ✅ OUI |
| **Amazon RDS** | 12 mois | ⭐⭐ | Complexe |

---

## 🚀 Déploiement en 1 Commande

```bash
# Windows
.\deploy.ps1 all

# Linux/Mac
./deploy.sh all
```

---

## 📞 Support

- **Logs Vercel** : Dashboard → Deployments → View Logs
- **Logs Railway** : Dashboard → Deployments → View Logs
- **Documentation complète** : Voir `DEPLOYMENT_GUIDE.md`

---

## 🎉 Félicitations !

Votre application MyHealth QR est maintenant en ligne ! 🚀

**URLs :**
- Frontend : `https://votre-app.vercel.app`
- Backend : `https://myhealth-qr-backend.up.railway.app`
- API : `https://myhealth-qr-backend.up.railway.app/api`

---

**Besoin d'aide ?** Consultez le guide complet : [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)
