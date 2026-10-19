import React from 'react'
import { ShieldCheck } from 'lucide-react'

interface DashboardHeaderProps {
  totalValuation?: number
  datasetCount?: number
}

export function DashboardHeader({ totalValuation = 0, datasetCount = 0 }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
      <div>
        <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider">Enterprise Tier Validation</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">DataFactor Enterprise Analytics</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Portfolio Valuation: <span className="text-emerald-400 font-bold">${totalValuation.toLocaleString()}</span> across {datasetCount} registered datasets.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
          System Operational
        </span>
      </div>
    </header>
  )
}
