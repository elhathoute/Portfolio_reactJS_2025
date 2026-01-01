# Script de récupération des posts LinkedIn

Ce script permet d'ajouter facilement vos posts LinkedIn à votre portfolio.

## 🚀 Utilisation

### Mode interactif (recommandé)
```bash
npm run blog:add
```
ou
```bash
node scripts/fetch-linkedin-posts.mjs
```

Le script vous demandera :
1. L'URL du post LinkedIn
2. Le titre en français (optionnel)
3. Le titre en anglais (optionnel)

### Ajouter un post depuis la ligne de commande
```bash
node scripts/fetch-linkedin-posts.mjs --url "https://www.linkedin.com/posts/..."
```

### Ajouter plusieurs posts depuis un fichier JSON
Créez un fichier `posts.json` :
```json
[
  "https://www.linkedin.com/posts/activity-1234567890",
  {
    "url": "https://www.linkedin.com/posts/activity-0987654321",
    "titleFr": "Mon article sur React",
    "titleEn": "My article about React"
  }
]
```

Puis exécutez :
```bash
node scripts/fetch-linkedin-posts.mjs --file posts.json
```

## 📝 Format des URLs LinkedIn

Le script accepte plusieurs formats d'URLs :
- URLs normales : `https://www.linkedin.com/posts/activity-1234567890`
- URLs d'embed : `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:...`
- URLs avec URN : `https://www.linkedin.com/feed/update/urn:li:activity:...`

Le script convertira automatiquement les URLs en format d'embed si nécessaire.

## 🔍 Comment obtenir l'URL d'un post LinkedIn

1. Ouvrez votre post LinkedIn dans un navigateur
2. Cliquez sur les trois points (...) en haut à droite du post
3. Sélectionnez "Copier le lien vers le post"
4. Collez l'URL dans le script

## ⚙️ Configuration

Vous pouvez définir des variables d'environnement (optionnel) :
- `LINKEDIN_CLIENT_ID` : Votre Client ID LinkedIn
- `LINKEDIN_CLIENT_SECRET` : Votre Client Secret (pour usage futur avec l'API)
- `LINKEDIN_PROFILE_URL` : URL de votre profil LinkedIn

## 📌 Notes

- Le script ajoute automatiquement les posts aux fichiers `fr.json` et `en.json`
- Les posts sont ajoutés avec un ID séquentiel (`post1`, `post2`, etc.)
- Si un post existe déjà (même URL), il ne sera pas dupliqué
- Les titres sont auto-générés si non fournis

## 🔄 Mise à jour automatique (futur)

Pour une récupération automatique via l'API LinkedIn, vous devrez :
1. Créer une application LinkedIn Developer
2. Obtenir les permissions nécessaires
3. Configurer OAuth 2.0
4. Utiliser les endpoints de l'API LinkedIn

**Note** : L'API LinkedIn a des limitations strictes pour récupérer les posts d'un utilisateur. Cette méthode manuelle est actuellement la plus fiable.

