# 🚀 Configuration GitHub Actions pour Déploiement Automatique

## 📋 Prérequis

Pour activer le déploiement automatique via GitHub Actions, vous devez configurer des secrets dans votre repository GitHub.

## 🔑 Secrets à Ajouter dans GitHub

1. Allez dans votre repository GitHub
2. Cliquez sur **Settings** → **Secrets and variables** → **Actions**
3. Cliquez sur **New repository secret**

### Secrets Nécessaires

| Nom du Secret | Description | Comment l'obtenir |
|---------------|-------------|-------------------|
| `VERCEL_TOKEN` | Token d'accès Vercel | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | ID de votre organisation | Voir ci-dessous |
| `VERCEL_PROJECT_ID_BACKEND` | ID du projet backend | Voir ci-dessous |
| `VERCEL_PROJECT_ID_FRONTEND` | ID du projet frontend | Voir ci-dessous |
| `VITE_API_URL` | URL de l'API backend | `https://votre-backend.vercel.app/api` |
| `VITE_SOCKET_URL` | URL WebSocket backend | `https://votre-backend.vercel.app` |

## 🔍 Comment Obtenir les IDs Vercel

### Méthode 1 : Via Vercel CLI

```bash
# Installer Vercel CLI si ce n'est pas fait
npm install -g vercel

# Se connecter
vercel login

# Dans le dossier backend
cd myhealth-qr-backend
vercel link

# Les IDs seront dans .vercel/project.json
cat .vercel/project.json
# Copier "orgId" et "projectId"

# Dans le dossier frontend
cd ../myhealth-qr-frontend
vercel link

# Les IDs seront dans .vercel/project.json
cat .vercel/project.json
# Copier "projectId"
```

### Méthode 2 : Via Dashboard Vercel

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings**
4. L'**Org ID** et **Project ID** sont affichés

### Méthode 3 : Créer les Projets d'Abord

```bash
# Backend
cd myhealth-qr-backend
vercel --prod
# Noter l'URL et les IDs

# Frontend
cd ../myhealth-qr-frontend
vercel --prod
# Noter l'URL et les IDs
```

## 🔧 Configuration des Secrets

### 1. VERCEL_TOKEN

```bash
# Aller sur https://vercel.com/account/tokens
# Créer un nouveau token
# Copier le token
# L'ajouter comme secret GitHub : VERCEL_TOKEN
```

### 2. VERCEL_ORG_ID

```bash
# Obtenir via Vercel CLI
vercel whoami
# Ou regarder dans .vercel/project.json après vercel link
# Ajouter comme secret GitHub : VERCEL_ORG_ID
```

### 3. VERCEL_PROJECT_ID_BACKEND

```bash
cd myhealth-qr-backend
vercel link
cat .vercel/project.json
# Copier "projectId"
# Ajouter comme secret GitHub : VERCEL_PROJECT_ID_BACKEND
```

### 4. VERCEL_PROJECT_ID_FRONTEND

```bash
cd myhealth-qr-frontend
vercel link
cat .vercel/project.json
# Copier "projectId"
# Ajouter comme secret GitHub : VERCEL_PROJECT_ID_FRONTEND
```

### 5. VITE_API_URL et VITE_SOCKET_URL

```bash
# Après avoir déployé le backend, noter l'URL
# VITE_API_URL = https://votre-backend.vercel.app/api
# VITE_SOCKET_URL = https://votre-backend.vercel.app
```

## 📝 Exemple de Configuration

Dans GitHub → Settings → Secrets and variables → Actions :

```
VERCEL_TOKEN = IiOiJleGFtcGxlLWlkIi
VERCEL_ORG_ID = team_xxxxxxxxxxxxxxxxxx
VERCEL_PROJECT_ID_BACKEND = prj_xxxxxxxxxxxxxxxxxx
VERCEL_PROJECT_ID_FRONTEND = prj_xxxxxxxxxxxxxxxxxx
VITE_API_URL = https://myhealth-backend.vercel.app/api
VITE_SOCKET_URL = https://myhealth-backend.vercel.app
```

## 🚀 Fonctionnement

Une fois configuré :

1. **Push sur main** → Déploiement automatique en production
2. **Pull Request** → Déploiement de preview pour test
3. **Logs disponibles** → GitHub Actions → Onglet Actions

## ✅ Vérification

Pour tester la configuration :

```bash
# Faire un commit
git add .
git commit -m "test: trigger deployment"
git push origin main

# Aller sur GitHub → Actions
# Vérifier que le workflow se lance
```

## 🐛 Dépannage

### Erreur : "VERCEL_TOKEN not found"
```
Solution : Vérifier que le secret est bien ajouté dans GitHub
```

### Erreur : "Project not found"
```
Solution : Vérifier les PROJECT_ID
Solution : Lancer `vercel link` d'abord
```

### Build échoue
```
Solution : Tester le build localement
cd myhealth-qr-frontend
npm run build

cd ../myhealth-qr-backend
npm start
```

## 🔒 Sécurité

- ⚠️ Ne jamais commiter les fichiers `.vercel/` (déjà dans .gitignore)
- ⚠️ Ne jamais exposer VERCEL_TOKEN publiquement
- ✅ Utiliser uniquement les GitHub Secrets
- ✅ Limiter les permissions du token Vercel

## 🎯 Désactiver le Déploiement Automatique

Si vous préférez déployer manuellement :

1. Supprimez le fichier `.github/workflows/deploy.yml`
2. Ou désactivez le workflow dans GitHub → Actions → Settings

## 📚 Ressources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel GitHub Actions](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)

---

**⚠️ Note** : Le déploiement automatique est **optionnel**. Vous pouvez continuer à déployer manuellement avec `vercel --prod`.
