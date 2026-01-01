#!/usr/bin/env node

/**
 * Script pour récupérer et formater les posts LinkedIn
 * 
 * Usage:
 *   node scripts/fetch-linkedin-posts.mjs
 * 
 * Ce script peut:
 * 1. Extraire les posts depuis des URLs LinkedIn
 * 2. Formater et ajouter les posts aux fichiers de traduction
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '78pasw3whs321h';
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || '';
const LINKEDIN_PROFILE_URL = process.env.LINKEDIN_PROFILE_URL || 'https://www.linkedin.com/in/abdelaziz-elhathout-191290208/';

const FR_LOCALE_PATH = path.join(__dirname, '../src/i18n/locales/fr.json');
const EN_LOCALE_PATH = path.join(__dirname, '../src/i18n/locales/en.json');

/**
 * Convertit une URL LinkedIn normale en URL d'embed
 */
function convertToEmbedUrl(url) {
  // Si c'est déjà une URL d'embed, la retourner telle quelle
  if (url.includes('linkedin.com/embed')) {
    return url;
  }

  // Extraire l'URN du post depuis l'URL
  // Format: https://www.linkedin.com/posts/activity-XXXXX ou https://www.linkedin.com/feed/update/urn:li:activity:XXXXX
  const urnMatch = url.match(/urn:li:[^"]+/);
  if (urnMatch) {
    return `https://www.linkedin.com/embed/feed/update/${urnMatch[0]}`;
  }

  // Essayer d'extraire depuis l'URL d'activité
  const activityMatch = url.match(/activity-(\d+)/);
  if (activityMatch) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityMatch[1]}`;
  }

  // Si on ne peut pas convertir, retourner l'URL originale
  console.warn(`⚠️  Impossible de convertir l'URL en embed: ${url}`);
  return url;
}

/**
 * Génère un titre à partir de l'URL ou d'un titre fourni
 */
function generateTitle(url, customTitle = null) {
  if (customTitle) {
    return customTitle;
  }

  // Extraire un identifiant de l'URL pour créer un titre par défaut
  const match = url.match(/urn:li:([^:]+):(\d+)/);
  if (match) {
    return `LinkedIn Post ${match[2].slice(-6)}`;
  }

  return 'LinkedIn Post';
}

/**
 * Lit et parse un fichier JSON
 */
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Erreur lors de la lecture de ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Écrit un fichier JSON
 */
function writeJsonFile(filePath, data) {
  try {
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, content + '\n', 'utf-8');
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de l'écriture de ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Ajoute un nouveau post aux fichiers de traduction
 */
function addPostToLocales(postUrl, titleFr = null, titleEn = null) {
  const embedUrl = convertToEmbedUrl(postUrl);
  const titleFR = titleFr || generateTitle(embedUrl);
  const titleEN = titleEn || titleFr || generateTitle(embedUrl);

  // Lire les fichiers de traduction
  const frData = readJsonFile(FR_LOCALE_PATH);
  const enData = readJsonFile(EN_LOCALE_PATH);

  if (!frData || !enData) {
    console.error('❌ Impossible de lire les fichiers de traduction');
    return false;
  }

  // Vérifier si le post existe déjà
  const existingPost = Object.entries(frData.blog.items).find(
    ([_, post]) => post.url === embedUrl
  );

  if (existingPost) {
    console.log(`ℹ️  Le post existe déjà: ${existingPost[0]}`);
    return false;
  }

  // Générer un nouvel ID pour le post
  const existingIds = Object.keys(frData.blog.items);
  const lastId = existingIds[existingIds.length - 1];
  const lastNumber = lastId ? parseInt(lastId.replace('post', '')) || 0 : 0;
  const newId = `post${lastNumber + 1}`;

  // Ajouter le post
  frData.blog.items[newId] = {
    title: titleFR,
    url: embedUrl
  };

  enData.blog.items[newId] = {
    title: titleEN,
    url: embedUrl
  };

  // Écrire les fichiers
  const frSuccess = writeJsonFile(FR_LOCALE_PATH, frData);
  const enSuccess = writeJsonFile(EN_LOCALE_PATH, enData);

  if (frSuccess && enSuccess) {
    console.log(`✅ Post ajouté avec succès: ${newId}`);
    console.log(`   Titre FR: ${titleFR}`);
    console.log(`   Titre EN: ${titleEN}`);
    console.log(`   URL: ${embedUrl}`);
    return true;
  }

  return false;
}

/**
 * Ajoute plusieurs posts depuis un tableau
 */
function addPostsFromArray(posts) {
  let successCount = 0;
  let failCount = 0;

  posts.forEach((post, index) => {
    console.log(`\n📝 Traitement du post ${index + 1}/${posts.length}...`);
    
    if (typeof post === 'string') {
      // Si c'est juste une URL
      if (addPostToLocales(post)) {
        successCount++;
      } else {
        failCount++;
      }
    } else if (post.url) {
      // Si c'est un objet avec url, titleFr, titleEn
      if (addPostToLocales(post.url, post.titleFr, post.titleEn)) {
        successCount++;
      } else {
        failCount++;
      }
    } else {
      console.warn(`⚠️  Format de post invalide à l'index ${index}`);
      failCount++;
    }
  });

  console.log(`\n📊 Résumé:`);
  console.log(`   ✅ ${successCount} post(s) ajouté(s)`);
  console.log(`   ❌ ${failCount} post(s) échoué(s)`);
}

/**
 * Mode interactif pour ajouter des posts manuellement
 */
async function interactiveMode() {
  console.log('\n📝 Mode interactif - Ajout de posts LinkedIn');
  console.log('Appuyez sur Ctrl+C pour quitter\n');

  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  try {
    while (true) {
      const url = await question('\n🔗 URL du post LinkedIn (ou "quit" pour quitter): ');
      
      if (url.toLowerCase() === 'quit' || url.toLowerCase() === 'q') {
        break;
      }

      if (!url.trim()) {
        console.log('⚠️  URL vide, ignoré');
        continue;
      }

      const titleFr = await question('📝 Titre (FR) [optionnel, appuyez sur Entrée pour auto-générer]: ');
      const titleEn = await question('📝 Title (EN) [optionnel, appuyez sur Entrée pour auto-générer]: ');

      addPostToLocales(
        url.trim(),
        titleFr.trim() || null,
        titleEn.trim() || null
      );
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    rl.close();
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Script de récupération des posts LinkedIn\n');

  // Vérifier les arguments de ligne de commande
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Mode interactif
    await interactiveMode();
  } else if (args[0] === '--url' || args[0] === '-u') {
    // Ajouter un post depuis l'URL fournie
    const url = args[1];
    if (!url) {
      console.error('❌ Veuillez fournir une URL');
      process.exit(1);
    }
    addPostToLocales(url);
  } else if (args[0] === '--file' || args[0] === '-f') {
    // Lire les posts depuis un fichier JSON
    const filePath = args[1];
    if (!filePath) {
      console.error('❌ Veuillez fournir un chemin de fichier');
      process.exit(1);
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const posts = JSON.parse(fileContent);
      
      if (Array.isArray(posts)) {
        addPostsFromArray(posts);
      } else {
        console.error('❌ Le fichier doit contenir un tableau de posts');
        process.exit(1);
      }
    } catch (error) {
      console.error(`❌ Erreur lors de la lecture du fichier: ${error.message}`);
      process.exit(1);
    }
  } else {
    console.log('Usage:');
    console.log('  node scripts/fetch-linkedin-posts.mjs                    # Mode interactif');
    console.log('  node scripts/fetch-linkedin-posts.mjs --url <URL>        # Ajouter un post depuis une URL');
    console.log('  node scripts/fetch-linkedin-posts.mjs --file <file.json>  # Ajouter plusieurs posts depuis un fichier');
    console.log('\nFormat du fichier JSON:');
    console.log('  [');
    console.log('    "https://linkedin.com/posts/...",');
    console.log('    { "url": "https://linkedin.com/posts/...", "titleFr": "Titre FR", "titleEn": "Title EN" }');
    console.log('  ]');
  }
}

// Exécuter le script
main().catch(console.error);

