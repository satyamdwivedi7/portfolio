'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Coffee, Code2, Heart, Star, Zap } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { label: 'Years of Experience', value: '3+', icon: Calendar, color: 'neon-cyan' },
  { label: 'Projects Completed', value: '20+', icon: Code2, color: 'neon-purple' },
  { label: 'Cups of Coffee', value: '1000+', icon: Coffee, color: 'neon-pink' },
];

const highlights = [
  {
    title: 'Algorithmic Thinker',
    description: 'Expert in data structures, algorithms, and optimizing code for performance.',
    icon: Zap,
    color: 'neon-cyan'
  },
  {
    title: 'System Designer',
    description: 'Designing scalable architectures and distributed systems for high availability.',
    icon: Star,
    color: 'neon-purple'
  },
  {
    title: 'Code Quality Advocate',
    description: 'Writing clean, maintainable code with comprehensive testing and documentation.',
    icon: Heart,
    color: 'neon-pink'
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getColorClass = (color, type = 'text') => {
    const colors = {
      'neon-cyan': type === 'text' ? 'text-neon-cyan' : type === 'border' ? 'border-neon-cyan' : 'bg-neon-cyan/20',
      'neon-purple': type === 'text' ? 'text-neon-purple' : type === 'border' ? 'border-neon-purple' : 'bg-neon-purple/20',
      'neon-pink': type === 'text' ? 'text-neon-pink' : type === 'border' ? 'border-neon-pink' : 'bg-neon-pink/20',
      'neon-green': type === 'text' ? 'text-neon-green' : type === 'border' ? 'border-neon-green' : 'bg-neon-green/20',
    };
    return colors[color] || colors['neon-cyan'];
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
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
            <span className="gradient-text">About Me</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Get to know the person behind the code
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Animated border - now matches image size exactly */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink p-1"
              >
                <div className="w-full h-full bg-dark-950 rounded-2xl" />
              </motion.div>
              
              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative z-10 p-1"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden glass">
                  <Image
                    src="/satyam-dwivedi.webp"
                    alt="Satyam Dwivedi - Software Development Engineer from VIT Vellore"
                    title="Satyam Dwivedi - Software Development Engineer"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/20 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Floating elements around image */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  className={`absolute w-8 h-8 rounded-full ${getColorClass(['neon-cyan', 'neon-purple', 'neon-pink', 'neon-green'][i], 'bg')} opacity-20`}
                  style={{
                    left: i % 2 === 0 ? '-10px' : 'auto',
                    right: i % 2 === 1 ? '-10px' : 'auto',
                    top: `${20 + i * 20}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Introduction */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center space-x-3 text-neon-cyan">
                <MapPin size={24} />
                <span className="text-lg font-medium">Based in Nepal</span>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Hello! I'm <span className="text-neon-cyan font-semibold">Satyam Dwivedi</span>, 
                  a Software Development Engineer specializing in building 
                  <span className="text-neon-purple font-semibold"> scalable backend systems </span>
                  and solving complex algorithmic problems.
                </p>
                
                <p>
                  My journey in software engineering began with a deep interest in data structures and algorithms, 
                  evolving into expertise in designing distributed systems, optimizing performance, 
                  and implementing efficient solutions that handle millions of requests.
                </p>
                
                <p>
                  I specialize in <span className="text-neon-pink font-semibold">backend development</span>, 
                  system design, and database optimization, with strong foundations in 
                  <span className="text-neon-cyan font-semibold"> computer science fundamentals</span>.
                </p>
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-semibold text-white mb-6">What Drives Me</h3>
              <div className="space-y-4">
                {highlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <motion.div
                      key={highlight.title}
                      variants={itemVariants}
                      className="flex items-start space-x-4 p-4 rounded-lg glass hover:bg-dark-800/50 transition-all duration-300"
                    >
                      <div className={`p-2 rounded-lg ${getColorClass(highlight.color, 'bg')}`}>
                        <Icon size={24} className={getColorClass(highlight.color)} />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {highlight.title}
                        </h4>
                        <p className="text-gray-400">{highlight.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center group"
              >
                <div className="relative p-6 rounded-xl glass hover:bg-dark-800/50 transition-all duration-300">
                  {/* Background glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${getColorClass(stat.color, 'bg')} blur-xl rounded-xl`} />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${getColorClass(stat.color, 'bg')} flex items-center justify-center`}>
                      <Icon size={32} className={getColorClass(stat.color)} />
                    </div>
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`text-3xl font-bold mb-2 ${getColorClass(stat.color)}`}
                    >
                      {stat.value}
                    </motion.div>
                    
                    <p className="text-gray-400 font-medium">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
