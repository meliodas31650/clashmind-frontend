
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Button from '../ui/Button';
import {
  SparkIcon, NeuronIcon,
  MEMORY_MIND_GAME_DURATION,
  MEMORY_MIND_SEQUENCE_DISPLAY_TIME,
  MEMORY_MIND_MIN_QUESTIONS,
  MEMORY_MIND_MAX_QUESTIONS,
  MEMORY_MIND_CORRECT_ANSWER_SCORE,
  MEMORY_MIND_SEQUENCE_BONUS_SCORE,
  MEMORY_MIND_DEFAULT_SPARK_WAGER,
  MEMORY_MIND_ITEMS,
  MEMORY_MIND_SEQUENCE_LENGTH_MIN,
  MEMORY_MIND_SEQUENCE_LENGTH_MAX,
  MEMORY_MIND_QUESTION_OPTIONS,
  MEMORY_MIND_DEEP_PURPLE_BG,
  MEMORY_MIND_GOLD_ACCENT,
  MEMORY_MIND_GOLD_BORDER,
  MEMORY_MIND_GOLD_BUTTON_BG,
  MEMORY_MIND_GOLD_BUTTON_TEXT,
  NEURON_WIN_GENERAL,
  NEURON_LOSS_GENERAL
} from '../../constants';
import useTranslation from '../../hooks/useTranslation';

interface MemoryMindGameProps {
  gameName: string;
  onExitGame: () => void;
}

interface SequenceItem {
  value: string;
  id: string; 
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  type: 'itemAtPosition' | 'countItem' | 'wasItemPresent'; 
}

type GamePhase = 'idle' | 'showingSequence' | 'answeringQuestions' | 'sequenceResult' | 'gameOver';

const MemoizedButton = React.memo(Button);

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const MemoryMindGame: React.FC<MemoryMindGameProps> = React.memo(({ gameName, onExitGame }) => {
  const { t } = useTranslation();

  const [phase, setPhase] = useState<GamePhase>('idle');
  const [totalTimeLeft, setTotalTimeLeft] = useState(MEMORY_MIND_GAME_DURATION);
  const [sequenceDisplayTimeLeft, setSequenceDisplayTimeLeft] = useState(MEMORY_MIND_SEQUENCE_DISPLAY_TIME);
  
  const [currentSequence, setCurrentSequence] = useState<SequenceItem[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [playerAnswers, setPlayerAnswers] = useState<Record<string, string>>({}); 
  
  const [score, setScore] = useState(0);
  const [sequencesCompleted, setSequencesCompleted] = useState(0);
  const [lastSequenceScore, setLastSequenceScore] = useState(0);

  const [playerSparks, setPlayerSparks] = useState(100); 
  const [playerNeurons, setPlayerNeurons] = useState(1500);
  const sparkWager = MEMORY_MIND_DEFAULT_SPARK_WAGER;

  const totalTimerRef = useRef<number | null>(null);
  const sequenceTimerRef = useRef<number | null>(null);

  const generateSequence = useCallback((): SequenceItem[] => {
    const length = Math.floor(Math.random() * (MEMORY_MIND_SEQUENCE_LENGTH_MAX - MEMORY_MIND_SEQUENCE_LENGTH_MIN + 1)) + MEMORY_MIND_SEQUENCE_LENGTH_MIN;
    const sequence: SequenceItem[] = [];
    for (let i = 0; i < length; i++) {
      sequence.push({
        value: MEMORY_MIND_ITEMS[Math.floor(Math.random() * MEMORY_MIND_ITEMS.length)],
        id: `seq-item-${i}-${Date.now()}`
      });
    }
    return sequence;
  }, []);

  const generateQuestions = useCallback((sequence: SequenceItem[]): Question[] => {
    const questions: Question[] = [];
    const numQuestions = Math.floor(Math.random() * (MEMORY_MIND_MAX_QUESTIONS - MEMORY_MIND_MIN_QUESTIONS + 1)) + MEMORY_MIND_MIN_QUESTIONS;
    const usedQuestionTypes: Set<Question['type']> = new Set(); 

    for (let i = 0; i < numQuestions; i++) {
      let question: Question | null = null;
      let attempt = 0;
      while (!question && attempt < 5) { 
        const qTypeRoll = Math.random();
        if (qTypeRoll < 0.4 && !usedQuestionTypes.has('itemAtPosition') && sequence.length > 0) {
          const pos = Math.floor(Math.random() * sequence.length);
          const correctAnswer = sequence[pos].value;
          const options = shuffleArray([
            correctAnswer,
            ...MEMORY_MIND_ITEMS.filter(item => item !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, MEMORY_MIND_QUESTION_OPTIONS - 1)
          ]).slice(0, MEMORY_MIND_QUESTION_OPTIONS);
           if (options.length < MEMORY_MIND_QUESTION_OPTIONS && !options.includes(correctAnswer)) options.push(correctAnswer);
           while(options.length < MEMORY_MIND_QUESTION_OPTIONS) options.push(MEMORY_MIND_ITEMS.filter(item => !options.includes(item)).sort(() => 0.5 - Math.random())[0] || "N/A");
          question = { id: `q-${i}`, text: `What was item #${pos + 1}?`, options: shuffleArray(options), correctAnswer, type: 'itemAtPosition' };
          usedQuestionTypes.add('itemAtPosition');
        } else if (qTypeRoll < 0.7 && !usedQuestionTypes.has('countItem') && sequence.length > 0) {
          const itemToCount = sequence[Math.floor(Math.random() * sequence.length)].value;
          const correctAnswer = String(sequence.filter(item => item.value === itemToCount).length);
          const options = shuffleArray([
            correctAnswer, 
            String(parseInt(correctAnswer) + 1), 
            String(Math.max(0, parseInt(correctAnswer) - 1)),
            String(Math.floor(Math.random()*3)) 
          ].filter((v, idx, self) => self.indexOf(v) === idx)).slice(0, MEMORY_MIND_QUESTION_OPTIONS);
           if (options.length < MEMORY_MIND_QUESTION_OPTIONS && !options.includes(correctAnswer)) options.push(correctAnswer);
           while(options.length < MEMORY_MIND_QUESTION_OPTIONS) options.push(String(Math.floor(Math.random()*3)+3));
          question = { id: `q-${i}`, text: `How many times did "${itemToCount}" appear?`, options: shuffleArray(options), correctAnswer, type: 'countItem' };
          usedQuestionTypes.add('countItem');
        } else if (!usedQuestionTypes.has('wasItemPresent') && sequence.length > 0) {
          const present = Math.random() > 0.3; 
          const itemToCheck = present ? sequence[Math.floor(Math.random() * sequence.length)].value : MEMORY_MIND_ITEMS.filter(it => !sequence.find(s=>s.value === it))[0] || MEMORY_MIND_ITEMS[0];
          const correctAnswer = sequence.some(item => item.value === itemToCheck) ? "Yes" : "No";
          question = { id: `q-${i}`, text: `Was "${itemToCheck}" present?`, options: ["Yes", "No"], correctAnswer, type: 'wasItemPresent' };
          usedQuestionTypes.add('wasItemPresent');
        }
        attempt++;
      }
      if (question) questions.push(question);
      else { 
         const pos = Math.floor(Math.random() * sequence.length);
         const correctAnswer = sequence[pos]?.value || MEMORY_MIND_ITEMS[0];
         const options = shuffleArray([correctAnswer,...MEMORY_MIND_ITEMS.filter(item => item !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, MEMORY_MIND_QUESTION_OPTIONS - 1)]).slice(0, MEMORY_MIND_QUESTION_OPTIONS);
         if (options.length < MEMORY_MIND_QUESTION_OPTIONS && !options.includes(correctAnswer)) options.push(correctAnswer);
         while(options.length < MEMORY_MIND_QUESTION_OPTIONS) options.push(MEMORY_MIND_ITEMS.filter(item => !options.includes(item)).sort(() => 0.5 - Math.random())[0] || "N/A");
         questions.push({ id: `q-${i}-fallback`, text: `What was item #${pos + 1}?`, options: shuffleArray(options), correctAnswer, type: 'itemAtPosition' });
      }
    }
    return questions;
  }, []);

  const startNextSequence = useCallback(() => {
    if (totalTimeLeft <= 0) {
      setPhase('gameOver');
      return;
    }
    const newSeq = generateSequence();
    setCurrentSequence(newSeq);
    setCurrentQuestions(generateQuestions(newSeq));
    setPlayerAnswers({});
    setSequenceDisplayTimeLeft(MEMORY_MIND_SEQUENCE_DISPLAY_TIME);
    setPhase('showingSequence');
  }, [totalTimeLeft, generateSequence, generateQuestions]);

  const startGame = useCallback(() => {
    setScore(0);
    setSequencesCompleted(0);
    setTotalTimeLeft(MEMORY_MIND_GAME_DURATION);
    setPlayerSparks(prev => Math.max(0, prev - sparkWager));
    startNextSequence();
  }, [sparkWager, startNextSequence]);

  useEffect(() => {
    if (phase === 'showingSequence' || phase === 'answeringQuestions') {
      if (!totalTimerRef.current) {
        totalTimerRef.current = window.setInterval(() => {
          setTotalTimeLeft(prev => {
            if (prev <= 1) {
              setPhase('gameOver'); 
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } else {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
      totalTimerRef.current = null;
    }
    return () => { if (totalTimerRef.current) clearInterval(totalTimerRef.current); };
  }, [phase]);

  useEffect(() => {
    if (phase === 'showingSequence') {
      if (!sequenceTimerRef.current) {
        sequenceTimerRef.current = window.setInterval(() => {
          setSequenceDisplayTimeLeft(prev => {
            if (prev <= 1) {
              setPhase('answeringQuestions'); 
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } else {
      if (sequenceTimerRef.current) clearInterval(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
    return () => { if (sequenceTimerRef.current) clearInterval(sequenceTimerRef.current); };
  }, [phase]);
  
  useEffect(() => {
      if (phase === 'gameOver') {
          const didWin = score > (MEMORY_MIND_CORRECT_ANSWER_SCORE * MEMORY_MIND_MIN_QUESTIONS * 0.5 * sequencesCompleted) && sequencesCompleted > 0; 

          if (didWin) { 
              setPlayerSparks(prev => prev + (sparkWager * 2)); 
              setPlayerNeurons(prev => prev + NEURON_WIN_GENERAL);
          } else if (sequencesCompleted > 0) { 
              setPlayerNeurons(prev => prev + NEURON_LOSS_GENERAL); 
          }
      }
  }, [phase, score, sequencesCompleted, sparkWager]);


  const handleAnswerChange = (questionId: string, answer: string) => {
    setPlayerAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitAnswers = () => {
    let currentSequenceScore = 0;
    let allCorrect = true;
    currentQuestions.forEach(q => {
      if (playerAnswers[q.id] === q.correctAnswer) {
        currentSequenceScore += MEMORY_MIND_CORRECT_ANSWER_SCORE;
      } else {
        allCorrect = false;
      }
    });
    if (allCorrect && currentQuestions.length > 0) {
      currentSequenceScore += MEMORY_MIND_SEQUENCE_BONUS_SCORE;
    }
    setScore(prev => prev + currentSequenceScore);
    setLastSequenceScore(currentSequenceScore);
    setSequencesCompleted(prev => prev + 1);
    setPhase('sequenceResult');
  };

  const statusMessage = () => {
    switch (phase) {
      case 'idle': return "Ready to test your mind?";
      case 'showingSequence': return `Memorize! ${sequenceDisplayTimeLeft}s`;
      case 'answeringQuestions': return "Answer the questions!";
      case 'sequenceResult': return `Sequence Score: ${lastSequenceScore}. Total: ${score}.`;
      case 'gameOver': return `Game Over! Final Score: ${score}. Sequences: ${sequencesCompleted}.`;
      default: return "Loading Memory Mind...";
    }
  };

  const renderContent = () => {
    switch (phase) {
      case 'idle':
        return <MemoizedButton onClick={startGame} className={`${MEMORY_MIND_GOLD_BUTTON_BG} hover:!bg-yellow-600 ${MEMORY_MIND_GOLD_BUTTON_TEXT} !px-10 !py-4 text-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-600/40`}>Start Memory Mind ({sparkWager} Sparks)</MemoizedButton>;
      
      case 'showingSequence':
        return (
          <div className="w-full max-w-xl p-4 md:p-6 bg-black/60 rounded-xl border-2 border-purple-600/80 shadow-2xl shadow-purple-500/20">
            <div className={`grid grid-cols-${Math.min(currentSequence.length, 5)} gap-2.5 md:gap-3.5`}>
              {currentSequence.map(item => (
                <div key={item.id} className="aspect-square flex items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-800 rounded-lg text-2xl md:text-4xl font-bold text-yellow-300 shadow-lg animate-pulse animation-delay-random">
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        );

      case 'answeringQuestions':
        return (
          <div className="w-full max-w-xl p-4 md:p-6 bg-black/60 rounded-xl border-2 border-purple-600/80 shadow-2xl shadow-purple-500/20 space-y-4 md:space-y-5">
            {currentQuestions.map(q => (
              <div key={q.id} className="p-3.5 bg-gradient-to-br from-purple-800/70 to-indigo-900/70 rounded-lg shadow-md">
                <p className={`mb-2.5 text-sm md:text-base font-semibold ${MEMORY_MIND_GOLD_ACCENT}`}>{q.text}</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {q.options.map(opt => (
                    <MemoizedButton 
                      key={opt}
                      onClick={() => handleAnswerChange(q.id, opt)}
                      className={`
                        py-2.5 px-3 text-xs md:text-sm transition-all duration-150
                        ${playerAnswers[q.id] === opt ? `!${MEMORY_MIND_GOLD_BUTTON_BG} hover:!bg-yellow-600 !${MEMORY_MIND_GOLD_BUTTON_TEXT} ring-2 ring-yellow-200 shadow-md` : 'bg-purple-600/80 hover:bg-purple-500/95 text-gray-200'}
                      `}
                    >
                      {opt}
                    </MemoizedButton>
                  ))}
                </div>
              </div>
            ))}
            <MemoizedButton onClick={handleSubmitAnswers} className={`${MEMORY_MIND_GOLD_BUTTON_BG} hover:!bg-yellow-600 ${MEMORY_MIND_GOLD_BUTTON_TEXT} w-full !py-3 text-base md:text-lg mt-3 md:mt-4 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-600/40`}>Submit Answers</MemoizedButton>
          </div>
        );
        
      case 'sequenceResult':
        return (
            <div className="text-center p-4">
                <p className={`text-xl md:text-2xl mb-5 font-semibold ${MEMORY_MIND_GOLD_ACCENT}`}>Sequence Completed!</p>
                <MemoizedButton onClick={startNextSequence} className={`${MEMORY_MIND_GOLD_BUTTON_BG} hover:!bg-yellow-600 ${MEMORY_MIND_GOLD_BUTTON_TEXT} !px-8 !py-3 text-lg shadow-md`}>Next Sequence</MemoizedButton>
            </div>
        );

      case 'gameOver':
        return (
          <div className="text-center p-4 md:p-8 bg-black/70 rounded-xl border-2 border-yellow-500/80 shadow-2xl shadow-yellow-500/30">
            <p className={`text-2xl md:text-3xl font-bold mb-3 ${MEMORY_MIND_GOLD_ACCENT}`}>Game Over!</p>
            <p className="text-lg md:text-xl text-gray-200">Final Score: <span className={`${MEMORY_MIND_GOLD_ACCENT} font-bold`}>{score}</span></p>
            <p className="text-md text-gray-300">Sequences Completed: {sequencesCompleted}</p>
            <div className="mt-5 md:mt-8 space-y-3">
              <MemoizedButton onClick={startGame} className={`${MEMORY_MIND_GOLD_BUTTON_BG} hover:!bg-yellow-600 ${MEMORY_MIND_GOLD_BUTTON_TEXT} !px-8 !py-3 text-lg shadow-lg`}>Play Again ({sparkWager} Sparks)</MemoizedButton>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-full ${MEMORY_MIND_DEEP_PURPLE_BG} text-gray-100 p-2 md:p-4 relative overflow-hidden select-none`}>
      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
        <MemoizedButton onClick={onExitGame} variant="secondary" size="small" className="opacity-80 hover:opacity-100 !bg-purple-700/90 hover:!bg-purple-600 !text-sm !px-3 !py-1.5">Exit Game</MemoizedButton>
      </div>
      
      <h1 className={`text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-center mb-1.5 md:mb-2 ${MEMORY_MIND_GOLD_ACCENT}`}
          style={{ textShadow: `0 0 10px #FFD700, 0 0 18px #A100FF` }}>
        {gameName}
      </h1>

      <div className="p-1.5 md:p-2 rounded-lg text-center mb-2 md:mb-3 min-h-[44px] md:min-h-[auto]">
        <p className={`text-sm sm:text-base md:text-lg font-semibold transition-colors duration-300 ${phase === 'gameOver' && score <=0 ? 'text-red-300' : phase === 'gameOver' && score > 0 ? 'text-green-300' : MEMORY_MIND_GOLD_ACCENT}`}>
            {statusMessage()}
        </p>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5 mb-2.5 md:mb-4 p-2 md:p-2.5 bg-black/50 rounded-xl shadow-md text-xs md:text-sm">
        <div>Total Time: <span className={`${MEMORY_MIND_GOLD_ACCENT} font-orbitron text-base`}>{totalTimeLeft}s</span></div>
        <div className="border-l border-purple-500/50 h-5"></div>
        <div>Score: <span className={`${MEMORY_MIND_GOLD_ACCENT} font-orbitron text-base`}>{score}</span></div>
        <div className="border-l border-purple-500/50 h-5"></div>
        <div>Sequences: <span className={`${MEMORY_MIND_GOLD_ACCENT} font-orbitron text-base`}>{sequencesCompleted}</span></div>
      </div>
       <div className="flex items-center space-x-3 md:space-x-5 mb-3 md:mb-5 p-2 md:p-2.5 bg-black/40 rounded-xl shadow-sm text-xs md:text-sm">
        <div className="flex items-center">
          <SparkIcon className="w-4 h-4 mr-1.5 text-[#FFD700]" /> {playerSparks.toLocaleString()}
        </div>
        <div className="border-l border-purple-500/50 h-4"></div>
        <div className="flex items-center">
          <NeuronIcon className="w-4 h-4 mr-1.5 text-[#A100FF]" /> {playerNeurons.toLocaleString()}
        </div>
         <div className="border-l border-purple-500/50 h-4"></div>
        <div>Wager: <span className="text-[#FFD700] font-semibold">{sparkWager}</span> Sparks</div>
      </div>

      <div className="w-full max-w-xl flex-grow flex items-center justify-center my-2">
        {renderContent()}
      </div>
      
      <div className="mt-auto pt-2 md:pt-4 text-center text-xs text-yellow-200/80">
        <p>Memory Mind: Cortex Protocol. 18+ Play Responsibly.</p>
        <p>Memorize. Recall. Conquer.</p>
      </div>
        <style>{`
            .animation-delay-random {
                animation-delay: ${Math.random() * 0.5}s;
            }
            .font-orbitron { font-family: 'Orbitron', sans-serif; }
            .gold-sparkle-effect {
                animation: goldSparkle 1.5s infinite alternate;
            }
            @keyframes goldSparkle {
                0% { text-shadow: 0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFB000; }
                100% { text-shadow: 0 0 7px #FFF000, 0 0 12px #FFD700, 0 0 18px #FF8C00; }
            }
        `}</style>
    </div>
  );
});

export default MemoryMindGame;