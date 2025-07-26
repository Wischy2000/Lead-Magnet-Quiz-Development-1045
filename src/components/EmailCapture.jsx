import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiCheck, FiAlertCircle, FiX } = FiIcons;

const EmailCapture = ({ evaluation, onEmailSubmitted, onCancel }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Bitte gib deine E-Mail-Adresse ein');
      return;
    }

    if (!validateEmail(email)) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein');
      return;
    }

    if (!consent) {
      setError('Bitte stimme der Datenverarbeitung zu');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - In real implementation, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend:
      // - Email address
      // - Evaluation results
      // - Timestamp
      // - User consent
      
      console.log('Sending email with evaluation:', {
        email,
        evaluation,
        timestamp: new Date().toISOString(),
        consent
      });

      onEmailSubmitted();
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <SafeIcon icon={FiMail} className="text-secondary text-2xl" />
          <h3 className="text-xl font-bold">E-Mail für Tipps</h3>
        </div>
        <button
          onClick={onCancel}
          className="text-white/60 hover:text-white transition-colors"
        >
          <SafeIcon icon={FiX} className="text-xl" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:border-secondary focus:bg-white/20 transition-all duration-300"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-4 h-4 accent-secondary"
            disabled={isSubmitting}
          />
          <label htmlFor="consent" className="text-sm text-white/80 leading-relaxed">
            Ich stimme zu, dass meine E-Mail-Adresse gespeichert und für das Zusenden der 
            personalisierten Tipps verwendet wird. Die Daten werden vertraulich behandelt und 
            nicht an Dritte weitergegeben.
          </label>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <SafeIcon icon={FiAlertCircle} className="text-lg" />
            {error}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-secondary hover:bg-secondary/90 disabled:bg-secondary/50 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Wird gesendet...
            </>
          ) : (
            <>
              <SafeIcon icon={FiCheck} className="text-lg" />
              Tipps per E-Mail erhalten
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-white/60 mt-4 text-center">
        Du erhältst eine E-Mail mit deinen personalisierten Tipps. 
        Keine Werbung, keine weiteren E-Mails ohne deine Zustimmung.
      </p>
    </motion.div>
  );
};

export default EmailCapture;