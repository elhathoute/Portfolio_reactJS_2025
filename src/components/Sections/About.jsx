import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Cloud, Users, Lightbulb, Target, Zap } from 'lucide-react';
import Card from '../UI/Card';

const About = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('about.skills.frontend.title'),
      icon: Palette,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      skills: t('about.skills.frontend.items', { returnObjects: true })
    },
    {
      title: t('about.skills.backend.title'),
      icon: Database,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      skills: t('about.skills.backend.items', { returnObjects: true })
    },
    {
      title: t('about.skills.devops.title'),
      icon: Cloud,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      skills: t('about.skills.devops.items', { returnObjects: true })
    }
  ];

  const softSkills = [
    { name: t('about.softSkills.items.0'), icon: Users },
    { name: t('about.softSkills.items.1'), icon: Lightbulb },
    { name: t('about.softSkills.items.2'), icon: Target },
    { name: t('about.softSkills.items.3'), icon: Zap },
    { name: t('about.softSkills.items.4'), icon: Code },
    { name: t('about.softSkills.items.5'), icon: Users },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="h-full">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src="/logo.jpeg" 
                    alt="AbdelazizElh Elhathout" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-200 dark:border-primary-700"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      AbdelazizElh Elhathout
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {t('hero.title')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>{t('about.bio.p1')}</p>
                  <p>{t('about.bio.p2')}</p>
                  <p>{t('about.bio.p3')}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.skills.title')}
            </h3>

            {/* Technical Skills */}
            <div className="space-y-6">
              {skillCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-3 rounded-lg ${category.bgColor}`}>
                          <Icon className={`w-6 h-6 ${category.color}`} />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {category.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: skillIndex * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('about.softSkills.title')}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {softSkills.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
