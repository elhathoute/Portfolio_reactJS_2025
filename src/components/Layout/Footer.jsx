import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/elhathoutwobz',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/abdelaziz-elhathout-191290208/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:abdelaazizeelhathoute.2018@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2"
            >
              <img 
                src="/assets/img/clients/brain-tech-logo.jpeg" 
                alt="BrainTech" 
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-primary-200 dark:border-primary-700"
              />
              <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                BrainTech
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400"
            >
              {t('hero.description')}
            </motion.p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Liens rapides
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              {['home', 'about', 'projects', 'experience', 'clients', 'recommendations', 'blog', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="block text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {t(`nav.${item}`)}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              Suivez-moi
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 shadow-md hover:shadow-lg transition-all duration-200 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} BrainTech. {t('footer.rights')}
            </p>
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm">
              <span>{t('footer.madeWith')}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={16} className="text-red-500" />
              </motion.div>
              <span>{t('footer.by')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
