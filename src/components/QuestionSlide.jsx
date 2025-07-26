import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiCheck } = FiIcons;

const QuestionSlide = ({ 
  question, 
  onAnswer, 
  onPrevious, 
  selectedAnswer, 
  canGoBack,
  questionNumber,
  totalQuestions 
}) => {
  return (
    <div className="text-center text-white">
      {/* Question Number */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
          {questionNumber} / {totalQuestions}
        </span>
      </motion.div>

      {/* Question Text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-4xl font-bold mb-12 leading-tight max-w-3xl mx-auto"
      >
        {question.question}
      </motion.h2>

      {/* Answer Options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 mb-12"
      >
        {question.answers.map((answer, index) => (
          <motion.button
            key={answer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(question.id, answer.id, answer.points)}
            className={`w-full max-w-2xl mx-auto p-4 md:p-6 rounded-xl text-left transition-all duration-300 border-2 group ${
              selectedAnswer === answer.id
                ? 'bg-secondary/20 border-secondary text-white'
                : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 text-white/90 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  selectedAnswer === answer.id
                    ? 'bg-secondary border-secondary'
                    : 'border-white/40 group-hover:border-white/60'
                }`}>
                  {selectedAnswer === answer.id ? (
                    <SafeIcon icon={FiCheck} className="text-white text-sm" />
                  ) : (
                    <span className="text-sm font-bold text-white/70 group-hover:text-white">
                      {answer.id}
                    </span>
                  )}
                </div>
                <span className="text-lg font-medium">
                  {answer.text}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Navigation */}
      {canGoBack && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
          >
            <SafeIcon icon={FiArrowLeft} className="text-lg" />
            Zurück
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionSlide;