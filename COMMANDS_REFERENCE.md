# ⚡ MyHealth QR - Commandes Essentielles

## 🔧 Installation et Configuration

### Installation Initiale

```bash
# Cloner le repository
git clone https://github.com/votre-username/MyHealth-QR.git
cd MyHealth-QR

# Backend
cd myhealth-qr-backend
npm install
cp .env.example .env
# Éditer .env avec vos configurations

# Frontend
cd ../myhealth-qr-frontend
npm install
cp .env.example .env
# Éditer .env avec vos configurations
```

### Développement Local

```bash
# Terminal 1 - Backend
cd myhealth-qr-backend
npm run dev

# Terminal 2 - Frontend
cd myhealth-qr-frontend
npm run dev
```

## 🚀 Déploiement

### Installation Vercel CLI

```bash
# Installation globale
npm install -g vercel

# Connexion
vercel login
```

### Déploiement Manuel

```bash
# Backend
cd myhealth-qr-backend
vercel --prod

# Frontend
cd myhealth-qr-frontend
vercel --prod
```

### Déploiement Automatique

```powershell
# Windows PowerShell
.\deploy.ps1 all            # Tout déployer
.\deploy.ps1 frontend       # Frontend uniquement
.\deploy.ps1 backend        # Backend uniquement
```

```bash
# Linux/Mac
chmod +x deploy.sh
./deploy.sh all             # Tout déployer
./deploy.sh frontend        # Frontend uniquement
./deploy.sh backend         # Backend uniquement
```

## 🔑 Génération de Secrets

```bash
# JWT_SECRET (64 bytes)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# QR_ENCRYPTION_KEY (16 bytes = 32 caractères hex)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

## 🌐 Vercel CLI - Commandes Utiles

### Gestion des Projets

```bash
# Lister les projets
vercel list

# Voir les déploiements
vercel ls

# Voir les détails d'un projet
vercel inspect [URL]

# Supprimer un déploiement
vercel remove [URL]

# Lier un projet local
vercel link
```

### Variables d'Environnement

```bash
# Lister les variables
vercel env ls

# Ajouter une variable
vercel env add

# Supprimer une variable
vercel env rm [nom]

# Pull les variables en local
vercel env pull
```

### Logs et Debugging

```bash
# Voir les logs en temps réel
vercel logs [URL]

# Voir les logs d'un déploiement spécifique
vercel logs [URL] --follow

# Voir les informations du projet
vercel project
```

### Domaines

```bash
# Lister les domaines
vercel domains ls

# Ajouter un domaine
vercel domains add [domaine]

# Supprimer un domaine
vercel domains rm [domaine]
```

## 🗄️ Base de Données

### Railway CLI (Optionnel)

```bash
# Installation
npm install -g @railway/cli

# Connexion
railway login

# Lier un projet
railway link

# Voir les logs
railway logs

# Variables d'environnement
railway variables

# Ouvrir le dashboard
railway open
```

### Connexion MySQL Directe

```bash
# Depuis la ligne de commande
mysql -h [host] -P [port] -u [user] -p[password] [database]

# Test de connexion
mysql -h containers-us-west-xxx.railway.app -P 3306 -u root -p railway
```

## 📊 Gestion de Git

### Commits et Push

```bash
# Status
git status

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "feat: add deployment configuration"

# Push
git push origin main

# Créer une nouvelle branche
git checkout -b feature/nom-de-la-feature

# Merger
git checkout main
git merge feature/nom-de-la-feature
```

### Tags pour Versioning

```bash
# Créer un tag
git tag -a v1.0.0 -m "Version 1.0.0"

# Lister les tags
git tag

# Push les tags
git push origin --tags
```

## 🔍 Debugging

### Tester l'API

```bash
# Test backend (local)
curl http://localhost:5000

# Test backend (production)
curl https://votre-backend.vercel.app

# Test avec détails
curl -v https://votre-backend.vercel.app/api/auth
```

### Vérifier le Build

```bash
# Backend
cd myhealth-qr-backend
npm start

# Frontend
cd myhealth-qr-frontend
npm run build
npm run preview
```

### Logs en Local

```bash
# Voir les logs Node.js
npm run dev

# Avec plus de détails
NODE_ENV=development npm run dev
```

## 🧪 Tests

```bash
# Backend tests (à configurer)
cd myhealth-qr-backend
npm test

# Frontend tests (à configurer)
cd myhealth-qr-frontend
npm test
```

## 📦 Gestion des Dépendances

### NPM

```bash
# Installer les dépendances
npm install

# Installer une nouvelle dépendance
npm install [package-name]

# Installer en dev dependency
npm install -D [package-name]

# Mettre à jour les dépendances
npm update

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# Vérifier les vulnérabilités
npm audit

# Corriger automatiquement
npm audit fix
```

### Versions

```bash
# Vérifier les versions outdated
npm outdated

# Mettre à jour un package spécifique
npm update [package-name]

# Installer une version spécifique
npm install [package-name]@[version]
```

## 🔐 Sécurité

### Vérifier les Secrets

```bash
# Vérifier que les .env ne sont pas commitées
git status

# Vérifier le .gitignore
cat .gitignore

# Scanner pour des secrets exposés (git-secrets)
git secrets --scan
```

### Audit de Sécurité

```bash
# Audit NPM
npm audit

# Audit détaillé
npm audit --json

# Fix automatique
npm audit fix

# Fix avec breaking changes
npm audit fix --force
```

## 📝 Documentation

### Générer JSDoc (Backend)

```bash
cd myhealth-qr-backend
npx jsdoc src/**/*.js -d docs
```

### Générer PropTypes Documentation (Frontend)

```bash
cd myhealth-qr-frontend
npx react-docgen src/components -o docs/components.json
```

## 🧹 Nettoyage

```bash
# Nettoyer les node_modules
rm -rf node_modules

# Nettoyer les builds
rm -rf dist build

# Nettoyer le cache npm
npm cache clean --force

# Nettoyer tout (Windows PowerShell)
Get-ChildItem -Path . -Include node_modules,dist,build -Recurse -Directory | Remove-Item -Recurse -Force

# Nettoyer tout (Linux/Mac)
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
find . -name "dist" -type d -prune -exec rm -rf '{}' +
```

## 🎯 Commandes Rapides

```bash
# Développement complet (2 terminaux)
# Terminal 1
cd myhealth-qr-backend && npm run dev

# Terminal 2
cd myhealth-qr-frontend && npm run dev

# Build complet
cd myhealth-qr-frontend && npm run build && npm run preview

# Déploiement complet
vercel --prod --cwd myhealth-qr-backend && vercel --prod --cwd myhealth-qr-frontend
```

## 🔄 Mise à Jour après Changements

```bash
# 1. Pull les derniers changements
git pull origin main

# 2. Réinstaller les dépendances
cd myhealth-qr-backend && npm install
cd ../myhealth-qr-frontend && npm install

# 3. Redéployer
vercel --prod
```

## 📊 Monitoring

### Vercel Analytics

```bash
# Voir les analytics
vercel analytics

# Ouvrir le dashboard
vercel open
```

### Logs de Production

```bash
# Suivre les logs en temps réel
vercel logs --follow

# Logs des dernières 24h
vercel logs --since 24h

# Logs avec filtre
vercel logs --filter "error"
```

## 🆘 Aide et Support

```bash
# Aide Vercel CLI
vercel --help

# Aide pour une commande spécifique
vercel [command] --help

# Version
vercel --version

# Documentation
vercel docs
```

---

## 📚 Références Rapides

| Commande | Description |
|----------|-------------|
| `npm install -g vercel` | Installer Vercel CLI |
| `vercel login` | Se connecter à Vercel |
| `vercel --prod` | Déployer en production |
| `vercel logs` | Voir les logs |
| `vercel env ls` | Lister les variables |
| `vercel domains ls` | Lister les domaines |
| `vercel list` | Lister les projets |
| `vercel open` | Ouvrir le dashboard |

---

**💡 Astuce** : Ajoutez des alias dans votre shell pour les commandes fréquentes :

```bash
# Dans .bashrc ou .zshrc (Linux/Mac)
alias vdeploy="vercel --prod"
alias vlogs="vercel logs --follow"
alias venv="vercel env ls"

# Dans PowerShell Profile (Windows)
function vdeploy { vercel --prod }
function vlogs { vercel logs --follow }
function venv { vercel env ls }
```
