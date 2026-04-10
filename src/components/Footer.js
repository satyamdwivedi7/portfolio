'use client';

import { motion } from 'framer-motion';
import { Heart, Code, Coffee, ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '@/components/SocialIcons';
import Image from 'next/image';

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/satyamdwivedi7', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/satyam7579', label: 'LinkedIn' },
  { icon: TwitterIcon, href: 'https://twitter.com/satyam_7579', label: 'Twitter' },
  { icon: InstagramIcon, href: 'https://instagram.com/satyam_7579', label: 'Instagram' },
  { icon: Mail, href: 'mailto:contact@satyamdwivedi.com.np', label: 'Email' },
];

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-dark-950 border-t border-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Image
                  src="https://satyamdwivedi7.github.io/Images/logo.webp"
                  alt="Satyam Dwivedi Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">Satyam Dwivedi</h3>
                <p className="text-neon-cyan font-medium">Software Development Engineer</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed max-w-md">
              Passionate about creating innovative web solutions that bridge the gap between 
              design and functionality. Always learning, always building.
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Code size={16} />
                <span className="text-sm">Made with</span>
                <Heart size={16} className="text-neon-pink animate-pulse" />
                <span className="text-sm">and lots of</span>
                <Coffee size={16} className="text-neon-cyan" />
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => handleNavClick(link.href)}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-neon-cyan transition-colors duration-300 text-left hoverable"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-6 text-lg">Connect</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-lg glass hover:bg-dark-800/70 text-gray-400 hover:text-neon-cyan transition-all duration-300 flex items-center justify-center hoverable group"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
              
              <div className="pt-4 space-y-2 text-sm text-gray-400">
                <p>📧 contact@satyamdwivedi.com.np</p>
                <p>🌐 Available for freelance work</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-4 text-gray-400 text-sm">
            <span>&copy; {currentYear} Satyam Dwivedi. All rights reserved.</span>
            <span className="hidden md:block">•</span>
            <span className="hidden md:block">Built with Next.js & Framer Motion</span>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg glass hover:bg-dark-800/70 text-gray-400 hover:text-neon-cyan transition-all duration-300 hoverable group"
          >
            <ArrowUp size={16} className="group-hover:animate-bounce" />
            <span className="text-sm font-medium">Back to top</span>
          </motion.button>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2.5,
                ease: "easeInOut",
              }}
              className={`absolute w-1 h-1 rounded-full ${
                i === 0 ? 'bg-neon-cyan' : i === 1 ? 'bg-neon-purple' : 'bg-neon-pink'
              }`}
              style={{
                left: `${20 + i * 30}%`,
                bottom: '10%',
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
