'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Github, Linkedin, Twitter, Mail, Code, Zap, Sparkles } from 'lucide-react';

const roles = [
  'Full Stack Developer',
  'React.js Expert',
  'Next.js Developer',
  'MERN Stack Engineer',
  'Web Innovator'
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 1000 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === role) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      } else {
        const nextText = isDeleting
          ? role.substring(0, displayText.length - 1)
          : role.substring(0, displayText.length + 1);
        setDisplayText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/satyamdwivedi7', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/satyam7579', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/satyam7579', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@satyamdwivedi.com.np', label: 'Email' },
  ];

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={floatingVariants}
            animate="animate"
            className={`absolute opacity-20 ${
              i % 3 === 0 ? 'text-neon-cyan' : i % 3 === 1 ? 'text-neon-purple' : 'text-neon-pink'
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {i % 3 === 0 ? <Code size={40} /> : i % 3 === 1 ? <Zap size={35} /> : <Sparkles size={30} />}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants} className="space-y-2">
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-400 font-mono"
            >
              Hello, I'm
            </motion.p>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-8xl font-bold font-mono tracking-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="gradient-text">Satyam</span>
              <br />
              <span className="text-white">Dwivedi</span>
            </motion.h1>
          </motion.div>

          {/* Typing animation for role */}
          <motion.div variants={itemVariants} className="h-16 flex items-center justify-center">
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="text-neon-cyan">&lt;</span>
              <span className="font-mono">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-neon-cyan"
              >
                |
              </motion.span>
              <span className="text-neon-cyan">/&gt;</span>
            </motion.h2>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <motion.p
              className="text-lg sm:text-xl text-gray-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              I craft exceptional digital experiences with cutting-edge technologies. 
              Specializing in full-stack development with a passion for creating 
              <span className="text-neon-purple font-semibold"> innovative </span> 
              and 
              <span className="text-neon-cyan font-semibold"> scalable </span> 
              web solutions.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <motion.a
              href="/Resume_Satyam_Dwivedi.pdf"
              download
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-lg font-semibold text-dark-950 transition-all duration-300 overflow-hidden hoverable"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Download size={20} />
                <span>Download Resume</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </motion.a>

            <motion.button
              onClick={handleScrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan rounded-lg font-semibold hover:bg-neon-cyan hover:text-dark-950 transition-all duration-300 hoverable"
            >
              View My Work
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-6 pt-8"
          >
            {socialLinks.map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="p-3 rounded-full bg-dark-800/50 border border-white/10 hover:border-neon-cyan/50 hover:bg-dark-700/50 transition-all duration-300 hoverable group"
              >
                <Icon size={24} className="text-gray-400 group-hover:text-neon-cyan transition-colors duration-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={handleScrollToProjects}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 rounded-full border border-white/20 hover:border-neon-cyan/50 transition-colors duration-300 hoverable"
            >
              <ChevronDown size={24} className="text-gray-400" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
