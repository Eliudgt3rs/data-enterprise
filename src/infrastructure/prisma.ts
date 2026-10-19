import { PrismaClient } from '@prisma/client';
import { getEnvironment } from '@/lib/environment';

const createPrismaClient = () => {
  const environment = getEnvironment();
  return new PrismaClient({
    datasourceUrl: environment.DATABASE_URL,
    log: environment.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
};

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
