'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Smartphone, Server, Zap, Palette, Settings, Loader2 } from 'lucide-react';
import { fetchSkills } from '@/lib/api';

// Default skill categories with icons and colors
const defaultCategories = [
  {
    id: 'libraries',
    title: 'Libraries',
    icon: Code,
    color: 'neon-cyan',
  },
  {
    id: 'database',
    title: 'Database',
    icon: Database,
    color: 'neon-purple',
  },
  {
    id: 'languages',
    title: 'Languages',
    icon: Server,
    color: 'neon-pink',
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('libraries');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch skills from API
  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const data = await fetchSkills();
        
        // Transform API data to match component structure
        const transformedSkills = data.map((category, index) => {
          const defaultCategory = defaultCategories[index] || defaultCategories[0];
          
          return {
            id: category.title.toLowerCase(),
            title: category.title,
            icon: defaultCategory.icon,
            color: defaultCategory.color,
            skills: category.skillSet.map(skill => ({
              name: skill,
              level: Math.floor(Math.random() * 20) + 80, // Random level between 80-100
              description: getSkillDescription(skill)
            }))
          };
        });
        
        setSkillCategories(transformedSkills);
        if (transformedSkills.length > 0) {
          setActiveCategory(transformedSkills[0].id);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  // Helper function to generate skill descriptions
  const getSkillDescription = (skillName) => {
    const descriptions = {
      'React.Js': 'Building dynamic user interfaces',
      'Next.Js': 'Full-stack React framework',
      'Express.Js': 'Web application framework',
      'MongoDB': 'NoSQL database management',
      'SQL*Plus': 'Oracle database queries',
      'C++': 'System programming language',
      'Python': 'Versatile programming language',
      'Java': 'Object-oriented programming'
    };
    return descriptions[skillName] || 'Professional expertise';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const getColorClass = (color, type = 'text') => {
    const colors = {
      'neon-cyan': type === 'text' ? 'text-neon-cyan' : 'from-neon-cyan/20 to-neon-cyan/40',
      'neon-purple': type === 'text' ? 'text-neon-purple' : 'from-neon-purple/20 to-neon-purple/40',
      'neon-pink': type === 'text' ? 'text-neon-pink' : 'from-neon-pink/20 to-neon-pink/40',
      'neon-green': type === 'text' ? 'text-neon-green' : 'from-neon-green/20 to-neon-green/40',
    };
    return colors[color] || colors['neon-cyan'];
  };

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)?.skills || [];
  const activeCategoryData = skillCategories.find(cat => cat.id === activeCategory);

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="gradient-text">Skills & Expertise</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Core technical skills for building robust, scalable backend systems
          </motion.p>
        </motion.div>

        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hoverable ${
                  isActive
                    ? `bg-gradient-to-r ${getColorClass(category.color, 'gradient')} border border-white/20 text-white shadow-lg`
                    : 'bg-dark-800/50 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon size={20} />
                <span className="hidden sm:block">{category.title}</span>
                <span className="sm:hidden">{category.title.split(' ')[0]}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Loader2 className="w-12 h-12 animate-spin text-neon-cyan mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Loading Skills...</h3>
            <p className="text-gray-400">Fetching skills data from the server</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Error Loading Skills</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neon-cyan text-dark-950 rounded-lg font-semibold hover:bg-neon-cyan/90 transition-colors duration-300"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Skills Display */}
        {!loading && !error && (
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
          {activeSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="group relative p-6 rounded-xl glass hover:bg-dark-800/70 transition-all duration-300 overflow-hidden hoverable"
            >
              {/* Background glow effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${getColorClass(activeCategoryData?.color, 'gradient')} blur-xl`}
              />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold mb-1 ${getColorClass(activeCategoryData?.color)}`}>
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-400">{skill.description}</p>
                  </div>
                  <span className={`text-lg font-mono font-bold ${getColorClass(activeCategoryData?.color)}`}>
                    {skill.level}%
                  </span>
                </div>

                {/* Skill Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${
                        activeCategoryData?.color === 'neon-cyan' ? 'from-neon-cyan to-blue-400' :
                        activeCategoryData?.color === 'neon-purple' ? 'from-neon-purple to-purple-400' :
                        activeCategoryData?.color === 'neon-pink' ? 'from-neon-pink to-pink-400' :
                        'from-neon-green to-green-400'
                      } relative`}
                    >
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                    </motion.div>
                  </div>
                  
                  {/* Hover effect particles */}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1 -right-1 w-4 h-4"
                    >
                      <div className={`w-full h-full bg-gradient-to-r ${
                        activeCategoryData?.color === 'neon-cyan' ? 'from-neon-cyan to-blue-400' :
                        activeCategoryData?.color === 'neon-purple' ? 'from-neon-purple to-purple-400' :
                        activeCategoryData?.color === 'neon-pink' ? 'from-neon-pink to-pink-400' :
                        'from-neon-green to-green-400'
                      } rounded-full animate-ping`} />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        )}
      </div>
    </section>
  );
}
