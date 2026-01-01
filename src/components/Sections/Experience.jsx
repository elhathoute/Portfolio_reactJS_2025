import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, MapPin, Calendar, ExternalLink, Eye } from 'lucide-react';
import Card from '../UI/Card';

const Experience = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      id: 'decq-print',
      title: t('experience.items.decq-print.title'),
      company: t('experience.items.decq-print.company'),
      period: t('experience.items.decq-print.period'),
      location: t('experience.items.decq-print.location'),
      description: t('experience.items.decq-print.description'),
      website: 'https://decq.com/',
      current: true,
      type: 'work'
    },
    {
      id: 'wobz',
      title: t('experience.items.wobz.title'),
      company: t('experience.items.wobz.company'),
      period: t('experience.items.wobz.period'),
      location: t('experience.items.wobz.location'),
      description: t('experience.items.wobz.description'),
      website: 'https://wobz.com/',
      current: false,
      type: 'work'
    },
    {
      id: 'admdi',
      title: t('experience.items.admdi.title'),
      company: t('experience.items.admdi.company'),
      period: t('experience.items.admdi.period'),
      location: t('experience.items.admdi.location'),
      description: t('experience.items.admdi.description'),
      website: 'https://www.linkedin.com/company/admdi/about/',
      current: false,
      type: 'work'
    },
    {
      id: 'freelance',
      title: t('experience.items.freelance.title'),
      company: t('experience.items.freelance.company'),
      period: t('experience.items.freelance.period'),
      location: t('experience.items.freelance.location'),
      description: t('experience.items.freelance.description'),
      website: '#',
      current: false,
      type: 'work'
    }
  ];

  const education = [
    {
      id: 'uppa-miage',
      title: t('experience.education.items.uppa-miage.title'),
      school: t('experience.education.items.uppa-miage.school'),
      period: t('experience.education.items.uppa-miage.period'),
      location: t('experience.education.items.uppa-miage.location'),
      description: t('experience.education.items.uppa-miage.description'),
      type: 'education',
      current: true
    },
    {
      id: 'youcode',
      title: t('experience.education.items.youcode.title'),
      school: t('experience.education.items.youcode.school'),
      period: t('experience.education.items.youcode.period'),
      location: t('experience.education.items.youcode.location'),
      description: t('experience.education.items.youcode.description'),
      type: 'education'
    },
    {
      id: 'university',
      title: t('experience.education.items.university.title'),
      school: t('experience.education.items.university.school'),
      period: t('experience.education.items.university.period'),
      location: t('experience.education.items.university.location'),
      description: t('experience.education.items.university.description'),
      type: 'education'
    }
  ];

  // Récupérer toutes les certifications depuis les traductions
  const certificationsData = t('experience.certifications.items', { returnObjects: true });
  const certifications = Object.entries(certificationsData).map(([key, cert]) => ({
    id: key,
    title: cert.title,
    issuer: cert.issuer,
    date: cert.date,
    location: cert.location,
    description: cert.description,
    pdf: cert.pdf,
    type: 'certification'
  }));

  const ExperienceItem = ({ item, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <div className="flex items-start space-x-4">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            item.type === 'work' 
              ? 'bg-primary-100 dark:bg-primary-900/20' 
              : item.type === 'education'
              ? 'bg-green-100 dark:bg-green-900/20'
              : 'bg-purple-100 dark:bg-purple-900/20'
          }`}>
            {item.type === 'work' && <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
            {item.type === 'education' && <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />}
            {item.type === 'certification' && <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
          </div>
          {index < experiences.length - 1 && (
            <div className="w-0.5 h-16 bg-gray-200 dark:bg-gray-700 mt-4"></div>
          )}
        </div>

        {/* Content */}
        <Card className="flex-1">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium">
                  <span>{item.company || item.school || item.issuer}</span>
                  {item.website && item.website !== '#' && (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              {item.current && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                  {t('experience.current')}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{item.period || item.date}</span>
              </div>
              {item.location && (
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{item.location}</span>
                </div>
              )}
            </div>

            {item.description && (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  );

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Work Experience */}
          <div className="lg:col-span-2">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
            >
              <Briefcase className="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
              Expérience professionnelle
            </motion.h3>
            <div className="space-y-8">
              {[...experiences].reverse().map((experience, index) => (
                <ExperienceItem key={experience.id} item={experience} index={index} />
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-12">
            {/* Education */}
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
              >
                <GraduationCap className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                {t('experience.education.title')}
              </motion.h3>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white">
                              {edu.title}
                            </h4>
                            <p className="text-primary-600 dark:text-primary-400 font-medium">
                              {edu.school}
                            </p>
                          </div>
                          {edu.current && (
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                              {t('experience.current')}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{edu.period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
              >
                <Award className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
                {t('experience.certifications.title')}
              </motion.h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {cert.title}
                            </h4>
                            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                              {cert.issuer}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                            {cert.date}
                          </span>
                        </div>
                        
                        {cert.location && (
                          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin size={14} />
                            <span>{cert.location}</span>
                          </div>
                        )}
                        
                        {cert.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {cert.description}
                          </p>
                        )}
                        
                        {cert.pdf && (
                          <div className="pt-2">
                            <a
                              href={cert.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                            >
                              <Eye size={14} />
                              <span>Voir le certificat</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
