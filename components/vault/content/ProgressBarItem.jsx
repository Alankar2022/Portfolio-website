'use client'

import { useState } from 'react'

function clampProgress(value) {
  if (Number.isNaN(value)) return 0
  return Math.min(100, Math.max(0, value))
}

export default function ProgressBarItem({ item, onUpdate, onDelete }) {
  const [label, setLabel] = useState(item.label)
  const [progress, setProgress] = useState(item.progress)
  const [error, setError] = useState('')

  const handleSave = () => {
    const safeLabel = label.trim()
    const numericProgress = Number(progress)

    if (!safeLabel) {
      setError('Progress label is required.')
      return
    }

    if (Number.isNaN(numericProgress)) {
      setError('Progress must be a number between 0 and 100.')
      return
    }

    const safeProgress = clampProgress(numericProgress)
    onUpdate(item.id, {
      label: safeLabel,
      progress: safeProgress,
    })
    setProgress(safeProgress)
    setError('')
  }

  const progressValue = clampProgress(Number(progress))

  return (
    <article className="rounded-lg border border-white/10 bg-zinc-900/50 p-3">
      <div className="grid gap-2 sm:grid-cols-[1fr_90px_auto] sm:items-end">
        <label className="grid gap-1 text-xs text-zinc-300">
          Label
          <input
            type="text"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            className="rounded-md border border-white/15 bg-zinc-900/60 px-2.5 py-1.5 text-sm text-white outline-none"
          />
        </label>

        <label className="grid gap-1 text-xs text-zinc-300">
          Progress %
          <input
            type="number"
            min="0"
            max="100"
            value={progress}
            onChange={(event) => setProgress(event.target.value)}
            className="rounded-md border border-white/15 bg-zinc-900/60 px-2.5 py-1.5 text-sm text-white outline-none"
          />
        </label>

        <div className="flex gap-2 pb-0.5">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="rounded-md bg-rose-500/20 px-2.5 py-1 text-xs text-rose-200"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-xs text-zinc-400">
          <span>{item.label}</span>
          <span>{progressValue}%</span>
        </div>
        <div className="h-2 rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-cyan-300 transition-[width]"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>

      {error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}
    </article>
  )
}
