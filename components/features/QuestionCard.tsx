'use client';

import { FC, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Question } from '@/lib/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuestionCard: FC<QuestionCardProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(
    null
  );
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect =
      question.type === 'multiple-choice'
        ? selectedAnswer === question.correctAnswer
        : question.type === 'true-false'
        ? selectedAnswer === question.correctAnswer
        : question.type === 'fill-blank'
        ? (selectedAnswer as string).toLowerCase().trim() ===
          (question.correctAnswer as string).toLowerCase().trim()
        : false;

    setShowExplanation(true);
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }, 2000);
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                } disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="flex gap-4">
            {[true, false].map((value) => (
              <button
                key={value.toString()}
                onClick={() => setSelectedAnswer(value)}
                disabled={showExplanation}
                className={`flex-1 p-6 rounded-xl border-2 font-semibold transition-all ${
                  selectedAnswer === value
                    ? showExplanation
                      ? value === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                } disabled:cursor-not-allowed`}
              >
                {value ? 'True' : 'False'}
              </button>
            ))}
          </div>
        );

      case 'fill-blank':
        return (
          <input
            type="text"
            value={(selectedAnswer as string) || ''}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            disabled={showExplanation}
            placeholder="Type your answer..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-50"
          />
        );

      case 'matching':
        return (
          <div className="bg-purple-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600 mb-3">
              Match the following terms with their definitions:
            </p>
            {question.matchingPairs?.map((pair, index) => (
              <div key={index} className="mb-2 p-3 bg-white rounded-lg">
                <span className="font-medium">{pair.term}</span>
                <span className="mx-2">→</span>
                <span className="text-gray-600">{pair.definition}</span>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-purple-600">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {question.question}
        </h3>
      </div>

      {renderQuestion()}

      {showExplanation && (
        <div
          className={`mt-6 p-4 rounded-xl ${
            selectedAnswer === question.correctAnswer ||
            (question.type === 'fill-blank' &&
              (selectedAnswer as string).toLowerCase().trim() ===
                (question.correctAnswer as string).toLowerCase().trim())
              ? 'bg-green-50 border-2 border-green-500'
              : 'bg-red-50 border-2 border-red-500'
          }`}
        >
          <p className="font-medium mb-2">
            {selectedAnswer === question.correctAnswer ||
            (question.type === 'fill-blank' &&
              (selectedAnswer as string).toLowerCase().trim() ===
                (question.correctAnswer as string).toLowerCase().trim())
              ? '✓ Correct!'
              : '✗ Incorrect'}
          </p>
          <p className="text-sm">{question.explanation}</p>
        </div>
      )}

      {!showExplanation && question.type !== 'matching' && (
        <div className="mt-6">
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full"
            size="lg"
          >
            Submit Answer
          </Button>
        </div>
      )}

      {question.type === 'matching' && !showExplanation && (
        <div className="mt-6">
          <Button
            onClick={() => {
              onAnswer(true);
            }}
            className="w-full"
            size="lg"
          >
            Continue
          </Button>
        </div>
      )}
    </Card>
  );
};
