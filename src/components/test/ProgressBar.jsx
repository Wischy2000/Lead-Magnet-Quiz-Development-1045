import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
      <motion.div 
        className="bg-gradient-to-r from-secondary to-highlight h-full rounded-full" 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;