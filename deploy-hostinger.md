# 🚀 Guide de Déploiement sur Hostinger

## Méthode 1 : Déploiement Automatique via GitHub Actions

### Étapes :

1. **Pousser le code sur GitHub** :
   ```bash
   git add .
   git commit -m "Configure deployment for Hostinger"
   git push origin main
   ```

2. **Le déploiement se fait automatiquement** via GitHub Actions

3. **Votre site sera disponible sur** : `https://linen-hawk-608890.hostingersite.com`

## Méthode 2 : Déploiement Manuel sur Hostinger

### Étapes :

1. **Build du projet localement** :
   ```bash
   npm run build
   ```

2. **Se connecter à Hostinger** :
   - Aller sur https://hpanel.hostinger.com
   - Se connecter à votre compte

3. **Accéder au File Manager** :
   - Cliquer sur "File Manager"
   - Naviguer vers le dossier `public_html`

4. **Uploader les fichiers** :
   - Supprimer tous les fichiers existants dans `public_html`
   - Uploader tout le contenu du dossier `dist/` (généré par `npm run build`)
   - Uploader aussi le fichier `.htaccess` dans `public_html`

5. **Vérifier la structure** :
   ```
   public_html/
   ├── index.html
   ├── assets/
   │   ├── css/
   │   ├── js/
   │   └── images/
   ├── .htaccess
   └── CNAME
   ```

## Configuration Hostinger

### 1. **Paramètres DNS** (si vous avez un domaine personnalisé) :
- A Record : `@` → `IP de Hostinger`
- CNAME : `www` → `linen-hawk-608890.hostingersite.com`

### 2. **SSL/HTTPS** :
- Activer le certificat SSL gratuit dans Hostinger
- Forcer HTTPS dans les paramètres

### 3. **Optimisations** :
- Activer la compression Gzip
- Configurer le cache des fichiers statiques
- Optimiser les images

## Vérification du Déploiement

1. **Tester l'URL** : `https://linen-hawk-608890.hostingersite.com`
2. **Vérifier les fonctionnalités** :
   - Navigation entre sections
   - Changement de langue
   - Mode sombre/clair
   - Formulaire de contact WhatsApp
   - Carousels (clients, recommandations, blog)

## Dépannage

### Problèmes courants :

1. **404 sur les routes** :
   - Vérifier que `.htaccess` est bien uploadé
   - S'assurer que mod_rewrite est activé

2. **Assets non chargés** :
   - Vérifier les chemins dans `vite.config.js`
   - S'assurer que tous les fichiers sont dans `public_html`

3. **Problèmes de cache** :
   - Vider le cache du navigateur
   - Vérifier les headers de cache dans `.htaccess`

## Support

- **Documentation Hostinger** : https://support.hostinger.com
- **GitHub Actions** : https://docs.github.com/en/actions
- **Vite Deployment** : https://vitejs.dev/guide/static-deploy.html
