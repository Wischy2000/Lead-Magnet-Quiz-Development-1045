import React from 'react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiArrowLeft, FiCheck} = FiIcons;

const QuestionSlide = ({question, onAnswer, onPrevious, selectedAnswer}) => {
  return (
    <div className="text-center text-white">
      {/* Question Text */}
      <h2 className="text-2xl md:text-3xl font-bold mb-10 leading-tight max-w-3xl mx-auto">
        {question.question}
      </h2>

      {/* Answer Options */}
      <div className="space-y-3 mb-10">
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => onAnswer(question.question, answer.id, answer.points)}
            className={`w-full max-w-2xl mx-auto p-4 rounded-xl text-left transition-all duration-300 border-2 group ${
              selectedAnswer === answer.id
                ? 'bg-secondary/20 border-secondary text-white'
                : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 text-white/90 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    selectedAnswer === answer.id
                      ? 'bg-secondary border-secondary'
                      : 'border-white/40 group-hover:border-white/60'
                  }`}
                >
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
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-white/10"
        >
          <SafeIcon icon={FiArrowLeft} className="text-lg" />
          Zurück
        </button>
      </div>
    </div>
  );
};

export default QuestionSlide;