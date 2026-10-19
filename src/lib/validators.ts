import { z } from 'zod'

export const valuationMetricSchema = z.object({
  datasetName: z.string().min(1, 'Dataset name is required').max(100),
  category: z.string().min(1, 'Category is required').max(50),
  valuation: z.number().positive('Valuation must be greater than 0'),
  confidence: z.number().min(0).max(1),
  recordsCount: z.number().int().positive('Records count must be at least 1'),
})

export type ValuationMetricInput = z.infer<typeof valuationMetricSchema>

export const queryParamsSchema = z.object({
  category: z.string().optional(),
  limit: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().min(1).max(1000)).default('50'),
})

export const valuationRecordSchema = valuationMetricSchema.extend({
  id: z.string(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
})

export const valuationMetricResponseSchema = z.object({
  success: z.boolean(),
  data: valuationRecordSchema,
})

export const valuationMetricsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(valuationRecordSchema),
})
