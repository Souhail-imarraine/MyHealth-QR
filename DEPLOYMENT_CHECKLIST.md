# 🚀 CHECKLIST DE DÉPLOIEMENT VERCEL

## ✅ Préparation (FAIT ✓)

- [x] Fichiers `vercel.json` créés (backend + frontend)
- [x] Fichiers `.env.production` créés
- [x] Configuration CORS améliorée dans `server.js`
- [x] Export Vercel ajouté dans `server.js`
- [x] Scripts de déploiement automatique créés
- [x] `.vercelignore` créés
- [x] Guides de déploiement créés

## 📝 À FAIRE AVANT DE DÉPLOYER

### 1. Préparer la Base de Données
- [ ] Créer une base de données MySQL en ligne
  - Option A : Railway (recommandé) - [railway.app](https://railway.app)
  - Option B : PlanetScale - [planetscale.com](https://planetscale.com)
  - Option C : Aiven - [aiven.io](https://aiven.io)
- [ ] Noter les credentials : HOST, PORT, NAME, USER, PASSWORD

### 2. Générer les Secrets
```bash
# JWT_SECRET (64 bytes)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# QR_ENCRYPTION_KEY (16 bytes = 32 caractères hex)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```
- [ ] JWT_SECRET généré : _________________________
- [ ] QR_ENCRYPTION_KEY généré : _________________________

### 3. Installer Vercel CLI
```bash
npm install -g vercel
```
- [ ] Vercel CLI installé
- [ ] Connecté avec `vercel login`

## 🚀 DÉPLOIEMENT ÉTAPE PAR ÉTAPE

### Étape 1 : Déployer le Backend

#### Option A : Backend sur Railway (Recommandé)
1. [ ] Aller sur [railway.app](https://railway.app)
2. [ ] New Project → Deploy from GitHub
3. [ ] Sélectionner le dossier `myhealth-qr-backend`
4. [ ] Ajouter MySQL Database : + New → Database → MySQL
5. [ ] Configurer les variables d'environnement :
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=[depuis Railway MySQL]
   DB_PORT=3306
   DB_NAME=railway
   DB_USER=root
   DB_PASSWORD=[depuis Railway MySQL]
   JWT_SECRET=[votre secret généré]
   QR_ENCRYPTION_KEY=[votre clé générée]
   FRONTEND_URL=https://[sera ajouté après]
   ```
6. [ ] Noter l'URL du backend : _________________________

#### Option B : Backend sur Vercel
```bash
cd myhealth-qr-backend
vercel --prod
```
7. [ ] Configurer les variables dans Vercel Dashboard
8. [ ] Noter l'URL du backend : _________________________

### Étape 2 : Déployer le Frontend

1. [ ] Mettre à jour `.env.production` avec l'URL du backend
   ```env
   VITE_API_URL=https://[votre-backend]/api
   VITE_SOCKET_URL=https://[votre-backend]
   ```

2. [ ] Déployer sur Vercel
   ```bash
   cd myhealth-qr-frontend
   vercel --prod
   ```

3. [ ] Ou via Dashboard Vercel :
   - [ ] New Project
   - [ ] Sélectionner le repository
   - [ ] Root Directory : `myhealth-qr-frontend`
   - [ ] Framework : Vite
   - [ ] Ajouter les variables d'environnement

4. [ ] Noter l'URL du frontend : _________________________

### Étape 3 : Mise à Jour des URLs

1. [ ] Mettre à jour `FRONTEND_URL` dans le backend
   - Railway : Dashboard → Variables → FRONTEND_URL
   - Vercel : Dashboard → Settings → Environment Variables

2. [ ] Redéployer si nécessaire

## ✅ TESTS POST-DÉPLOIEMENT

### Tests Backend
- [ ] Accéder à `https://[votre-backend]/` → Devrait retourner JSON
- [ ] Tester l'API : `https://[votre-backend]/api/auth/test` (si existe)
- [ ] Vérifier les logs : pas d'erreurs de connexion DB

### Tests Frontend
- [ ] Accéder à `https://[votre-frontend]/`
- [ ] La page se charge correctement
- [ ] Tester l'inscription d'un nouveau compte
- [ ] Tester la connexion
- [ ] Tester la génération de QR Code
- [ ] Tester les notifications temps réel

### Tests d'Intégration
- [ ] L'API répond correctement
- [ ] Socket.io fonctionne
- [ ] Pas d'erreurs CORS dans la console
- [ ] Les images/assets se chargent

## 🐛 DÉPANNAGE

### Erreur CORS
```
✓ Solution : Vérifier FRONTEND_URL dans le backend
✓ Vérifier que l'URL est exacte (avec/sans trailing slash)
✓ Redéployer le backend
```

### Erreur Database Connection
```
✓ Vérifier les credentials
✓ Vérifier que la DB autorise les connexions externes
✓ Tester avec MySQL Workbench
```

### Build Failed
```
✓ Tester `npm run build` localement
✓ Vérifier les logs dans Vercel
✓ Vérifier que toutes les dépendances sont dans package.json
```

### Socket.io ne fonctionne pas
```
✓ Socket.io a des limitations sur Vercel Serverless
✓ Utiliser Railway pour le backend (recommandé)
✓ Vérifier la configuration CORS du Socket.io
```

## 📊 INFORMATIONS DE DÉPLOIEMENT

| Service | URL | Status |
|---------|-----|--------|
| Backend | _________________ | [ ] OK |
| Frontend | _________________ | [ ] OK |
| Database | _________________ | [ ] OK |

### Variables d'Environnement Backend
- [x] NODE_ENV
- [x] PORT
- [x] DB_HOST
- [x] DB_PORT
- [x] DB_NAME
- [x] DB_USER
- [x] DB_PASSWORD
- [x] JWT_SECRET
- [x] QR_ENCRYPTION_KEY
- [x] FRONTEND_URL

### Variables d'Environnement Frontend
- [x] VITE_API_URL
- [x] VITE_SOCKET_URL

## 🎉 DÉPLOIEMENT TERMINÉ !

- [ ] Tout fonctionne correctement
- [ ] URLs documentées
- [ ] Secrets sauvegardés en lieu sûr
- [ ] Tests effectués

## 📞 SUPPORT

- Documentation complète : `DEPLOYMENT_GUIDE.md`
- Guide rapide : `QUICK_DEPLOY.md`
- Scripts automatiques : `deploy.ps1` / `deploy.sh`

---

**Date de déploiement** : ________________
**Déployé par** : ________________
**Notes** : ________________
