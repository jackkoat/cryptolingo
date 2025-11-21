import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle2, XCircle, ThumbsUp, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Question } from '../../data/lessons';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string | number | boolean) => void;
}

// Encouraging messages that rotate
const CORRECT_MESSAGES = [
  'Awesome!',
  'Perfect!',
  'You got it!',
  'Brilliant!',
  'Spot on!',
  'Nice work!',
  'Excellent!',
  'Great job!',
  'Well done!',
  'Fantastic!',
  'You nailed it!',
  'Amazing!',
  'Superb!',
  'Outstanding!',
];

const INCORRECT_MESSAGES = [
  'Not quite, but keep going!',
  'Nice try! Learn and try again.',
  'Almost there! You can do it!',
  'Good effort! Keep learning.',
  'Don\'t worry, practice makes perfect!',
];

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [encouragingMessage, setEncouragingMessage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const handleMultipleChoiceAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleTrueFalseAnswer = (value: boolean) => {
    if (isAnswered) return;
    setSelectedAnswer(value);
  };

  const handleFillBlankAnswer = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleMatchingSelect = (term: string, definition?: string) => {
    if (definition) {
      // Definition clicked
      if (selectedTerm) {
        setMatchedPairs({ ...matchedPairs, [selectedTerm]: definition });
        setSelectedTerm(null);
      }
    } else {
      // Term clicked
      setSelectedTerm(term === selectedTerm ? null : term);
    }
  };

  const checkAnswer = () => {
    let isCorrect = false;
    let userAnswer: string | number | boolean = selectedAnswer || '';

    if (question.type === 'multiple-choice') {
      isCorrect = selectedAnswer === question.correctAnswer;
      userAnswer = selectedAnswer as number;
    } else if (question.type === 'true-false') {
      isCorrect = selectedAnswer === question.correctAnswer;
      userAnswer = selectedAnswer as boolean;
    } else if (question.type === 'fill-blank') {
      const userInput = (selectedAnswer as string || '').toLowerCase().trim();
      const correctInput = (question.correctAnswer as string).toLowerCase().trim();
      isCorrect = userInput === correctInput;
      userAnswer = selectedAnswer as string;
    } else if (question.type === 'matching') {
      const correctPairs = question.matchingPairs || [];
      isCorrect = correctPairs.every(pair => matchedPairs[pair.term] === pair.definition);
      userAnswer = JSON.stringify(matchedPairs);
    }

    // Set encouraging message
    const messages = isCorrect ? CORRECT_MESSAGES : INCORRECT_MESSAGES;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setEncouragingMessage(randomMessage);

    setIsAnswered(true);
    setShowCelebration(isCorrect);
    onAnswer(isCorrect, userAnswer);

    // Hide celebration after animation
    if (isCorrect) {
      setTimeout(() => setShowCelebration(false), 1500);
    }
  };

  const canCheck = 
    question.type === 'multiple-choice' ? selectedAnswer !== null :
    question.type === 'true-false' ? selectedAnswer !== null :
    question.type === 'fill-blank' ? selectedAnswer && (selectedAnswer as string).trim().length > 0 :
    Object.keys(matchedPairs).length === (question.matchingPairs?.length || 0);

  const isCorrectAnswer = 
    (question.type === 'multiple-choice' && selectedAnswer === question.correctAnswer) ||
    (question.type === 'true-false' && selectedAnswer === question.correctAnswer) ||
    (question.type === 'fill-blank' && selectedAnswer?.toString().toLowerCase().trim() === question.correctAnswer.toString().toLowerCase().trim()) ||
    (question.type === 'matching' && question.matchingPairs?.every(pair => matchedPairs[pair.term] === pair.definition));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-2xl mx-auto relative overflow-hidden">
        {/* Celebration sparkles */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-4 right-4 text-success-500"
            >
              <Sparkles className="w-8 h-8 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        <h3 className="text-h3 text-neutral-900 mb-6">{question.question}</h3>

        {/* Multiple Choice */}
        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = isAnswered;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleMultipleChoiceAnswer(index)}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.02, x: 4 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  className={cn(
                    'w-full p-4 rounded-lg border-2 text-left transition-all duration-200',
                    !isAnswered && 'hover:bg-neutral-50 hover:border-primary-300 cursor-pointer',
                    isSelected && !showResult && 'bg-primary-100 border-primary-500 shadow-md',
                    !isSelected && !showResult && 'border-neutral-200',
                    showResult && isCorrect && 'bg-success-50 border-success-500 shadow-glow-green',
                    showResult && isSelected && !isCorrect && 'bg-error-50 border-error-500',
                    showResult && !isCorrect && !isSelected && 'border-neutral-200 opacity-60'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-body text-neutral-700">{option}</span>
                    <AnimatePresence>
                      {showResult && isCorrect && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                          <CheckCircle2 className="w-6 h-6 text-success-500" />
                        </motion.div>
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          <XCircle className="w-6 h-6 text-error-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* True/False */}
        {question.type === 'true-false' && (
          <div className="flex gap-4 mb-6">
            {[true, false].map((value) => {
              const isSelected = selectedAnswer === value;
              const isCorrect = value === question.correctAnswer;
              const showResult = isAnswered;

              return (
                <motion.button
                  key={value.toString()}
                  onClick={() => handleTrueFalseAnswer(value)}
                  disabled={isAnswered}
                  whileHover={!isAnswered ? { scale: 1.05 } : {}}
                  whileTap={!isAnswered ? { scale: 0.95 } : {}}
                  className={cn(
                    'flex-1 p-6 rounded-lg border-2 text-center font-semibold text-lg transition-all duration-200',
                    !isAnswered && 'hover:bg-neutral-50 hover:border-primary-300 cursor-pointer',
                    isSelected && !showResult && 'bg-primary-100 border-primary-500 shadow-md',
                    !isSelected && !showResult && 'border-neutral-200',
                    showResult && isCorrect && 'bg-success-50 border-success-500 shadow-glow-green',
                    showResult && isSelected && !isCorrect && 'bg-error-50 border-error-500',
                    showResult && !isCorrect && !isSelected && 'border-neutral-200 opacity-60'
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{value ? 'True' : 'False'}</span>
                    <AnimatePresence>
                      {showResult && isCorrect && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                          <CheckCircle2 className="w-6 h-6 text-success-500" />
                        </motion.div>
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          <XCircle className="w-6 h-6 text-error-500" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Fill in the Blank */}
        {question.type === 'fill-blank' && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <input
              type="text"
              value={selectedAnswer as string || ''}
              onChange={(e) => handleFillBlankAnswer(e.target.value)}
              disabled={isAnswered}
              placeholder="Type your answer..."
              className={cn(
                'w-full p-4 rounded-lg border-2 text-body transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                !isAnswered && 'hover:border-primary-300',
                isAnswered && isCorrectAnswer && 'ring-2 ring-success-500 bg-success-50',
                isAnswered && !isCorrectAnswer && 'ring-2 ring-error-500 bg-error-50 animate-shake'
              )}
            />
          </motion.div>
        )}

        {/* Matching */}
        {question.type === 'matching' && question.matchingPairs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-neutral-900 mb-3">Terms</h4>
              {question.matchingPairs.map((pair) => (
                <motion.button
                  key={pair.term}
                  onClick={() => handleMatchingSelect(pair.term)}
                  disabled={isAnswered || !!matchedPairs[pair.term]}
                  whileHover={!isAnswered && !matchedPairs[pair.term] ? { scale: 1.02, x: 4 } : {}}
                  whileTap={!isAnswered && !matchedPairs[pair.term] ? { scale: 0.98 } : {}}
                  className={cn(
                    'w-full p-3 rounded-lg border-2 text-left transition-all duration-200',
                    selectedTerm === pair.term && 'bg-primary-100 border-primary-500 shadow-md',
                    matchedPairs[pair.term] && 'bg-success-100 border-success-200',
                    !selectedTerm && !matchedPairs[pair.term] && 'border-neutral-200 hover:bg-neutral-50 hover:border-primary-300'
                  )}
                >
                  {pair.term}
                </motion.button>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-neutral-900 mb-3">Definitions</h4>
              {question.matchingPairs.map((pair) => (
                <motion.button
                  key={pair.definition}
                  onClick={() => handleMatchingSelect('', pair.definition)}
                  disabled={isAnswered || Object.values(matchedPairs).includes(pair.definition)}
                  whileHover={!isAnswered && !Object.values(matchedPairs).includes(pair.definition) ? { scale: 1.02, x: -4 } : {}}
                  whileTap={!isAnswered && !Object.values(matchedPairs).includes(pair.definition) ? { scale: 0.98 } : {}}
                  className={cn(
                    'w-full p-3 rounded-lg border-2 text-left transition-all duration-200',
                    Object.values(matchedPairs).includes(pair.definition) && 'bg-success-100 border-success-200',
                    !Object.values(matchedPairs).includes(pair.definition) && 'border-neutral-200 hover:bg-neutral-50 hover:border-primary-300'
                  )}
                >
                  {pair.definition}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Message */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'p-4 rounded-lg mb-6 border',
                isCorrectAnswer
                  ? 'bg-success-50 border-success-200'
                  : 'bg-error-50 border-error-500'
              )}
            >
              <div className="flex items-start gap-3">
                {isCorrectAnswer && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <ThumbsUp className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                  </motion.div>
                )}
                <div>
                  <p className="font-semibold text-neutral-900 mb-1">{encouragingMessage}</p>
                  <p className="text-body text-neutral-700">{question.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Check Answer Button */}
        {!isAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              onClick={checkAnswer} 
              disabled={!canCheck} 
              className="w-full"
            >
              Check Answer
            </Button>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}
