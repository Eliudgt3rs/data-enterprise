import React from 'react'
import { Shield } from 'lucide-react'

interface MetricCardProps {
  datasetName: string
  category: string
  valuation: number
  confidence: number
  recordsCount: number
}

export function MetricCard({ datasetName, category, valuation, confidence, recordsCount }: MetricCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full">{category}</span>
        <div className="flex items-center gap-1 text-xs text-zinc-400">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>{(confidence * 100).toFixed(0)}% confidence</span>
        </div>
      </div>
      <div>
        <h3 className="text-zinc-100 font-bold text-lg mb-1">{datasetName}</h3>
        <p className="text-3xl font-extrabold text-white tracking-tight">
          ${valuation.toLocaleString()}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
        <span>Records Indexed</span>
        <span className="font-semibold text-zinc-200">{recordsCount.toLocaleString()}</span>
      </div>
    </div>
  )
}
