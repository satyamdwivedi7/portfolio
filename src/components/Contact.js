'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, CheckCircle, AlertCircle } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@satyamdwivedi.com.np',
    href: 'mailto:contact@satyamdwivedi.com.np',
    color: 'neon-cyan'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+977 9876543210',
    href: 'tel:+9779876543210',
    color: 'neon-purple'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kathmandu, Nepal',
    href: 'https://maps.google.com/?q=Kathmandu,Nepal',
    color: 'neon-pink'
  }
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/satyamdwivedi7', label: 'GitHub', color: 'neon-cyan' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/satyam7579', label: 'LinkedIn', color: 'neon-purple' },
  { icon: Twitter, href: 'https://twitter.com/satyam7579', label: 'Twitter', color: 'neon-pink' },
  { icon: Instagram, href: 'https://instagram.com/satyam_7579', label: 'Instagram', color: 'neon-green' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('https://portfolio-api.satyamdwivedi.com.np/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'secret': 'sikret-key'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      const responseData = await response.json();
      
      if (response.ok && responseData.success !== false) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(responseData.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.name === 'AbortError') {
        console.error('Request timeout');
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
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

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
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
            <span className="gradient-text">Let's Connect</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to bring your ideas to life? Let's discuss your next project
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-white mb-6">Get in Touch</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a project in mind or just want to say hello, feel free to reach out!
              </p>
            </motion.div>

            {/* Contact Methods */}
            <motion.div variants={itemVariants} className="space-y-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={method.label === 'Location' ? '_blank' : '_self'}
                    rel={method.label === 'Location' ? 'noopener noreferrer' : ''}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-4 p-6 rounded-xl glass hover:bg-dark-800/70 transition-all duration-300 group hoverable"
                  >
                    <div className={`p-3 rounded-lg ${getColorClass(method.color, 'bg')} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className={getColorClass(method.color)} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{method.label}</h4>
                      <p className={`${getColorClass(method.color)} font-medium`}>{method.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-8">
              <h4 className="text-white font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-xl glass hover:bg-dark-800/70 transition-all duration-300 group hoverable ${getColorClass(color, 'border')} border-2 border-transparent hover:${getColorClass(color, 'border')}`}
                  >
                    <Icon size={24} className={`text-gray-400 group-hover:${getColorClass(color)} transition-colors duration-300`} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="relative p-8 rounded-2xl glass hover:bg-dark-800/30 transition-all duration-300"
            >
              {/* Animated border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink p-0.5 opacity-20"
              >
                <div className="w-full h-full bg-dark-950 rounded-2xl" />
              </motion.div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan/50 focus:bg-dark-800/70 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan/50 focus:bg-dark-800/70 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan/50 focus:bg-dark-800/70 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-lg font-semibold text-dark-950 hover:shadow-lg hover:shadow-neon-cyan/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Submit Status */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mt-4 p-4 rounded-lg flex items-center space-x-3 ${
                      submitStatus === 'success' 
                        ? 'bg-neon-green/20 border border-neon-green/30 text-neon-green' 
                        : 'bg-red-500/20 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>
                      {submitStatus === 'success' 
                        ? 'Message sent successfully! I\'ll get back to you soon.' 
                        : 'Failed to send message. Please check that all fields are filled correctly and try again.'}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
