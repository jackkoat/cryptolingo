import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('wallet');

    const path = await prisma.learningPath.findUnique({
      where: { id },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            order: true,
            xpReward: true,
            content: true,
          },
        },
      },
    });

    if (!path) {
      return NextResponse.json(
        { error: 'Learning path not found' },
        { status: 404 }
      );
    }

    // If wallet provided, include progress and locked state
    if (walletAddress) {
      const progressData = await prisma.userProgress.findMany({
        where: {
          userId: walletAddress,
          lessonId: { in: path.lessons.map((l) => l.id) },
        },
      });

      const progressMap = new Map(
        progressData.map((p) => [p.lessonId, p])
      );

      const lessonsWithProgress = path.lessons.map((lesson, index) => {
        const progress = progressMap.get(lesson.id);
        const isFirstLesson = index === 0;
        const previousLessonCompleted =
          index > 0 && progressMap.get(path.lessons[index - 1].id)?.completed;

        return {
          ...lesson,
          completed: progress?.completed ?? false,
          locked: !isFirstLesson && !previousLessonCompleted,
          xpEarned: progress?.xpEarned ?? 0,
        };
      });

      return NextResponse.json({
        data: {
          ...path,
          lessons: lessonsWithProgress,
        },
      });
    }

    return NextResponse.json({ data: path });
  } catch (error) {
    console.error('Error fetching learning path:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning path' },
      { status: 500 }
    );
  }
}
