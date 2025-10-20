import { useTranslation } from 'react-i18next';

/**
 * Custom hook for getting translation data as objects
 * @param {string} key - Translation key
 * @returns {Object} Translated data as object
 */
export const useTranslationData = (key) => {
  const { t } = useTranslation();
  return t(key, { returnObjects: true });
};

/**
 * Custom hook for getting array of items from translations
 * @param {string} key - Translation key
 * @returns {Array} Array of translated items
 */
export const useTranslationArray = (key) => {
  const { t } = useTranslation();
  const data = t(key, { returnObjects: true });
  return Object.values(data);
};

/**
 * Custom hook for getting entries from translations
 * @param {string} key - Translation key
 * @returns {Array} Array of [key, value] pairs
 */
export const useTranslationEntries = (key) => {
  const { t } = useTranslation();
  const data = t(key, { returnObjects: true });
  return Object.entries(data);
};



