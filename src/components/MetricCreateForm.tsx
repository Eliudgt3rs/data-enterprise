'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { valuationMetricResponseSchema, valuationMetricSchema } from '@/lib/validators';
import type { ValuationRecord } from '@/core/valuation';

interface MetricCreateFormProps {
  onCreated: (metric: ValuationRecord) => void;
}

export function MetricCreateForm({ onCreated }: MetricCreateFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const validation = valuationMetricSchema.safeParse({
      datasetName: formData.get('datasetName'),
      category: formData.get('category'),
      valuation: Number(formData.get('valuation')),
      confidence: Number(formData.get('confidence')),
      recordsCount: Number(formData.get('recordsCount')),
    });

    if (!validation.success) {
      setError(validation.error.issues[0]?.message ?? 'Check the valuation details and try again.');
      return;
    }

    setPending(true);
    try {
      const response = await fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });
      if (!response.ok) {
        setError('Unable to save this valuation. Check the details and try again.');
        return;
      }

      const result = valuationMetricResponseSchema.safeParse(await response.json());
      if (!result.success) {
        setError('The server returned an invalid valuation response.');
        return;
      }

      onCreated(result.data.data);
      form.reset();
    } catch {
      setError('Unable to reach the valuation service. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <Card aria-labelledby="new-valuation-title" className="mb-8">
      <div className="mb-5">
        <h3 id="new-valuation-title" className="text-lg font-bold text-white">
          Record a data asset
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Add a valuation to your portfolio with its category, data volume, and confidence score.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <label htmlFor="datasetName" className="mb-1.5 block text-xs font-medium text-slate-300">
            Dataset name
          </label>
          <Input
            id="datasetName"
            name="datasetName"
            required
            maxLength={100}
            placeholder="Global Customer Graph"
          />
        </div>
        <div>
          <label htmlFor="category" className="mb-1.5 block text-xs font-medium text-slate-300">
            Category
          </label>
          <Input id="category" name="category" required maxLength={50} placeholder="CRM" />
        </div>
        <div>
          <label htmlFor="valuation" className="mb-1.5 block text-xs font-medium text-slate-300">
            Valuation (USD)
          </label>
          <Input
            id="valuation"
            name="valuation"
            type="number"
            min="0.01"
            step="0.01"
            required
            placeholder="1250000"
          />
        </div>
        <div>
          <label htmlFor="recordsCount" className="mb-1.5 block text-xs font-medium text-slate-300">
            Records
          </label>
          <Input
            id="recordsCount"
            name="recordsCount"
            type="number"
            min="1"
            step="1"
            required
            placeholder="500000"
          />
        </div>
        <div>
          <label htmlFor="confidence" className="mb-1.5 block text-xs font-medium text-slate-300">
            Confidence (0-1)
          </label>
          <Input
            id="confidence"
            name="confidence"
            type="number"
            min="0"
            max="1"
            step="0.01"
            defaultValue="0.95"
            required
          />
        </div>
        <div className="flex items-end">
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Saving…' : 'Add valuation'}
          </Button>
        </div>
      </form>
      {error && (
        <p role="alert" className="mt-4 text-sm text-rose-300">
          {error}
        </p>
      )}
    </Card>
  );
}
