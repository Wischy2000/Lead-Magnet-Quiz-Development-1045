import React from 'react';
import {motion} from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiArrowRight, FiArrowLeft} = FiIcons;

const SectionIntro = ({section, sectionInfo, onNext, onPrevious, isFirstSection, isLastSection}) => {
  const sectionData = sectionInfo[section] || {name: section, description: ''};

  return (
    <div className="text-center text-white">
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
        className="mb-6"
      >
        <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
          {sectionData.name}
        </span>
      </motion.div>

      <motion.h2
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
        className="text-2xl md:text-4xl font-bold mb-6 leading-tight"
      >
        {section}
      </motion.h2>

      <motion.p
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
        className="text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto"
      >
        {sectionData.description}
      </motion.p>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        {!isFirstSection && (
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            <SafeIcon icon={FiArrowLeft} className="text-lg" />
            Zurück
          </button>
        )}

        <button
          onClick={onNext}
          className="group bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
        >
          {isLastSection ? 'Letzte Runde!' : 'Los geht\'s'}
          <SafeIcon icon={FiArrowRight} className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </div>
  );
};

export default SectionIntro;