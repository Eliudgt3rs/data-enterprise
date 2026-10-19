import type { PrismaClient } from '@prisma/client';
import type {
  AuditEntry,
  ValuationFilters,
  ValuationRecord,
  ValuationRepository,
} from '@/core/valuation';
import type { ValuationMetricInput } from '@/lib/validators';

export class PrismaValuationRepository implements ValuationRepository {
  constructor(private readonly database: PrismaClient) {}

  list(filters: ValuationFilters): Promise<ValuationRecord[]> {
    return this.database.valuationMetric.findMany({
      where: filters.category ? { category: filters.category } : undefined,
      take: filters.limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  createWithAudit(input: ValuationMetricInput, audit: AuditEntry): Promise<ValuationRecord> {
    return this.database.$transaction(async (transaction) => {
      const metric = await transaction.valuationMetric.create({ data: input });
      await transaction.auditLog.create({ data: audit });
      return metric;
    });
  }
}
