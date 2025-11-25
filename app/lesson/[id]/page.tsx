'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { QuestionCard } from '@/components/features/QuestionCard';
import { LessonComplete } from '@/components/features/LessonComplete';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Card } from '@/components/ui/Card';
import { Question } from '@/lib/types';

interface LessonData {
  id: string;
  title: string;
  learningPathId: string;
  xpReward: number;
  content: {
    questions: Question[];
  };
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { publicKey } = useWallet();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [completionData, setCompletionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!publicKey) {
      router.push('/');
      return;
    }

    const fetchLesson = async () => {
      try {
        // Get lesson from learning path (we need to fetch the path to get the lesson)
        const pathsResponse = await fetch('/api/learning-paths');
        if (!pathsResponse.ok) return;

        const pathsData = await pathsResponse.json();
        let foundLesson: LessonData | null = null;

        for (const path of pathsData.data) {
          const pathResponse = await fetch(
            `/api/learning-paths/${path.id}?wallet=${publicKey.toString()}`
          );
          if (pathResponse.ok) {
            const pathData = await pathResponse.json();
            const lessonInPath = pathData.data.lessons.find(
              (l: any) => l.id === params.id
            );
            if (lessonInPath) {
              foundLesson = lessonInPath;
              break;
            }
          }
        }

        if (foundLesson) {
          setLesson(foundLesson);
        } else {
          router.push('/learning-paths');
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
        router.push('/learning-paths');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchLesson();
    }
  }, [params.id, publicKey, router]);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers((prev) => prev + 1);
    }

    if (
      lesson &&
      currentQuestionIndex < lesson.content.questions.length - 1
    ) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      completeLesson();
    }
  };

  const completeLesson = async () => {
    if (!publicKey || !lesson) return;

    try {
      const response = await fetch('/api/lesson/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: publicKey.toString(),
          lessonId: lesson.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCompletionData(data.data);
        setCompleted(true);
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  if (!publicKey) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!lesson) {
    return null;
  }

  if (completed && completionData) {
    return (
      <LessonComplete
        xpEarned={completionData.xpEarned}
        newTotalXp={completionData.newTotalXp}
        newLevel={completionData.newLevel}
        leveledUp={completionData.leveledUp}
        pathId={lesson.learningPathId}
      />
    );
  }

  const currentQuestion = lesson.content.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / lesson.content.questions.length) * 100;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back
          </button>
        </div>
        <ProgressBar progress={progress} showLabel />
      </div>

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={lesson.content.questions.length}
      />

      {/* Score */}
      <Card className="mt-8 p-4 text-center" glass>
        <p className="text-sm text-gray-600">
          Correct Answers: {correctAnswers} /{' '}
          {lesson.content.questions.length}
        </p>
      </Card>
    </div>
  );
}
