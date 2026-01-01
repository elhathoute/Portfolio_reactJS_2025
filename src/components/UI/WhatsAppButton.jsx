import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    const whatsappNumber = t('contact.info.whatsapp').replace(/\s/g, '');
    const message = encodeURIComponent(t('contact.whatsapp.message'));
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
      <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        {t('contact.whatsapp.send')}
      </span>
    </motion.button>
  );
};

export default WhatsAppButton;

