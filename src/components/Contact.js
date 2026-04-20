'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from '@/components/SocialIcons';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@satyamdwivedi.com.np',
    href: 'mailto:contact@satyamdwivedi.com.np',
    color: 'neon-cyan'
  },
];

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/satyamdwivedi7', label: 'GitHub', color: 'neon-cyan' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/satyam7579', label: 'LinkedIn', color: 'neon-purple' },
  { icon: TwitterIcon, href: 'https://twitter.com/satyam_7579', label: 'Twitter', color: 'neon-pink' },
  { icon: InstagramIcon, href: 'https://instagram.com/satyam_7579', label: 'Instagram', color: 'neon-green' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
        signal: controller.signal,
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
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Static, Tailwind-safe class maps — never build class names dynamically
  // so the purger can always find these strings.
  const textColorMap = {
    'neon-cyan':   'text-neon-cyan',
    'neon-purple': 'text-neon-purple',
    'neon-pink':   'text-neon-pink',
    'neon-green':  'text-neon-green',
  };
  const borderColorMap = {
    'neon-cyan':   'border-neon-cyan',
    'neon-purple': 'border-neon-purple',
    'neon-pink':   'border-neon-pink',
    'neon-green':  'border-neon-green',
  };
  const bgColorMap = {
    'neon-cyan':   'bg-neon-cyan/20',
    'neon-purple': 'bg-neon-purple/20',
    'neon-pink':   'bg-neon-pink/20',
    'neon-green':  'bg-neon-green/20',
  };

  const getTextColor   = (color) => textColorMap[color]   || textColorMap['neon-cyan'];
  const getBorderColor = (color) => borderColorMap[color] || borderColorMap['neon-cyan'];
  const getBgColor     = (color) => bgColorMap[color]     || bgColorMap['neon-cyan'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
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
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-4 p-6 rounded-xl glass hover:bg-dark-800/70 transition-all duration-300 group hoverable"
                  >
                    <div className={`p-3 rounded-lg ${getBgColor(method.color)} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className={getTextColor(method.color)} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-semibold mb-1">{method.label}</h4>
                      <p className={`${getTextColor(method.color)} font-medium break-all`}>{method.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-8">
              <h4 className="text-white font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href, label, color }) => {
                  // Static hover color map — Tailwind purger requires full static strings
                  const hoverColorMap = {
                    'neon-cyan':   'group-hover:text-neon-cyan',
                    'neon-purple': 'group-hover:text-neon-purple',
                    'neon-pink':   'group-hover:text-neon-pink',
                    'neon-green':  'group-hover:text-neon-green',
                  };
                  const hoverColor = hoverColorMap[color] || hoverColorMap['neon-cyan'];
                  return (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-xl glass hover:bg-dark-800/70 transition-all duration-300 group hoverable"
                    >
                      <Icon size={24} className={`text-gray-400 ${hoverColor} transition-colors duration-300`} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-2xl glass border border-white/10 hover:bg-dark-800/30 transition-all duration-300"
            >
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
                  className={`mt-4 p-4 rounded-lg flex items-center space-x-3 ${
                    submitStatus === 'success'
                      ? 'bg-neon-green/20 border border-neon-green/30 text-neon-green'
                      : 'bg-red-500/20 border border-red-500/30 text-red-400'
                  }`}
                >
                  {submitStatus === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <span>
                    {submitStatus === 'success'
                      ? "Message sent successfully! I'll get back to you soon."
                      : 'Failed to send message. Please check all fields and try again.'}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
