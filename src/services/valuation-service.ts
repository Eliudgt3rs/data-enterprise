import type { ValuationMetricInput } from '@/lib/validators';
import type { ValuationFilters, ValuationRecord, ValuationRepository } from '@/core/valuation';

export function listValuations(
  repository: ValuationRepository,
  filters: ValuationFilters
): Promise<ValuationRecord[]> {
  return repository.list(filters);
}

export function createValuation(
  repository: ValuationRepository,
  input: ValuationMetricInput
): Promise<ValuationRecord> {
  return repository.createWithAudit(input, {
    action: 'CREATE_METRIC',
    details: `Created valuation metric for dataset: ${input.datasetName}`,
  });
}
