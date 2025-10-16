# 🚀 Guide de Configuration du Déploiement

## 📋 Options de Déploiement

### Option 1: GitHub Pages (Recommandé pour commencer)

1. **Activer GitHub Pages** :
   - Allez sur votre repository GitHub
   - Settings → Pages
   - Source: "GitHub Actions"
   - Sauvegardez

2. **Le workflow se déclenchera automatiquement** à chaque push sur `main`

3. **Votre site sera disponible sur** :
   - `https://elhathoute.github.io/Portfolio_reactJS_2025/`

### Option 2: Hostinger via FTP (Pour votre domaine personnalisé)

1. **Configurer les secrets GitHub** :
   - Allez sur votre repository GitHub
   - Settings → Secrets and variables → Actions
   - Ajoutez ces secrets :
     ```
     FTP_SERVER: votre-serveur-ftp.hostinger.com
     FTP_USERNAME: votre-nom-utilisateur
     FTP_PASSWORD: votre-mot-de-passe
     ```

2. **Activer le workflow FTP** :
   - Renommez `deploy-hostinger.yml` en `deploy.yml`
   - Renommez l'ancien `deploy.yml` en `deploy-github-pages.yml`

3. **Votre site sera déployé sur** :
   - `https://linen-hawk-608890.hostingersite.com`

## 🔧 Résolution des Problèmes

### Erreur de Permissions GitHub Actions

Si vous voyez l'erreur "Permission denied to github-actions[bot]" :

1. **Vérifiez les permissions du repository** :
   - Settings → Actions → General
   - "Workflow permissions" → "Read and write permissions"
   - Cochez "Allow GitHub Actions to create and approve pull requests"

2. **Ou utilisez le déploiement FTP** (Option 2 ci-dessus)

### Erreur de Build

Si le build échoue :

1. **Vérifiez Node.js version** :
   ```bash
   node --version  # Doit être 18+ localement
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   npm run build
   ```

## 📁 Structure des Fichiers de Déploiement

```
.github/workflows/
├── deploy.yml              # GitHub Pages (par défaut)
├── deploy-hostinger.yml    # Hostinger FTP (optionnel)
└── deploy-github-pages.yml # Backup GitHub Pages

public/
├── .htaccess              # Configuration Apache
├── CNAME                  # Domaine personnalisé
└── assets/               # Assets statiques
```

## 🎯 Prochaines Étapes

1. **Testez le déploiement GitHub Pages** (Option 1)
2. **Configurez votre domaine personnalisé** si nécessaire
3. **Activez le déploiement FTP** pour Hostinger (Option 2)
4. **Vérifiez que tout fonctionne** sur votre site

## 📞 Support

Si vous rencontrez des problèmes :
- Vérifiez les logs dans l'onglet "Actions" de GitHub
- Consultez la documentation GitHub Actions
- Testez le build localement avec `npm run build`
