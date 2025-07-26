import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-white/80 text-sm font-medium">
          Frage {current} von {total}
        </span>
        <span className="text-highlight text-sm font-bold">
          {Math.round(percentage)}%
        </span>
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-secondary to-highlight h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;