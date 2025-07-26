import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import QuestionSlide from './QuestionSlide';
import ResultsPage from './ResultsPage';
import questionsData from '../data/questions.json';
import evaluationsData from '../data/evaluations.json';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [direction, setDirection] = useState('forward');

  const questions = questionsData.questions;
  const evaluations = evaluationsData.evaluations;

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('quiz-progress');
    if (savedProgress) {
      const { currentQuestion: savedQuestion, answers: savedAnswers } = JSON.parse(savedProgress);
      setCurrentQuestion(savedQuestion);
      setAnswers(savedAnswers);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('quiz-progress', JSON.stringify({
      currentQuestion,
      answers
    }));
  }, [currentQuestion, answers]);

  const handleAnswer = (questionId, answerId, points) => {
    const newAnswers = {
      ...answers,
      [questionId]: { answerId, points }
    };
    setAnswers(newAnswers);

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setDirection('forward');
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResults(newAnswers);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection('backward');
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = (finalAnswers) => {
    const totalPoints = Object.values(finalAnswers).reduce((sum, answer) => sum + answer.points, 0);
    
    const userEvaluation = evaluations.find(
      evaluation => totalPoints >= evaluation.minPoints && totalPoints <= evaluation.maxPoints
    );

    setEvaluation({ ...userEvaluation, totalPoints });
    setShowResults(true);
    
    // Clear saved progress
    localStorage.removeItem('quiz-progress');
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setEvaluation(null);
    localStorage.removeItem('quiz-progress');
  };

  if (showResults) {
    return <ResultsPage evaluation={evaluation} onRestart={resetQuiz} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Progress */}
      <div className="p-4 md:p-6">
        <ProgressBar 
          current={currentQuestion + 1} 
          total={questions.length} 
        />
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion}
              custom={direction}
              initial={{ 
                x: direction === 'forward' ? 100 : -100, 
                opacity: 0 
              }}
              animate={{ 
                x: 0, 
                opacity: 1 
              }}
              exit={{ 
                x: direction === 'forward' ? -100 : 100, 
                opacity: 0 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
            >
              <QuestionSlide
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
                onPrevious={handlePrevious}
                selectedAnswer={answers[questions[currentQuestion].id]?.answerId}
                canGoBack={currentQuestion > 0}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Quiz;