import { PrismaClient } from '@prisma/client';
import { LESSONS, LEARNING_PATHS } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.userProgress.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.learningPath.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Creating learning paths...');
  
  // Create learning paths
  const pathMap = new Map();
  for (const path of LEARNING_PATHS) {
    const createdPath = await prisma.learningPath.create({
      data: {
        title: path.name,
        slug: path.id,
        description: path.description,
        totalXp: path.totalXP,
        totalLessons: path.lessons.length,
        order: LEARNING_PATHS.indexOf(path) + 1,
      },
    });
    pathMap.set(path.id, createdPath.id);
    console.log(`Created path: ${path.name}`);
  }

  console.log('Creating lessons...');
  
  // Create lessons
  for (const lesson of LESSONS) {
    const pathId = pathMap.get(lesson.pathId);
    if (!pathId) {
      console.warn(`Path not found for lesson: ${lesson.id}`);
      continue;
    }

    await prisma.lesson.create({
      data: {
        learningPathId: pathId,
        title: lesson.title,
        content: {
          questions: lesson.questions,
        },
        order: lesson.questions[0]?.id.startsWith('bb') ? 1 :
               lesson.questions[0]?.id.startsWith('uc') ? 2 :
               lesson.questions[0]?.id.startsWith('ks') ? 3 :
               lesson.questions[0]?.id.startsWith('wb') ? 4 :
               lesson.questions[0]?.id.startsWith('wd') ? 5 :
               lesson.questions[0]?.id.startsWith('st') ? 6 :
               lesson.questions[0]?.id.startsWith('lp') ? 7 : 8,
        xpReward: lesson.xpReward,
      },
    });
    console.log(`Created lesson: ${lesson.title}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
