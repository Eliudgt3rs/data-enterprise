import { describe, it, expect } from 'vitest'
import { valuationMetricSchema } from '../../src/lib/validators'

describe('Valuation Metric Validator', () => {
  it('should validate a correct metric object', () => {
    const validData = {
      datasetName: 'Global Customer Graph',
      category: 'CRM',
      valuation: 1250000,
      confidence: 0.95,
      recordsCount: 500000,
    }

    const result = valuationMetricSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail when datasetName is missing', () => {
    const invalidData = {
      category: 'CRM',
      valuation: 1250000,
      confidence: 0.95,
      recordsCount: 500000,
    }

    const result = valuationMetricSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})
