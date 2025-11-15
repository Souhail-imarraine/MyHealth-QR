# Script de Déploiement Automatique pour Vercel
# Usage: .\deploy.ps1 [frontend|backend|all]

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('frontend', 'backend', 'all')]
    [string]$Target = 'all'
)

Write-Host "🚀 MyHealth QR - Deployment Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

function Deploy-Frontend {
    Write-Host "📦 Déploiement du Frontend sur Vercel..." -ForegroundColor Yellow
    Write-Host ""
    
    Set-Location "myhealth-qr-frontend"
    
    # Vérifier si Vercel CLI est installé
    if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Vercel CLI n'est pas installé." -ForegroundColor Red
        Write-Host "📥 Installation de Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
    }
    
    # Vérifier les dépendances
    if (-not (Test-Path "node_modules")) {
        Write-Host "📥 Installation des dépendances..." -ForegroundColor Yellow
        npm install
    }
    
    # Build local pour tester
    Write-Host "🔨 Build du frontend..." -ForegroundColor Yellow
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Build réussi!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 Déploiement sur Vercel..." -ForegroundColor Yellow
        vercel --prod
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Frontend déployé avec succès!" -ForegroundColor Green
        } else {
            Write-Host "❌ Erreur lors du déploiement" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Erreur lors du build" -ForegroundColor Red
    }
    
    Set-Location ..
}

function Deploy-Backend {
    Write-Host "📦 Déploiement du Backend sur Vercel..." -ForegroundColor Yellow
    Write-Host ""
    
    Set-Location "myhealth-qr-backend"
    
    # Vérifier si Vercel CLI est installé
    if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Vercel CLI n'est pas installé." -ForegroundColor Red
        Write-Host "📥 Installation de Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
    }
    
    # Vérifier les dépendances
    if (-not (Test-Path "node_modules")) {
        Write-Host "📥 Installation des dépendances..." -ForegroundColor Yellow
        npm install
    }
    
    Write-Host "⚠️  IMPORTANT: Configurez les variables d'environnement sur Vercel Dashboard!" -ForegroundColor Yellow
    Write-Host "   - DB_HOST, DB_NAME, DB_USER, DB_PASSWORD" -ForegroundColor Gray
    Write-Host "   - JWT_SECRET, QR_ENCRYPTION_KEY" -ForegroundColor Gray
    Write-Host "   - FRONTEND_URL" -ForegroundColor Gray
    Write-Host ""
    
    $continue = Read-Host "Continuer le déploiement? (Y/N)"
    
    if ($continue -eq 'Y' -or $continue -eq 'y') {
        Write-Host "🚀 Déploiement sur Vercel..." -ForegroundColor Yellow
        vercel --prod
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Backend déployé avec succès!" -ForegroundColor Green
        } else {
            Write-Host "❌ Erreur lors du déploiement" -ForegroundColor Red
        }
    } else {
        Write-Host "⏸️  Déploiement annulé" -ForegroundColor Yellow
    }
    
    Set-Location ..
}

# Exécution selon la cible
switch ($Target) {
    'frontend' {
        Deploy-Frontend
    }
    'backend' {
        Deploy-Backend
    }
    'all' {
        Write-Host "📦 Déploiement complet (Frontend + Backend)" -ForegroundColor Cyan
        Write-Host ""
        Deploy-Backend
        Write-Host ""
        Write-Host "================================" -ForegroundColor Cyan
        Write-Host ""
        Deploy-Frontend
    }
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "🎉 Déploiement terminé!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Prochaines étapes:" -ForegroundColor Yellow
Write-Host "   1. Vérifiez les URLs des déploiements" -ForegroundColor Gray
Write-Host "   2. Mettez à jour FRONTEND_URL dans le backend" -ForegroundColor Gray
Write-Host "   3. Mettez à jour VITE_API_URL dans le frontend" -ForegroundColor Gray
Write-Host "   4. Testez l'application déployée" -ForegroundColor Gray
Write-Host ""
