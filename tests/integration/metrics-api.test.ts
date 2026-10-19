import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ValuationRecord, ValuationRepository } from '@/core/valuation';
import { createMetricsHandlers } from '@/services/metrics-handlers';

const metric: ValuationRecord = {
  id: 'metric-1',
  datasetName: 'Global Customer Graph',
  category: 'CRM',
  valuation: 1_250_000,
  confidence: 0.95,
  recordsCount: 500_000,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

function createRepository() {
  const repository: ValuationRepository = {
    list: vi.fn(async () => [metric]),
    createWithAudit: vi.fn(async () => metric),
  };
  return repository;
}

describe('metrics API handlers', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('lists metrics with validated filters and a default result limit', async () => {
    const repository = createRepository();
    const handlers = createMetricsHandlers(repository);
    const response = await handlers.GET(new Request('http://localhost/api/metrics?category=CRM'));

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, data: [{ id: 'metric-1' }] });
    expect(repository.list).toHaveBeenCalledWith({ category: 'CRM', limit: 50 });
  });

  it('rejects invalid query parameters', async () => {
    const repository = createRepository();
    const response = await createMetricsHandlers(repository).GET(
      new Request('http://localhost/api/metrics?limit=500')
    );

    expect(response.status).toBe(400);
    expect(repository.list).not.toHaveBeenCalled();
  });

  it('returns a generic server error when listing fails', async () => {
    const repository = createRepository();
    vi.mocked(repository.list).mockRejectedValueOnce(new Error('sensitive database detail'));

    const response = await createMetricsHandlers(repository).GET(
      new Request('http://localhost/api/metrics')
    );

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      success: false,
      error: 'Unable to load valuation metrics',
    });
    expect(console.error).toHaveBeenCalled();
  });

  it('rejects malformed JSON and invalid valuation payloads', async () => {
    const handlers = createMetricsHandlers(createRepository());
    const malformed = await handlers.POST(
      new Request('http://localhost/api/metrics', { method: 'POST', body: '{' })
    );
    const invalid = await handlers.POST(
      new Request('http://localhost/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: 'Finance' }),
      })
    );

    expect(malformed.status).toBe(400);
    expect(invalid.status).toBe(400);
  });

  it('creates a validated valuation', async () => {
    const repository = createRepository();
    const response = await createMetricsHandlers(repository).POST(
      new Request('http://localhost/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datasetName: 'Global Customer Graph',
          category: 'CRM',
          valuation: 1_250_000,
          confidence: 0.95,
          recordsCount: 500_000,
        }),
      })
    );

    expect(response.status).toBe(201);
    expect(await response.json()).toMatchObject({ success: true, data: { id: 'metric-1' } });
    expect(repository.createWithAudit).toHaveBeenCalled();
  });

  it('returns a generic server error when creating a valuation fails', async () => {
    const repository = createRepository();
    vi.mocked(repository.createWithAudit).mockRejectedValueOnce(
      new Error('sensitive database detail')
    );
    const response = await createMetricsHandlers(repository).POST(
      new Request('http://localhost/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datasetName: 'Global Customer Graph',
          category: 'CRM',
          valuation: 1_250_000,
          confidence: 0.95,
          recordsCount: 500_000,
        }),
      })
    );

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      success: false,
      error: 'Unable to create valuation metric',
    });
    expect(console.error).toHaveBeenCalled();
  });
});
