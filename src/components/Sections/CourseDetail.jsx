import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar,
  Star,
  BookOpen,
  Code,
  Database,
  Cloud,
  Layers,
  Container,
  Globe,
  ChevronRight,
  Play,
  Download,
  Share2,
  Heart
} from 'lucide-react';
import Card from '../UI/Card';
import { fadeInUp, scaleIn } from '../constants/animations';

const CourseDetail = ({ course, onBack }) => {
  // Icônes pour les catégories
  const categoryIcons = {
    'PHP/Laravel': Code,
    'Symfony': Database,
    'Vue.js': Globe,
    'Architecture Hexagonale': Layers,
    'DDD': Star,
    'Docker': Container,
    'Full Stack': Cloud,
    'Backend': Database,
    'Frontend': Globe,
    'API': Code,
    'Testing': BookOpen,
    'DevOps': Container,
    'Architecture': Layers
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Avancé': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Cours non trouvé
          </h1>
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Retour aux cours</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header avec navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span>Retour aux cours</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                <Heart size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* En-tête du cours */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.1 }}
            >
              <Card className="p-8">
                <div className="space-y-6">
                  {/* Image et niveau */}
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg flex items-center justify-center">
                      {(() => {
                        const CategoryIcon = categoryIcons[course.categories[0]] || BookOpen;
                        return <CategoryIcon className="w-24 h-24 text-primary-600 dark:text-primary-400" />;
                      })()}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Titre et métadonnées */}
                  <div className="space-y-4">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                      {course.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-2">
                      {course.categories.map((category, index) => {
                        const Icon = categoryIcons[category] || BookOpen;
                        return (
                          <span
                            key={index}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            <Icon size={14} />
                            <span>{category}</span>
                          </span>
                        );
                      })}
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contenu du cours */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
            >
              <Card className="p-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    À propos de ce cours
                  </h2>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                      {course.content || `Ce cours vous permettra de maîtriser ${course.title.toLowerCase()}. 
                      Vous apprendrez les concepts fondamentaux et les bonnes pratiques pour créer des applications 
                      robustes et maintenables.`}
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">
                      Ce que vous apprendrez :
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                        <span>Comprendre les concepts fondamentaux</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                        <span>Mettre en pratique avec des exemples concrets</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                        <span>Appliquer les bonnes pratiques</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                        <span>Résoudre les problèmes courants</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations du cours */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Informations du cours
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Durée</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Étudiants</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.students.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Date</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(course.date)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Note</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="space-y-4">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Play size={20} />
                    <span>Commencer le cours</span>
                  </button>
                  
                  <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Download size={20} />
                    <span>Télécharger les ressources</span>
                  </button>
                </div>
              </Card>
            </motion.div>

            {/* Auteur */}
            <motion.div
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.5 }}
            >
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    À propos de l'auteur
                  </h3>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {course.author}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Développeur Full Stack
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Expert en développement web avec plus de 5 ans d'expérience dans les technologies 
                    modernes et les architectures avancées.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
