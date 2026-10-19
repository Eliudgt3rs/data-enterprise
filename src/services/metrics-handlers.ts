import type { ValuationRepository } from '@/core/valuation';
import { createValuation, listValuations } from '@/services/valuation-service';
import { queryParamsSchema, valuationMetricSchema } from '@/lib/validators';

function json(body: unknown, status: number): Response {
  return Response.json(body, { status });
}

export function createMetricsHandlers(repository: ValuationRepository) {
  return {
    async GET(request: Request): Promise<Response> {
      const url = new URL(request.url);
      const query = queryParamsSchema.safeParse({
        category: url.searchParams.get('category') ?? undefined,
        limit: url.searchParams.get('limit') ?? undefined,
      });

      if (!query.success) {
        return json({ success: false, errors: query.error.flatten() }, 400);
      }

      try {
        const metrics = await listValuations(repository, query.data);
        return json({ success: true, data: metrics }, 200);
      } catch (error) {
        console.error('Failed to list valuation metrics', error);
        return json({ success: false, error: 'Unable to load valuation metrics' }, 500);
      }
    },

    async POST(request: Request): Promise<Response> {
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return json({ success: false, error: 'Request body must contain valid JSON' }, 400);
      }

      const validation = valuationMetricSchema.safeParse(body);
      if (!validation.success) {
        return json({ success: false, errors: validation.error.flatten() }, 400);
      }

      try {
        const metric = await createValuation(repository, validation.data);
        return json({ success: true, data: metric }, 201);
      } catch (error) {
        console.error('Failed to create valuation metric', error);
        return json({ success: false, error: 'Unable to create valuation metric' }, 500);
      }
    },
  };
}
