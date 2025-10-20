import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Eye, Tag, Download, FileText } from 'lucide-react';
import Card from '../UI/Card';
import Button from '../UI/Button';

const Projects = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Récupérer tous les projets depuis les traductions
  const projectsData = t('projects.items', { returnObjects: true });
  const projects = Object.entries(projectsData).map(([key, project]) => ({
    id: key,
    title: project.title,
    description: project.description,
    technologies: project.technologies || [],
    category: project.category?.toLowerCase() || 'other',
    period: project.period,
    details: project.details,
    github: project.github,
    demo: project.demo,
    image: project.image,
    status: project.status,
    downloads: project.downloads,
    featured: key === 'decq' || key === 'wobz' // Marquer les projets récents comme vedettes
  }));

  const categories = [
    { key: 'all', label: 'Tous' },
    { key: 'full-stack development', label: 'Full-Stack' },
    { key: 'web development', label: 'Web Development' },
    { key: 'data science', label: 'Data Science' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t('projects.subtitle')}
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <Card className="h-full overflow-hidden group">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <Tag className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Projet vedette
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      {project.period && (
                        <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
                          {project.period}
                          {project.status && (
                            <span className="ml-2 px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-full text-xs">
                              {project.status}
                            </span>
                          )}
                        </p>
                      )}
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4">
                      {project.downloads ? (
                        // CV Downloads
                        <div className="flex space-x-2 w-full">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(project.downloads.fr, '_blank')}
                            className="flex-1"
                          >
                            <FileText size={16} className="mr-2" />
                            CV FR
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => window.open(project.downloads.en, '_blank')}
                            className="flex-1"
                          >
                            <Download size={16} className="mr-2" />
                            CV EN
                          </Button>
                        </div>
                      ) : (
                        // Regular project actions
                        <>
                          {project.github && project.github !== '#' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(project.github, '_blank')}
                              className="flex-1"
                            >
                              <Github size={16} className="mr-2" />
                              {t('projects.viewCode')}
                            </Button>
                          )}
                          {project.demo && project.demo !== '#' && (
                            <Button
                              size="sm"
                              onClick={() => window.open(project.demo, '_blank')}
                              className="flex-1"
                            >
                              <ExternalLink size={16} className="mr-2" />
                              {t('projects.liveDemo')}
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('https://github.com/elhathoutwobz', '_blank')}
          >
            <Github size={20} className="mr-2" />
            {t('projects.viewAll')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
