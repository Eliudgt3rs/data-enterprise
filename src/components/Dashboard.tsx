'use client';

import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MetricCard } from '@/components/MetricCard';
import { MetricCreateForm } from '@/components/MetricCreateForm';
import { Button } from '@/components/ui/button';
import type { ValuationRecord } from '@/core/valuation';
import { valuationMetricsResponseSchema } from '@/lib/validators';

export function Dashboard() {
  const [metrics, setMetrics] = useState<ValuationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    async function loadMetrics() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/metrics?limit=100', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Unable to load valuation metrics.');
        }
        const result = valuationMetricsResponseSchema.safeParse(await response.json());
        if (!result.success) {
          throw new Error('The valuation service returned an invalid response.');
        }
        setMetrics(result.data.data);
      } catch (cause) {
        if (cause instanceof Error && cause.name === 'AbortError') {
          return;
        }
        setError(cause instanceof Error ? cause.message : 'Unable to load valuation metrics.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadMetrics();
    return () => controller.abort();
  }, [refreshKey]);

  const totalValuation = metrics.reduce((total, metric) => total + metric.valuation, 0);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <DashboardHeader totalValuation={totalValuation} datasetCount={metrics.length} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              Valuation Portfolio
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Real-time economic valuation and quality scoring for corporate data assets.
            </p>
          </div>
          <Button
            variant="outline"
            type="button"
            onClick={() => setRefreshKey((key) => key + 1)}
            className="shrink-0 rounded-xl py-2"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Refresh
          </Button>
        </div>

        <MetricCreateForm
          onCreated={(metric) => {
            setMetrics((current) => [metric, ...current].slice(0, 100));
            setError(null);
          }}
        />

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-rose-900/80 bg-rose-950/40 p-4 text-sm text-rose-200"
          >
            {error}{' '}
            <button
              type="button"
              onClick={() => setRefreshKey((key) => key + 1)}
              className="ml-1 font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        )}

        {loading ? (
          <p role="status" className="py-12 text-center text-sm text-slate-400">
            Loading valuations…
          </p>
        ) : metrics.length === 0 && !error ? (
          <div className="my-12 rounded-3xl border-2 border-dashed border-slate-800 bg-slate-950/40 p-12 text-center">
            <h3 className="text-lg font-bold text-white">No valuations recorded</h3>
            <p className="mt-2 text-sm text-slate-400">
              Add your first data asset above to start building your portfolio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.id}
                datasetName={metric.datasetName}
                category={metric.category}
                valuation={metric.valuation}
                confidence={metric.confidence}
                recordsCount={metric.recordsCount}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
