import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('wallet');

    const paths = await prisma.learningPath.findMany({
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            order: true,
            xpReward: true,
          },
        },
      },
    });

    // If wallet address provided, include progress
    if (walletAddress) {
      const progressData = await prisma.userProgress.findMany({
        where: {
          userId: walletAddress,
        },
        select: {
          lessonId: true,
          completed: true,
          xpEarned: true,
        },
      });

      const progressMap = new Map(
        progressData.map((p) => [p.lessonId, p])
      );

      const pathsWithProgress = paths.map((path) => {
        const completedLessons = path.lessons.filter((lesson) =>
          progressMap.get(lesson.id)?.completed
        ).length;
        const progress =
          path.totalLessons > 0
            ? (completedLessons / path.totalLessons) * 100
            : 0;

        return {
          ...path,
          progress,
          completedLessons,
        };
      });

      return NextResponse.json({ data: pathsWithProgress });
    }

    return NextResponse.json({ data: paths });
  } catch (error) {
    console.error('Error fetching learning paths:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning paths' },
      { status: 500 }
    );
  }
}
