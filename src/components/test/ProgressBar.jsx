import React from 'react';

const ProgressBar = ({progress}) => {
  return (
    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
      <div 
        className="bg-gradient-to-r from-secondary to-highlight h-full rounded-full"
        style={{width: `${progress}%`}}
      />
    </div>
  );
};

export default ProgressBar;