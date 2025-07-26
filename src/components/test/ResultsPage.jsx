import React, {useState} from 'react';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import EmailCapture from './EmailCapture';

const {FiRefreshCw, FiMail, FiCheck, FiAward, FiBarChart2} = FiIcons;

const ResultsPage = ({evaluation, sectionScores, sections, sectionInfo, onRestart}) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  if (!evaluation) {
    return <div className="text-center text-white">Loading results...</div>;
  }

  const handleEmailSubmitted = () => {
    setEmailSubmitted(true);
  };

  return (
    <div className="text-white">
      <div className="max-w-2xl w-full mx-auto text-center">
        {/* Results Header */}
        <div className="mb-8">
          <div className="bg-highlight/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiAward} className="text-highlight text-2xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Dein Ergebnis
          </h1>
          <div className="text-lg text-white/80">
            Du hast <span className="text-highlight font-bold">{evaluation.totalScore} von {evaluation.maxScore} Punkten</span> erreicht
          </div>
        </div>

        {/* Type Result */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl md:text-3xl font-bold text-highlight mb-4">
            {evaluation.type}
          </h2>
          <p className="text-lg leading-relaxed text-white/90 mb-6">
            {evaluation.fullDescription}
          </p>
          
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg font-bold mb-2">Dein Impuls:</h3>
            <p className="italic text-white/90">{evaluation.impulse}</p>
          </div>
        </div>

        {/* Section Scores */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h3 className="text-xl font-bold mb-6">Deine Ergebnisse im Detail:</h3>
          <div className="space-y-4">
            {Object.entries(sectionScores).map(([section, score]) => {
              const maxScore = sections[section].length * 5;
              const percentage = Math.round((score / maxScore) * 100);
              return (
                <div key={section} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{sectionInfo[section].name}</span>
                    <span className="text-sm">{score}/{maxScore} Punkte ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        percentage >= 80
                          ? 'bg-green-500'
                          : percentage >= 60
                          ? 'bg-highlight'
                          : percentage >= 40
                          ? 'bg-yellow-500'
                          : 'bg-secondary'
                      }`}
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-secondary/10 border-l-4 border-secondary rounded-lg p-6 mb-8 text-left">
          <h3 className="text-xl font-bold text-secondary mb-2">Was jetzt für dich spannend sein könnte:</h3>
          <p className="text-white/90">{evaluation.recommendation}</p>
        </div>

        {/* Email Capture or Success */}
        {!emailSubmitted ? (
          !showEmailForm ? (
            <div className="mb-8">
              <div className="bg-secondary/10 rounded-2xl p-8 border border-secondary/30">
                <SafeIcon icon={FiMail} className="text-secondary text-3xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">
                  Möchtest du konkrete Tipps für deinen Typ erhalten?
                </h3>
                <p className="text-white/80 mb-6">
                  Erhalte personalisierte Empfehlungen direkt in dein E-Mail-Postfach
                </p>
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Ja, Tipps per E-Mail erhalten
                </button>
              </div>
            </div>
          ) : (
            <EmailCapture
              evaluation={evaluation}
              onEmailSubmitted={handleEmailSubmitted}
              onCancel={() => setShowEmailForm(false)}
            />
          )
        ) : (
          <div className="bg-green-500/20 rounded-2xl p-8 mb-8 border border-green-500/30">
            <SafeIcon icon={FiCheck} className="text-green-400 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Vielen Dank!
            </h3>
            <p className="text-white/80">
              Deine personalisierten Tipps sind auf dem Weg zu dir. Schau in den nächsten Minuten in dein E-Mail-Postfach.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            <SafeIcon icon={FiRefreshCw} className="text-lg" />
            Test wiederholen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;