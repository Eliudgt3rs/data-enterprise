import { NextResponse } from 'next/server'
import { prisma } from '@/infrastructure/prisma'
import { PrismaValuationRepository } from '@/infrastructure/valuation-repository'
import { createMetricsHandlers } from '@/services/metrics-handlers'

const repository = new PrismaValuationRepository(prisma)
const handlers = createMetricsHandlers(repository)

export async function GET(request: Request) {
  try {
    return await handlers.GET(request)
  } catch {
    return NextResponse.json({ success: true, data: [] }, { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    return await handlers.POST(request)
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
