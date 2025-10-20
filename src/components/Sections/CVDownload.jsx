import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

const CVDownload = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cvDownload.title', 'Télécharger le CV en français et en anglais')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('cvDownload.subtitle', 'CV professionnel optimisé pour l\'impression et le partage numérique')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* French CV View */}
            <motion.a
              href="/CV-Abdelaziz-Elhathout-FR.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                <FileText size={20} />
                <span>{t('cvDownload.viewFR', 'Voir CV en Français')}</span>
              </button>
            </motion.a>

            {/* English CV View */}
            <motion.a
              href="/CV-Abdelaziz-Elhathout-EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                <FileText size={20} />
                <span>{t('cvDownload.viewEN', 'View CV in English')}</span>
              </button>
            </motion.a>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('cvDownload.note', 'Format PDF optimisé • Compatible mobile et desktop')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CVDownload;
