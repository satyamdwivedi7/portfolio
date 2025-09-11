'use client';

import { useState, useEffect, useMemo, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, X, Loader2, Eye } from 'lucide-react';
import Image from 'next/image';
import { fetchProjects } from '@/lib/api';
import { DataContext } from '@/components/DataProvider';

export default function Projects({ initialProjects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(initialProjects);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [loading, setLoading] = useState(!initialProjects.length);
  const [error, setError] = useState(null);

  // Get pre-loaded data from context
  const contextData = useContext(DataContext);
  const preloadedProjects = contextData?.projects || [];
  const contextLoading = contextData?.isLoading || false;

  // Stable project loading - only run once on mount
  useEffect(() => {
    const loadProjects = async () => {
      // Only load if we don't already have projects
      if (projects.length > 0) return;
      
      try {
        // Use provided initial data, pre-loaded data, or fetch fresh
        let projectData = initialProjects;
        
        if (!projectData.length && preloadedProjects?.length) {
          projectData = preloadedProjects;
        }

        if (projectData.length > 0) {
          setProjects(projectData);
          setLoading(false);
          return; // Use cached data, no need to fetch
        }
        
        // Fetch fresh data if no cached data available
        setLoading(true);
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadProjects();
  }, []); // Empty dependency array to run only once

  // Handle initial projects from props or context
  useEffect(() => {
    if (initialProjects.length > 0 && projects.length === 0) {
      setProjects(initialProjects);
      setLoading(false);
    } else if (preloadedProjects.length > 0 && projects.length === 0) {
      setProjects(preloadedProjects);
      setLoading(false);
    }
  }, [initialProjects, preloadedProjects]);

  // Enhanced scroll lock effect with cleanup
  useEffect(() => {
    if (selectedProject) {
      // Calculate scrollbar width before hiding it
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Save original styles
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Lock all scrolling completely
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Prevent scrolling on touch devices
      const preventTouch = (e) => e.preventDefault();
      document.addEventListener('touchmove', preventTouch, { passive: false });
      
      // Ensure modal is above all other elements
      document.documentElement.style.setProperty('--modal-z-index', '9999');
      
      return () => {
        // Cleanup function
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        document.removeEventListener('touchmove', preventTouch);
        document.documentElement.style.removeProperty('--modal-z-index');
      };
    } else {
      // Restore all scrolling when no project is selected
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.removeProperty('--modal-z-index');
    }
  }, [selectedProject]);

  // Memoized project calculations for performance
  const { featuredProjects, displayedProjects } = useMemo(() => {
    const featured = projects.slice(0, 6); // Show first 6 as featured
    const displayed = showAllProjects ? projects : featured;
    
    return {
      featuredProjects: featured,
      displayedProjects: displayed
    };
  }, [projects, showAllProjects]);

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

        {/* View All Projects Button */}
        {projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.button
              onClick={() => setShowAllProjects(!showAllProjects)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-950 font-bold rounded-xl hover:shadow-lg hover:shadow-neon-cyan/25 transition-all duration-300"
            >
              <Eye size={24} />
              <span className="text-lg">
                {showAllProjects 
                  ? `Showing All ${projects.length} Projects` 
                  : `View All ${projects.length} Projects`}
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Projects Display */}
        {displayedProjects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="w-1 h-6 bg-neon-cyan mr-3 rounded"></span>
              {showAllProjects ? 'All Projects' : 'Featured Projects'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
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

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay fixed inset-0 bg-dark-950/95 backdrop-blur-md flex items-center justify-center p-4 pt-20"
            onClick={() => setSelectedProject(null)}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
              className="modal-content max-w-4xl w-full max-h-[75vh] bg-dark-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
            >
              {/* Modal Header with Image */}
              <div className="relative h-48 lg:h-56 flex-shrink-0">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/50 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-dark-950/80 text-white hover:bg-dark-950 transition-colors duration-300 z-10 shadow-lg"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Non-scrollable Modal Content */}
              <div className="p-6 lg:p-8 flex-1 overflow-hidden">
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
                
                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                  {selectedProject.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-lg bg-dark-700/50 text-gray-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {selectedProject.technologies.length > 6 && (
                    <span className="px-2 py-1 text-xs rounded-lg bg-dark-700/50 text-gray-400 border border-white/10">
                      +{selectedProject.technologies.length - 6} more
                    </span>
                  )}
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
