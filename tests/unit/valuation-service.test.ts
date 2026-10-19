import { describe, expect, it, vi } from 'vitest';
import type { ValuationRepository } from '@/core/valuation';
import { createValuation, listValuations } from '@/services/valuation-service';

const record = {
  id: 'metric-1',
  datasetName: 'Customer Graph',
  category: 'CRM',
  valuation: 100,
  confidence: 0.9,
  recordsCount: 10,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

describe('valuation application service', () => {
  it('delegates list filters to the repository', async () => {
    const repository: ValuationRepository = {
      list: vi.fn(async () => [record]),
      createWithAudit: vi.fn(async () => record),
    };
    const filters = { category: 'CRM', limit: 25 };

    await expect(listValuations(repository, filters)).resolves.toEqual([record]);
    expect(repository.list).toHaveBeenCalledWith(filters);
  });

  it('writes an audit entry when creating a valuation', async () => {
    const repository: ValuationRepository = {
      list: vi.fn(async () => [record]),
      createWithAudit: vi.fn(async () => record),
    };
    const input = {
      datasetName: 'Customer Graph',
      category: 'CRM',
      valuation: 100,
      confidence: 0.9,
      recordsCount: 10,
    };

    await expect(createValuation(repository, input)).resolves.toEqual(record);
    expect(repository.createWithAudit).toHaveBeenCalledWith(input, {
      action: 'CREATE_METRIC',
      details: 'Created valuation metric for dataset: Customer Graph',
    });
  });
});
