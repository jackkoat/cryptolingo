import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, UserProgress } from '../lib/supabase';
import { LEARNING_PATHS, LESSONS } from '../data/lessons';
import { Card } from '../components/ui/Card';
import { LessonCard } from '../components/features/LessonCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { InteractiveBackground } from '../components/InteractiveBackground';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function LearningPathPage() {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const path = LEARNING_PATHS.find(p => p.id === pathId);
  const pathLessons = LESSONS.filter(l => l.pathId === pathId);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    loadProgress();
  }, [user, navigate]);

  async function loadProgress() {
    if (!user || !pathId) return;

    try {
      const { data } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.walletAddress)
        .eq('path_id', pathId);
      
      if (data) setUserProgress(data);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  }

  if (!path || loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body text-neutral-700">Loading...</p>
        </div>
      </div>
    );
  }

  const completedLessons = userProgress.filter(p => p.is_completed).length;
  const totalXPEarned = userProgress.reduce((sum, p) => sum + (p.xp_earned || 0), 0);

  const isLessonLocked = (lessonIndex: number) => {
    if (lessonIndex === 0) return false;
    const previousLesson = pathLessons[lessonIndex - 1];
    return !userProgress.some(p => p.lesson_id === previousLesson.id && p.is_completed);
  };

  const isLessonCompleted = (lessonId: string) => {
    return userProgress.some(p => p.lesson_id === lessonId && p.is_completed);
  };

  // Find the first uncompleted lesson for pulsing glow animation
  const getFirstUncompletedLessonId = () => {
    for (let i = 0; i < pathLessons.length; i++) {
      if (!isLessonLocked(i) && !isLessonCompleted(pathLessons[i].id)) {
        return pathLessons[i].id;
      }
    }
    return null;
  };

  const firstUncompletedLessonId = getFirstUncompletedLessonId();

  return (
    <div className="min-h-screen bg-transparent py-12">
      <InteractiveBackground />
      <div className="container mx-auto px-4">
        <Button
          variant="secondary"
          onClick={() => navigate('/dashboard')}
          className="mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Button>

        {/* Path Header */}
        <div className="mb-12">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-8 h-8 text-primary-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-h1 text-neutral-900 mb-2">{path.name}</h1>
              <p className="text-large text-neutral-700 mb-6">{path.description}</p>
              <ProgressBar
                value={completedLessons}
                max={pathLessons.length}
                showLabel
                className="max-w-md"
              />
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <p className="text-small text-neutral-500 mb-1">Progress</p>
            <p className="text-xp-medium text-neutral-900">
              {completedLessons}/{pathLessons.length}
            </p>
          </Card>
          <Card>
            <p className="text-small text-neutral-500 mb-1">XP Earned</p>
            <p className="text-xp-medium text-success-600">{totalXPEarned}</p>
          </Card>
          <Card>
            <p className="text-small text-neutral-500 mb-1">Estimated Time</p>
            <p className="text-xp-medium text-neutral-900">
              {pathLessons.reduce((sum, l) => sum + l.estimatedMinutes, 0)} min
            </p>
          </Card>
        </div>

        {/* Lessons List */}
        <section>
          <h2 className="text-h2 text-neutral-900 mb-6">Lessons</h2>
          <div className="space-y-4">
            {pathLessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isLocked={isLessonLocked(index)}
                isCompleted={isLessonCompleted(lesson.id)}
                isFirstLesson={lesson.id === firstUncompletedLessonId}
                onClick={() => !isLessonLocked(index) && navigate(`/lesson/${lesson.id}`)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
