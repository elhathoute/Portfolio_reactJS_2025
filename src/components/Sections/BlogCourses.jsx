import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  Calendar,
  BookOpen,
  Code,
  Database,
  Cloud,
  Layers,
  Container,
  Globe,
  Star,
  ChevronDown
} from 'lucide-react';
import Card from '../UI/Card';
import { fadeInUp, scaleIn, hoverScale } from '../constants/animations';

const BlogCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Données exemple des cours
  const coursesData = [
    {
      id: 1,
      title: "Introduction à Laravel",
      categories: ["PHP/Laravel", "Backend"],
      description: "Découvrez les bases du framework Laravel pour créer des applications web robustes et élégantes.",
      image: "laravel-icon.svg",
      date: "2024-01-15",
      level: "Débutant",
      duration: "2h",
      content: "Contenu complet du cours...",
      author: "Abdelaziz Elhathout",
      rating: 4.8,
      students: 1250
    },
    {
      id: 2,
      title: "Architecture Hexagonale avec Symfony",
      categories: ["Symfony", "Architecture Hexagonale", "DDD"],
      description: "Apprenez à implémenter l'architecture hexagonale dans vos projets Symfony pour une meilleure maintenabilité.",
      image: "symfony-icon.svg",
      date: "2024-01-20",
      level: "Avancé",
      duration: "4h",
      content: "Contenu complet du cours...",
      author: "Abdelaziz Elhathout",
      rating: 4.9,
      students: 890
    },
    {
      id: 3,
      title: "Vue.js 3 - Composition API",
      categories: ["Vue.js", "Frontend"],
      description: "Maîtrisez la Composition API de Vue.js 3 pour créer des interfaces utilisateur réactives et performantes.",
      image: "vue-icon.svg",
      date: "2024-01-25",
      level: "Intermédiaire",
      duration: "3h",
      content: "Contenu complet du cours...",
      author: "Abdelaziz Elhathout",
      rating: 4.7,
      students: 2100
    },
    {
      id: 4,
      title: "Docker pour le Développement",
      categories: ["Docker", "DevOps", "Full Stack"],
      description: "Containerisez vos applications avec Docker pour un déploiement cohérent et scalable.",
      image: "docker-icon.svg",
      date: "2024-02-01",
      level: "Intermédiaire",
      duration: "2.5h",
      content: "Contenu complet du cours...",
      author: "Abdelaziz Elhathout",
      rating: 4.6,
      students: 1680
    },
    {
      id: 5,
      title: "Domain Driven Design (DDD)",
      categories: ["DDD", "Architecture", "Backend"],
      description: "Comprenez et appliquez les principes du Domain Driven Design pour des architectures métier solides.",
      image: "ddd-icon.svg",
      date: "2024-02-05",
      level: "Avancé",
      duration: "5h",
      content: "Contenu complet du cours...",
      author: "Abdelaziz Elhathout",
      rating: 4.9,
      students: 750
    },
    {
      id: 6,
      title: "Full Stack avec Laravel + Vue.js",
      categories: ["Full Stack", "PHP/Laravel", "Vue.js"],
      description: "Créez une application complète en utilisant Laravel comme API et Vue.js comme frontend.",
      image: "fullstack-icon.svg",
      date: "2024-02-10",
      level: "Intermédiaire",
      duration: "6h",
      content: "Contenu complet du cours...",
      author: "Abdelaziz Elhathout",
      rating: 4.8,
      students: 3200
    },
    {
      id: 7,
      title: "API REST avec Symfony",
      categories: ["Symfony", "Backend", "API"],
      description: "Développez des APIs REST robustes avec Symfony et les bonnes pratiques de sécurité.",
      image: "api-icon.svg",
      date: "2024-02-15",
      level: "Intermédiaire",
      duration: "3.5h",
      content: "Contenu complet du cours...",
      author: "Abdelaziz Elhathout",
      rating: 4.7,
      students: 1450
    },
    {
      id: 8,
      title: "Tests Unitaires et Intégration",
      categories: ["Testing", "PHP/Laravel", "Symfony"],
      description: "Apprenez à écrire des tests efficaces pour vos applications PHP avec PHPUnit.",
      image: "testing-icon.svg",
      date: "2024-02-20",
      level: "Intermédiaire",
      duration: "4h",
      content: "Contenu complet du cours...",
      author: "Abdelaziz Elhathout",
      rating: 4.6,
      students: 980
    }
  ];

  // Catégories disponibles
  const categories = [
    'Tous',
    'PHP/Laravel',
    'Symfony',
    'Vue.js',
    'Architecture Hexagonale',
    'DDD',
    'Docker',
    'Full Stack'
  ];

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

  // Filtrage et recherche
  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Tous' || 
                             course.categories.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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

  return (
    <section id="blog-courses" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog & Cours Full Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez mes cours et articles sur le développement Full Stack, 
            de Laravel à Vue.js en passant par l'architecture hexagonale.
          </p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto">
            {/* Barre de recherche */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un cours ou un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                aria-label="Rechercher un cours ou un article"
              />
            </div>

            {/* Filtres par catégorie */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filtrer par catégorie:
                </span>
              </div>
              
              {/* Filtres desktop */}
              <div className="hidden lg:flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = categoryIcons[category] || BookOpen;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                      }`}
                      aria-pressed={selectedCategory === category}
                    >
                      <Icon size={16} />
                      <span>{category}</span>
                    </button>
                  );
                })}
              </div>

              {/* Filtres mobile */}
              <div className="lg:hidden">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  <Filter size={16} />
                  <span>Filtres</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Filtres mobile déroulants */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden mt-4"
                >
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const Icon = categoryIcons[category] || BookOpen;
                      return (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowFilters(false);
                          }}
                          className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedCategory === category
                              ? 'bg-primary-600 text-white shadow-lg'
                              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                          }`}
                          aria-pressed={selectedCategory === category}
                        >
                          <Icon size={14} />
                          <span>{category}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Résultats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              {filteredCourses.length} cours trouvé{filteredCourses.length > 1 ? 's' : ''}
              {searchTerm && ` pour "${searchTerm}"`}
              {selectedCategory !== 'Tous' && ` dans "${selectedCategory}"`}
            </p>
          </div>
        </motion.div>

        {/* Grille de cours */}
        <AnimatePresence mode="wait">
          {filteredCourses.length > 0 ? (
            <motion.div
              key="courses-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCourses.map((course) => {
                const CategoryIcon = categoryIcons[course.categories[0]] || BookOpen;
                
                return (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    layout
                    whileHover={{ ...hoverScale.whileHover }}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300">
                      <div className="space-y-4">
                        {/* Image et catégorie */}
                        <div className="relative">
                          <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-16 h-16 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="absolute top-3 left-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                              {course.level}
                            </span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <div className="flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {course.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Contenu */}
                        <div className="space-y-3">
                          {/* Titre */}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                            {course.title}
                          </h3>

                          {/* Catégories */}
                          <div className="flex flex-wrap gap-2">
                            {course.categories.map((category, index) => {
                              const Icon = categoryIcons[category] || BookOpen;
                              return (
                                <span
                                  key={index}
                                  className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                                >
                                  <Icon size={12} />
                                  <span>{category}</span>
                                </span>
                              );
                            })}
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                            {course.description}
                          </p>

                          {/* Métadonnées */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <Calendar size={14} />
                                <span>{formatDate(course.date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock size={14} />
                                <span>{course.duration}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <User size={14} />
                                <span>{course.students} étudiants</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <BookOpen size={14} />
                                <span>Par {course.author}</span>
                              </div>
                            </div>
                          </div>

                          {/* Bouton d'action */}
                          <button 
                            onClick={() => navigate(`/course/${course.id}`)}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 group-hover:shadow-lg"
                          >
                            Voir le cours
                          </button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Aucun cours trouvé
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm 
                    ? `Aucun cours ne correspond à "${searchTerm}"`
                    : `Aucun cours disponible dans la catégorie "${selectedCategory}"`
                  }
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('Tous');
                    }}
                    className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    <Search size={16} />
                    <span>Voir tous les cours</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BlogCourses;
