import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import questionsData from '../data/questions.json';
import evaluationsData from '../data/evaluations.json';
import IntroSlide from './test/IntroSlide';
import SectionIntro from './test/SectionIntro';
import QuestionSlide from './test/QuestionSlide';
import ResultsPage from './test/ResultsPage';
import ProgressBar from './test/ProgressBar';

const {FiArrowLeft} = FiIcons;

const HRTest = () => {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sectionScores, setSectionScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [slides, setSlides] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [lowestScoringSections, setLowestScoringSections] = useState([]);

  // Group questions by section
  const sections = {};
  questionsData.questions.forEach(question => {
    if (!sections[question.section]) {
      sections[question.section] = [];
    }
    sections[question.section].push(question);
  });

  // Section information for display
  const sectionInfo = {
    'Strategische HR-Positionierung': {
      name: 'Strategie',
      description: 'Wie strategisch ist deine HR-Arbeit heute aufgestellt? Welche Rolle spielt HR in deinem Unternehmen?'
    },
    'Digitalisierung & Technologie': {
      name: 'Digitalisierung',
      description: 'Wie digital arbeitet ihr bereits? Von Tools bis zur KI - hier geht\'s um eure technische Ausstattung.'
    },
    'Führungskultur & New Work': {
      name: 'Führungskultur',
      description: 'Wie wird bei euch geführt? Wie flexibel und modern ist eure Arbeitskultur?'
    },
    'Recruiting & Talent Management': {
      name: 'Recruiting',
      description: 'Wie findet und entwickelt ihr eure Talente? Vom Recruiting bis zur Mitarbeiterbindung.'
    },
    'Zukunftsfähigkeit & Wandel': {
      name: 'Zukunftsfähigkeit',
      description: 'Wie innovativ und zukunftsorientiert ist euer HR? Change Management und Nachhaltigkeit im Fokus.'
    }
  };

  // Initialize slides
  useEffect(() => {
    const allSlides = [];
    
    // Add intro slide
    allSlides.push({type: 'intro'});
    
    // Add section intros and questions
    Object.entries(sections).forEach(([sectionName, questions]) => {
      // Add section intro
      allSlides.push({type: 'section-intro', section: sectionName});
      
      // Add questions for this section
      questions.forEach(question => {
        allSlides.push({type: 'question', question});
      });
    });
    
    setSlides(allSlides);
    
    // Load saved progress if available
    const savedProgress = localStorage.getItem('hr-test-progress');
    if (savedProgress) {
      try {
        const {currentSlideIndex: savedIndex, answers: savedAnswers} = JSON.parse(savedProgress);
        setCurrentSlideIndex(savedIndex);
        setAnswers(savedAnswers);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('hr-test-progress', JSON.stringify({currentSlideIndex, answers}));
  }, [currentSlideIndex, answers]);

  const handleAnswer = (questionId, answerId, points) => {
    const question = questionsData.questions.find(q => q.question === questionId);
    const section = question.section;
    
    const newAnswers = {...answers, [questionId]: {answerId, points, section}};
    setAnswers(newAnswers);
    
    // Auto-advance after a short delay
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const calculateResults = () => {
    // Initialize section scores
    const newSectionScores = {};
    Object.keys(sections).forEach(section => {
      newSectionScores[section] = 0;
    });
    
    let total = 0;
    
    // Calculate scores
    Object.values(answers).forEach(answer => {
      newSectionScores[answer.section] = (newSectionScores[answer.section] || 0) + answer.points;
      total += answer.points;
    });
    
    setSectionScores(newSectionScores);
    setTotalScore(total);
    
    // Find lowest scoring sections
    const sectionEntries = Object.entries(newSectionScores);
    const sortedSections = sectionEntries.sort((a, b) => {
      // Calculate percentage scores
      const aMaxScore = sections[a[0]].length * 5; // max 5 points per question
      const bMaxScore = sections[b[0]].length * 5;
      const aPercentage = a[1] / aMaxScore;
      const bPercentage = b[1] / bMaxScore;
      return aPercentage - bPercentage;
    });
    
    // Get the 3 lowest scoring sections
    const worstSections = sortedSections.slice(0, 3).map(entry => entry[0]);
    setLowestScoringSections(worstSections);
    
    // Find questions with lowest scores in those sections
    const badQuestions = [];
    worstSections.forEach(section => {
      const sectionQuestions = sections[section];
      const answeredQuestions = sectionQuestions.filter(q => answers[q.question]);
      
      // Sort by points (ascending)
      const sortedQuestions = answeredQuestions.sort(
        (a, b) => (answers[a.question]?.points || 0) - (answers[b.question]?.points || 0)
      );
      
      // Add the lowest scoring question to bad questions
      if (sortedQuestions.length > 0) {
        badQuestions.push(sortedQuestions[0].question);
      }
    });
    
    // Determine HR type
    const hrType = evaluationsData.evaluations.find(
      type => total >= type.minPoints && total <= type.maxPoints
    );
    
    setEvaluation({
      ...hrType,
      totalScore: total,
      maxScore: questionsData.questions.length * 5,
      sectionScores: newSectionScores,
      badQuestions
    });
    
    setShowResults(true);
    
    // Clear saved progress
    localStorage.removeItem('hr-test-progress');
  };

  const resetTest = () => {
    setCurrentSlideIndex(0);
    setAnswers({});
    setShowResults(false);
    setEvaluation(null);
    localStorage.removeItem('hr-test-progress');
  };

  const getCurrentSlide = () => {
    if (showResults) {
      return (
        <ResultsPage
          evaluation={evaluation}
          sectionScores={sectionScores}
          sections={sections}
          sectionInfo={sectionInfo}
          onRestart={resetTest}
        />
      );
    }

    if (!slides[currentSlideIndex]) {
      return <div>Loading...</div>;
    }

    const slide = slides[currentSlideIndex];
    switch (slide.type) {
      case 'intro':
        return <IntroSlide onStart={handleNext} />;
      case 'section-intro':
        return (
          <SectionIntro
            section={slide.section}
            sectionInfo={sectionInfo}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirstSection={currentSlideIndex === 1}
            isLastSection={Object.keys(sections).indexOf(slide.section) === Object.keys(sections).length - 1}
          />
        );
      case 'question':
        return (
          <QuestionSlide
            question={slide.question}
            onAnswer={handleAnswer}
            onPrevious={handlePrevious}
            selectedAnswer={answers[slide.question.question]?.answerId}
          />
        );
      default:
        return <div>Unknown slide type</div>;
    }
  };

  const getProgress = () => {
    // For intro slide
    if (currentSlideIndex === 0) {
      return 0;
    }
    
    // For results
    if (showResults) {
      return 100;
    }
    
    // Count questions
    const totalQuestions = questionsData.questions.length;
    let answeredQuestions = Object.keys(answers).length;
    
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const getProgressLabel = () => {
    if (currentSlideIndex === 0) {
      return 'Start';
    }
    
    if (showResults) {
      return 'Ergebnis';
    }
    
    const currentSlide = slides[currentSlideIndex];
    if (currentSlide?.type === 'section-intro') {
      return sectionInfo[currentSlide.section]?.name || 'Abschnitt';
    }
    
    if (currentSlide?.type === 'question') {
      // Count questions up to current slide
      let questionCount = 0;
      for (let i = 0; i < currentSlideIndex; i++) {
        if (slides[i]?.type === 'question') {
          questionCount++;
        }
      }
      return `Frage ${questionCount + 1} von ${questionsData.questions.length}`;
    }
    
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Progress */}
      <div className="p-4 md:p-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm font-medium">
              {getProgressLabel()}
            </span>
            <span className="text-highlight text-sm font-bold">
              {getProgress()}%
            </span>
          </div>
          <ProgressBar progress={getProgress()} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {getCurrentSlide()}
        </div>
      </div>
    </div>
  );
};

export default HRTest;