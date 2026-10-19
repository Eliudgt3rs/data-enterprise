import type { PrismaClient } from '@prisma/client';

export interface DataMigration {
  version: string;
  description: string;
  up: (database: PrismaClient) => Promise<void>;
}

export const migrations: DataMigration[] = [
  {
    version: '20261019000000_normalize_metric_categories',
    description: 'Trim and uppercase existing valuation metric categories.',
    async up(database) {
      let cursorId: string | undefined;

      while (true) {
        const records = await database.valuationMetric.findMany({
          select: { id: true, category: true },
          orderBy: { id: 'asc' },
          take: 500,
          ...(cursorId ? { cursor: { id: cursorId }, skip: 1 } : {}),
        });

        if (records.length === 0) {
          break;
        }

        for (const record of records) {
          const category = record.category.trim().toUpperCase() || 'UNCATEGORIZED';
          if (category !== record.category) {
            await database.valuationMetric.update({
              where: { id: record.id },
              data: { category },
            });
          }
        }

        const lastRecord = records.at(-1);
        if (!lastRecord) {
          break;
        }
        cursorId = lastRecord.id;
      }
    },
  },
];
