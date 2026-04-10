// src/components/Certifications.js
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { fetchCertifications } from '@/lib/api';

const accentColors = {
  'cloud-ai': {
    border: 'border-blue-500/20',
    button: 'bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20',
  },
  'college': {
    border: 'border-green-500/20',
    button: 'bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20',
  },
};

const defaultAccent = {
  border: 'border-white/10',
  button: 'bg-white/5 border border-white/20 text-gray-400 hover:bg-white/10',
};

function CertCard({ cert }) {
  const accent = accentColors[cert.category] || defaultAccent;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={`flex flex-col items-center text-center p-6 rounded-2xl glass border ${accent.border} gap-3`}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center overflow-hidden p-2 shadow-md shadow-black/30">
        {cert.icon
          ? <Image src={cert.icon} alt={cert.issuer} width={48} height={48} unoptimized className="w-full h-full object-contain" />
          : <span className="text-3xl">🏅</span>
        }
      </div>
      <div>
        <h3 className="text-sm font-bold text-white leading-tight">{cert.title}</h3>
        <p className="text-xs text-gray-400 mt-1">{cert.issuer}</p>
        <p className="text-xs text-gray-600 mt-1">{cert.issuedDate}</p>
      </div>
      {cert.credentialUrl && (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xs px-4 py-1.5 rounded-full transition-colors duration-200 ${accent.button}`}
        >
          View Certificate ↗
        </a>
      )}
    </motion.div>
  );
}

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCertifications();
        if (isMounted) {
          setCertifications(data);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching certifications:', err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-blue-500 text-xs tracking-widest uppercase mb-3">ACHIEVEMENTS</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional certifications and academic achievements that validate my expertise.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-neon-cyan mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Loading Certifications...</h3>
            <p className="text-gray-400">Fetching data from the server</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Error Loading Certifications</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neon-cyan text-dark-950 rounded-lg font-semibold hover:bg-neon-cyan/90 transition-colors duration-300"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && certifications.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">🏅</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Certifications Yet</h3>
            <p className="text-gray-400">Check back soon.</p>
          </motion.div>
        )}

        {/* Certification Cards Grid */}
        {!loading && !error && certifications.length > 0 && (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {certifications.map((cert) => (
              <CertCard key={cert._id} cert={cert} />
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
