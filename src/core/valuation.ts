import type { ValuationMetricInput } from '@/lib/validators';

export interface ValuationRecord extends ValuationMetricInput {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ValuationFilters {
  category?: string;
  limit: number;
}

export interface AuditEntry {
  action: string;
  details: string;
}

export interface ValuationRepository {
  list(filters: ValuationFilters): Promise<ValuationRecord[]>;
  createWithAudit(input: ValuationMetricInput, audit: AuditEntry): Promise<ValuationRecord>;
}
