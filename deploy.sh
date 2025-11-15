#!/bin/bash
# Script de Déploiement Automatique pour Vercel (Linux/Mac)
# Usage: ./deploy.sh [frontend|backend|all]

TARGET=${1:-all}

echo "🚀 MyHealth QR - Deployment Script"
echo "====================================="
echo ""

deploy_frontend() {
    echo "📦 Déploiement du Frontend sur Vercel..."
    echo ""
    
    cd myhealth-qr-frontend
    
    # Vérifier si Vercel CLI est installé
    if ! command -v vercel &> /dev/null; then
        echo "❌ Vercel CLI n'est pas installé."
        echo "📥 Installation de Vercel CLI..."
        npm install -g vercel
    fi
    
    # Vérifier les dépendances
    if [ ! -d "node_modules" ]; then
        echo "📥 Installation des dépendances..."
        npm install
    fi
    
    # Build local pour tester
    echo "🔨 Build du frontend..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build réussi!"
        echo ""
        echo "🚀 Déploiement sur Vercel..."
        vercel --prod
        
        if [ $? -eq 0 ]; then
            echo "✅ Frontend déployé avec succès!"
        else
            echo "❌ Erreur lors du déploiement"
        fi
    else
        echo "❌ Erreur lors du build"
    fi
    
    cd ..
}

deploy_backend() {
    echo "📦 Déploiement du Backend sur Vercel..."
    echo ""
    
    cd myhealth-qr-backend
    
    # Vérifier si Vercel CLI est installé
    if ! command -v vercel &> /dev/null; then
        echo "❌ Vercel CLI n'est pas installé."
        echo "📥 Installation de Vercel CLI..."
        npm install -g vercel
    fi
    
    # Vérifier les dépendances
    if [ ! -d "node_modules" ]; then
        echo "📥 Installation des dépendances..."
        npm install
    fi
    
    echo "⚠️  IMPORTANT: Configurez les variables d'environnement sur Vercel Dashboard!"
    echo "   - DB_HOST, DB_NAME, DB_USER, DB_PASSWORD"
    echo "   - JWT_SECRET, QR_ENCRYPTION_KEY"
    echo "   - FRONTEND_URL"
    echo ""
    
    read -p "Continuer le déploiement? (Y/N): " continue
    
    if [ "$continue" = "Y" ] || [ "$continue" = "y" ]; then
        echo "🚀 Déploiement sur Vercel..."
        vercel --prod
        
        if [ $? -eq 0 ]; then
            echo "✅ Backend déployé avec succès!"
        else
            echo "❌ Erreur lors du déploiement"
        fi
    else
        echo "⏸️  Déploiement annulé"
    fi
    
    cd ..
}

# Exécution selon la cible
case $TARGET in
    frontend)
        deploy_frontend
        ;;
    backend)
        deploy_backend
        ;;
    all)
        echo "📦 Déploiement complet (Frontend + Backend)"
        echo ""
        deploy_backend
        echo ""
        echo "================================"
        echo ""
        deploy_frontend
        ;;
    *)
        echo "❌ Cible invalide. Utilisez: frontend, backend, ou all"
        exit 1
        ;;
esac

echo ""
echo "====================================="
echo "🎉 Déploiement terminé!"
echo ""
echo "📝 Prochaines étapes:"
echo "   1. Vérifiez les URLs des déploiements"
echo "   2. Mettez à jour FRONTEND_URL dans le backend"
echo "   3. Mettez à jour VITE_API_URL dans le frontend"
echo "   4. Testez l'application déployée"
echo ""
