import React from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiArrowRight, FiCheckSquare, FiClock, FiBarChart2} = FiIcons;

const IntroSlide = ({onStart}) => {
  return (
    <div className="text-center text-white">
      <motion.h1
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
        className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
      >
        HR-Typentest
      </motion.h1>

      <motion.p
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
        className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto"
      >
        Finde heraus, welcher HR-Typ du bist! In wenigen Minuten erfährst du, wo deine Stärken liegen und wie du deine HR-Arbeit auf das nächste Level bringen kannst.
      </motion.p>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex flex-col items-center">
          <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <SafeIcon icon={FiCheckSquare} className="text-highlight text-2xl" />
          </div>
          <div className="text-3xl font-bold mb-2">25</div>
          <div className="text-white/70">Fragen</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex flex-col items-center">
          <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <SafeIcon icon={FiBarChart2} className="text-highlight text-2xl" />
          </div>
          <div className="text-3xl font-bold mb-2">5</div>
          <div className="text-white/70">Themenbereiche</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 flex flex-col items-center">
          <div className="bg-secondary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <SafeIcon icon={FiClock} className="text-highlight text-2xl" />
          </div>
          <div className="text-3xl font-bold mb-2">5</div>
          <div className="text-white/70">Minuten</div>
        </div>
      </motion.div>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
      >
        <button
          onClick={onStart}
          className="group bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl pulse-glow flex items-center gap-3 mx-auto"
        >
          Test jetzt starten
          <SafeIcon icon={FiArrowRight} className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
        </button>
        <p className="text-white/60 text-sm mt-4">
          Kostenlos • Dauert nur 5 Minuten • Keine Anmeldung nötig
        </p>
      </motion.div>
    </div>
  );
};

export default IntroSlide;