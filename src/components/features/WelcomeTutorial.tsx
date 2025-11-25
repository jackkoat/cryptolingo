import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface WelcomeTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

const slides = [
  {
    title: 'Welcome to CryptoLingo!',
    icon: '🚀',
    description: 'Learn blockchain and crypto concepts through interactive lessons',
    content: [
      'Earn XP for every lesson you complete',
      'Level up every 500 XP you earn',
      'Track your progress across learning paths',
      'Master crypto knowledge step by step'
    ]
  },
  {
    title: 'Build Your Streak',
    icon: '🔥',
    description: 'Daily learning makes you a crypto expert',
    content: [
      'Complete lessons every day to build your streak',
      'Maintain your streak to unlock special badges',
      'Get rewards for consistent learning',
      'Even 5 minutes a day makes a difference!'
    ]
  },
  {
    title: 'Unlock Achievements',
    icon: '🏆',
    description: 'Collect badges as you progress',
    content: [
      'Complete your first lesson for the First Steps badge',
      'Finish entire learning paths for special achievements',
      'Reach higher levels for milestone badges',
      'Show off your crypto expertise!'
    ]
  }
];

export function WelcomeTutorial({ onComplete, onSkip }: WelcomeTutorialProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <Card className="relative p-8 glass">
          {/* Skip Button */}
          <button
            onClick={onSkip}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Skip tutorial"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl text-5xl shadow-glow">
                  {slide.icon}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {slide.title}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8">
                {slide.description}
              </p>

              {/* Content List */}
              <div className="space-y-4 mb-8 text-left max-w-lg mx-auto">
                {slide.content.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="flex items-start gap-3 bg-purple-50 rounded-xl p-4"
                  >
                    <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-purple-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <Button
              variant="secondary"
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="flex-1"
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              className="flex-1"
            >
              {isLastSlide ? 'Get Started' : 'Next'}
              {!isLastSlide && <ChevronRight className="w-5 h-5 ml-1" />}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
