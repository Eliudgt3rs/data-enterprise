import { getEnvironment } from '../src/lib/environment';
import { prisma } from '../src/infrastructure/prisma';
import { migrations } from './migrations';

async function main() {
  getEnvironment();

  for (const migration of migrations) {
    const applied = await prisma.dataMigration.findUnique({
      where: { version: migration.version },
      select: { version: true },
    });
    if (applied) {
      console.info(`Skipping applied migration ${migration.version}`);
      continue;
    }

    console.info(`Applying ${migration.version}: ${migration.description}`);
    await migration.up(prisma);
    await prisma.dataMigration.create({ data: { version: migration.version } });
    console.info(`Applied migration ${migration.version}`);
  }
}

main()
  .catch((error: unknown) => {
    console.error('MongoDB data migration failed', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
