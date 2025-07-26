import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import EmailCapture from './EmailCapture';
import * as FiIcons from 'react-icons/fi';

const { FiRefreshCw, FiMail, FiCheck, FiStar } = FiIcons;

const ResultsPage = ({ evaluation, onRestart }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmitted = () => {
    setEmailSubmitted(true);
  };

  const handleRestart = () => {
    onRestart();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center text-white"
      >
        {/* Results Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-highlight/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiStar} className="text-highlight text-2xl" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Dein Ergebnis
          </h1>
          <div className="text-lg text-white/80">
            Du hast <span className="text-highlight font-bold">{evaluation.totalPoints} Punkte</span> erreicht
          </div>
        </motion.div>

        {/* Type Result */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-highlight mb-4">
            {evaluation.type}
          </h2>
          <p className="text-lg leading-relaxed text-white/90">
            {evaluation.shortDescription}
          </p>
        </motion.div>

        {/* Email Capture or Success */}
        {!emailSubmitted ? (
          !showEmailForm ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8"
            >
              <div className="bg-secondary/10 rounded-2xl p-8 border border-secondary/30">
                <SafeIcon icon={FiMail} className="text-secondary text-3xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">
                  Möchtest du 5 konkrete Tipps für deinen Typ erhalten?
                </h3>
                <p className="text-white/80 mb-6">
                  Erhalte personalisierte Empfehlungen direkt in dein E-Mail-Postfach
                </p>
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Ja, Tipps per E-Mail erhalten
                </button>
              </div>
            </motion.div>
          ) : (
            <EmailCapture 
              evaluation={evaluation}
              onEmailSubmitted={handleEmailSubmitted}
              onCancel={() => setShowEmailForm(false)}
            />
          )
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-green-500/20 rounded-2xl p-8 mb-8 border border-green-500/30"
          >
            <SafeIcon icon={FiCheck} className="text-green-400 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Vielen Dank!
            </h3>
            <p className="text-white/80">
              Deine personalisierten Tipps sind auf dem Weg zu dir. 
              Schau in den nächsten Minuten in dein E-Mail-Postfach.
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            <SafeIcon icon={FiRefreshCw} className="text-lg" />
            Quiz wiederholen
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsPage;