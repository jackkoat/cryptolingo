import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ACHIEVEMENTS } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: { wallet: string } }
) {
  try {
    const { wallet } = params;

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { id: wallet },
      include: {
        progress: {
          where: { completed: true },
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
                xpReward: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          id: wallet,
          level: 1,
          totalXp: 0,
          streakDays: 1,
          lastActive: new Date(),
        },
        include: {
          progress: {
            where: { completed: true },
            include: {
              lesson: {
                select: {
                  id: true,
                  title: true,
                  xpReward: true,
                },
              },
            },
          },
        },
      });
    }

    // Get total lessons count
    const totalLessons = await prisma.lesson.count();

    // Calculate achievements
    const stats = {
      level: user.level,
      totalXp: user.totalXp,
      streakDays: user.streakDays,
      completedLessons: user.progress.length,
      totalLessons,
    };

    const achievements = ACHIEVEMENTS.map((achievement) => ({
      ...achievement,
      unlocked: achievement.requirement(stats),
    }));

    return NextResponse.json({
      data: {
        user: {
          id: user.id,
          username: user.username,
          level: user.level,
          totalXp: user.totalXp,
          streakDays: user.streakDays,
          lastActive: user.lastActive,
        },
        completedLessons: user.progress.length,
        totalLessons,
        achievements,
        recentActivity: user.progress.slice(0, 5),
      },
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user progress' },
      { status: 500 }
    );
  }
}
