'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, X, Loader2, Eye } from 'lucide-react';
import Image from 'next/image';
import { fetchProjects } from '@/lib/api';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false); // Show featured (3) by default
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('Projects component rendered. State:', {
    projectsCount: projects.length,
    selectedProject: selectedProject ? selectedProject.title : 'none',
    showAll: showAllProjects,
    loading,
    error
  });

  // Load projects only once on mount
  useEffect(() => {
    let isMounted = true;
    
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projectData = await fetchProjects();
        
        console.log('Projects loaded:', projectData.length);
        
        if (isMounted) {
          setProjects(projectData);
          setError(null);
          console.log('Projects state set:', projectData.length);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();
    
    return () => {
      console.log('Component unmounting');
      isMounted = false;
    };
  }, []);

  // Simpler, more robust scroll lock for modal
  useEffect(() => {
    console.log('Modal state changed, selectedProject:', selectedProject ? 'OPEN' : 'CLOSED');
    console.log('Current projects count:', projects.length);
    
    if (selectedProject) {
      // Store the current scroll position
      const scrollY = window.pageYOffset;
      
      // Lock scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Return cleanup function
      return () => {
        console.log('Cleaning up modal scroll lock');
        
        // Restore scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
        
        console.log('Modal cleanup complete');
      };
    }
  }, [selectedProject]);

  // Display 3 featured projects when showAllProjects is false, otherwise show all
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-neon-green/20 text-neon-green border-neon-green/30';
      case 'In Progress':
        return 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const ProjectCard = ({ project }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl glass hover:bg-dark-800/70 transition-all duration-500"
    >
      {/* Background Image */}
      <div className="relative w-full h-48 lg:h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
        
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
          {project.status}
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-dark-950/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedProject(project)}
            className="p-3 rounded-full bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-dark-950 transition-all duration-300"
          >
            <Play size={20} />
          </motion.button>
          
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-neon-purple/20 border border-neon-purple/50 text-neon-purple hover:bg-neon-purple hover:text-dark-950 transition-all duration-300"
            >
              <Github size={20} />
            </motion.a>
          )}
          
          {project.demoUrl && (
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-neon-pink/20 border border-neon-pink/50 text-neon-pink hover:bg-neon-pink hover:text-dark-950 transition-all duration-300"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded bg-dark-700/50 text-gray-300 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
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
            <span className="gradient-text">Featured Projects</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A showcase of my latest work and creative solutions
          </motion.p>
        </motion.div>

        {/* Project Filter Buttons - Only show if more than 3 projects */}
        {projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {/* Featured Projects Button */}
            <motion.button
              onClick={() => setShowAllProjects(false)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hoverable ${
                !showAllProjects
                  ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-cyan/40 border border-white/20 text-white shadow-lg'
                  : 'bg-dark-800/50 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              <Eye size={20} />
              <span>Featured Projects</span>
            </motion.button>

            {/* All Projects Button */}
            <motion.button
              onClick={() => setShowAllProjects(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hoverable ${
                showAllProjects
                  ? 'bg-gradient-to-r from-neon-purple/20 to-neon-purple/40 border border-white/20 text-white shadow-lg'
                  : 'bg-dark-800/50 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              <Eye size={20} />
              <span>All Projects</span>
            </motion.button>
          </motion.div>
        )}

        {/* Projects Display - Always render container */}
        {!loading && !error && (
          <div className="mb-16">
            {displayedProjects.length > 0 ? (
              <>
                <motion.div
                  key={showAllProjects ? 'all' : 'featured'}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {displayedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </motion.div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No projects to display</p>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Loader2 className="w-12 h-12 animate-spin text-neon-cyan mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Loading Projects...</h3>
            <p className="text-gray-400">Fetching latest projects from the server</p>
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
            <h3 className="text-2xl font-bold text-white mb-2">Error Loading Projects</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neon-cyan text-dark-950 rounded-lg font-semibold hover:bg-neon-cyan/90 transition-colors duration-300"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">�</div>
            <h3 className="text-2xl font-bold text-white mb-2">No projects available</h3>
            <p className="text-gray-400">Projects will appear here once they're loaded from the server</p>
          </motion.div>
        )}
      </div>

      {/* Project Modal with Fixed Z-Index */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 99999 }}
            className="fixed inset-0 bg-dark-950/98 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring" }}
              onClick={(e) => e.stopPropagation()}
              style={{ zIndex: 100000 }}
              className="relative max-w-4xl w-full max-h-[85vh] bg-dark-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-neon-cyan/20"
            >
              {/* Close Button - Absolutely positioned at top */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-3 rounded-full bg-dark-950/90 text-white hover:bg-neon-cyan hover:text-dark-950 transition-all duration-300 shadow-lg border border-white/10"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Modal Header with Image */}
              <div className="relative h-56 lg:h-64 flex-shrink-0">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-transparent" />
              </div>
              
              {/* Modal Content - Scrollable */}
              <div className="p-6 lg:p-8 overflow-y-auto max-h-[calc(85vh-16rem)]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30">
                      {selectedProject.category}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(selectedProject.status)}`}>
                    {selectedProject.status}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-lg bg-dark-700 text-gray-200 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  {selectedProject.demoUrl && (
                    <motion.a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-neon-cyan text-dark-950 rounded-lg font-semibold hover:bg-neon-cyan/90 transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                  
                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-neon-purple text-neon-purple rounded-lg font-semibold hover:bg-neon-purple hover:text-dark-950 transition-all duration-300"
                    >
                      <Github size={20} />
                      <span>View Code</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
