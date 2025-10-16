import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send, Github, Linkedin, CheckCircle, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Format the message for WhatsApp
      const whatsappMessage = `*Nouveau message de contact*

*Nom:* ${formData.name}
*Email:* ${formData.email}
*Sujet:* ${formData.subject}

*Message:*
${formData.message}

---
Message envoyé depuis votre portfolio`;

      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${t('contact.info.whatsapp').replace(/\s/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: t('contact.info.email'),
      href: `mailto:${t('contact.info.email')}`,
      color: 'text-red-500'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: t('contact.info.phone'),
      href: `tel:${t('contact.info.phone').replace(/\s/g, '')}`,
      color: 'text-green-500'
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: t('contact.info.location'),
      color: 'text-blue-500'
    },
    {
      icon: Clock,
      label: t('contact.info.availability'),
      value: t('contact.info.availability'),
      color: 'text-purple-500'
    }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/abdelaziz-elhathout-191290208/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/elhathoutwobz',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/${t('contact.info.whatsapp').replace(/\s/g, '')}?text=${encodeURIComponent(t('contact.whatsapp.message'))}`,
      color: 'hover:text-green-600'
    }
  ];

  return (
    <section id="contact" className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t('contact.form.name')}
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre nom"
                  />
                  <Input
                    label={t('contact.form.email')}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>

                <Input
                  label={t('contact.form.subject')}
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Sujet de votre message"
                />

                <Textarea
                  label={t('contact.form.message')}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Votre message..."
                />

                {/* Submit Status */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center space-x-2 p-4 rounded-lg ${
                      submitStatus === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>
                      {submitStatus === 'success'
                        ? t('contact.form.success')
                        : t('contact.form.error')
                      }
                    </span>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
                >
                  <MessageCircle size={20} className="mr-2" />
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact Information */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Informations de contact
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${info.color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1">
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* Social Links */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Suivez-moi
              </h3>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
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
              </div>
            </Card>

            {/* WhatsApp Quick Contact */}
            <Card>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t('contact.whatsapp.title')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t('contact.info.whatsapp')}
                  </p>
                  <motion.a
                    href={`https://wa.me/${t('contact.info.whatsapp').replace(/\s/g, '')}?text=${encodeURIComponent(t('contact.whatsapp.message'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
                  >
                    <MessageCircle size={20} className="mr-2" />
                    {t('contact.whatsapp.send')}
                  </motion.a>
                </div>
              </div>
            </Card>

            {/* Response Time */}
            <Card>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t('contact.info.response')}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('contact.info.response')}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
