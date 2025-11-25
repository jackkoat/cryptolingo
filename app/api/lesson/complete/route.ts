import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateLevel, checkStreak } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { walletAddress, lessonId } = body;

    // Validation
    if (!walletAddress || !lessonId) {
      return NextResponse.json(
        { error: 'Missing required fields: walletAddress and lessonId' },
        { status: 400 }
      );
    }

    // Check if lesson exists
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { xpReward: true },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Check if already completed
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: walletAddress,
          lessonId,
        },
      },
    });

    if (existingProgress?.completed) {
      return NextResponse.json(
        { error: 'Lesson already completed' },
        { status: 400 }
      );
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { id: walletAddress },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: walletAddress,
          level: 1,
          totalXp: 0,
          streakDays: 1,
          lastActive: new Date(),
        },
      });
    }

    // Calculate new XP and level
    const newTotalXp = user.totalXp + lesson.xpReward;
    const newLevel = calculateLevel(newTotalXp);

    // Check and update streak
    const streakUpdate = checkStreak(user.lastActive);
    const newStreak = streakUpdate === -1 ? user.streakDays : streakUpdate;

    // Update user and create/update progress in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update user
      const updatedUser = await tx.user.update({
        where: { id: walletAddress },
        data: {
          totalXp: newTotalXp,
          level: newLevel,
          streakDays: newStreak,
          lastActive: new Date(),
        },
      });

      // Upsert progress
      const progress = await tx.userProgress.upsert({
        where: {
          userId_lessonId: {
            userId: walletAddress,
            lessonId,
          },
        },
        create: {
          userId: walletAddress,
          lessonId,
          completed: true,
          completedAt: new Date(),
          xpEarned: lesson.xpReward,
        },
        update: {
          completed: true,
          completedAt: new Date(),
          xpEarned: lesson.xpReward,
        },
      });

      return { user: updatedUser, progress };
    });

    return NextResponse.json({
      data: {
        success: true,
        xpEarned: lesson.xpReward,
        newTotalXp,
        newLevel,
        leveledUp: newLevel > user.level,
        newStreak,
        user: result.user,
      },
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    return NextResponse.json(
      { error: 'Failed to complete lesson' },
      { status: 500 }
    );
  }
}
