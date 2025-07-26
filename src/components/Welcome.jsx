import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiTarget, FiUsers, FiTrendingUp } = FiIcons;

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FiTarget,
      title: "Präzise Typisierung",
      description: "10 wissenschaftlich fundierte Fragen"
    },
    {
      icon: FiUsers,
      title: "Personalisierte Tipps",
      description: "5 konkrete Empfehlungen für deinen Typ"
    },
    {
      icon: FiTrendingUp,
      title: "Sofortige Auswertung",
      description: "Ergebnisse direkt per E-Mail"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center text-white"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Entdecke deinen
            <span className="text-highlight block mt-2">
              Transformations-Typ
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            In nur 2 Minuten zu deiner persönlichen Auswertung mit konkreten Tipps für deine Weiterentwicklung
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="bg-secondary/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={feature.icon} className="text-highlight text-xl" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button
            onClick={() => navigate('/quiz')}
            className="group bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl pulse-glow flex items-center gap-3 mx-auto"
          >
            Quiz jetzt starten
            <SafeIcon 
              icon={FiArrowRight} 
              className="text-xl group-hover:translate-x-1 transition-transform duration-300" 
            />
          </button>
          <p className="text-white/60 text-sm mt-4">
            Kostenlos • Dauert nur 2 Minuten • Keine Anmeldung nötig
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;