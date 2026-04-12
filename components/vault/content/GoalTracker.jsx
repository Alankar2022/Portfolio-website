'use client'

import { useState } from 'react'

function validateGoal({ title, target, current, deadline }) {
  const parsedTarget = Number(target)
  const parsedCurrent = Number(current)

  if (!title.trim()) {
    return 'Goal title is required.'
  }

  if (Number.isNaN(parsedTarget) || parsedTarget <= 0) {
    return 'Target must be greater than 0.'
  }

  if (Number.isNaN(parsedCurrent) || parsedCurrent < 0) {
    return 'Current progress must be 0 or more.'
  }

  if (parsedCurrent > parsedTarget) {
    return 'Current progress cannot exceed target.'
  }

  if (deadline && Number.isNaN(Date.parse(deadline))) {
    return 'Deadline must be a valid date.'
  }

  return ''
}

export default function GoalTracker({ goals, onAddGoal, onUpdateGoal, onDeleteGoal }) {
  const [draft, setDraft] = useState({ title: '', target: '', current: '', deadline: '' })
  const [editingId, setEditingId] = useState(null)
  const [editingGoal, setEditingGoal] = useState(null)
  const [error, setError] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    const nextError = validateGoal(draft)
    if (nextError) {
      setError(nextError)
      return
    }

    onAddGoal({
      title: draft.title.trim(),
      target: Number(draft.target),
      current: Number(draft.current),
      deadline: draft.deadline,
    })

    setDraft({ title: '', target: '', current: '', deadline: '' })
    setError('')
  }

  const startEditing = (goal) => {
    setEditingId(goal.id)
    setEditingGoal({
      title: goal.title,
      target: goal.target,
      current: goal.current,
      deadline: goal.deadline || '',
    })
    setError('')
  }

  const saveEditing = () => {
    const nextError = validateGoal(editingGoal)
    if (nextError) {
      setError(nextError)
      return
    }

    onUpdateGoal(editingId, {
      title: editingGoal.title.trim(),
      target: Number(editingGoal.target),
      current: Number(editingGoal.current),
      deadline: editingGoal.deadline,
    })

    setEditingId(null)
    setEditingGoal(null)
    setError('')
  }

  return (
    <section className="glass rounded-2xl border border-white/10 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Goal tracker</h3>
        <span className="text-xs text-zinc-400">{goals.length} goals</span>
      </div>

      <form onSubmit={handleAdd} className="mb-4 grid gap-2 sm:grid-cols-2">
        <input
          value={draft.title}
          onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Goal title"
          className="rounded-md border border-white/15 bg-zinc-900/60 px-3 py-2 text-sm text-white"
        />
        <input
          value={draft.target}
          onChange={(event) => setDraft((prev) => ({ ...prev, target: event.target.value }))}
          type="number"
          min="1"
          placeholder="Target"
          className="rounded-md border border-white/15 bg-zinc-900/60 px-3 py-2 text-sm text-white"
        />
        <input
          value={draft.current}
          onChange={(event) => setDraft((prev) => ({ ...prev, current: event.target.value }))}
          type="number"
          min="0"
          placeholder="Current"
          className="rounded-md border border-white/15 bg-zinc-900/60 px-3 py-2 text-sm text-white"
        />
        <input
          value={draft.deadline}
          onChange={(event) => setDraft((prev) => ({ ...prev, deadline: event.target.value }))}
          type="date"
          className="rounded-md border border-white/15 bg-zinc-900/60 px-3 py-2 text-sm text-white"
        />
        <button
          type="submit"
          className="sm:col-span-2 rounded-md bg-violet-500/20 px-3 py-2 text-sm font-medium text-violet-200"
        >
          Add goal
        </button>
      </form>

      {error ? <p className="mb-3 text-xs text-rose-300">{error}</p> : null}

      {goals.length === 0 ? (
        <p className="rounded-md border border-dashed border-white/15 px-3 py-4 text-sm text-zinc-400">
          No goals yet. Define a target to start tracking progress.
        </p>
      ) : (
        <ul className="space-y-2">
          {goals.map((goal) => {
            const pct = goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0
            const isEditing = editingId === goal.id
            const source = isEditing ? editingGoal : goal

            return (
              <li key={goal.id} className="rounded-lg border border-white/10 bg-zinc-900/50 p-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    value={source.title}
                    onChange={(event) =>
                      isEditing ? setEditingGoal((prev) => ({ ...prev, title: event.target.value })) : null
                    }
                    disabled={!isEditing}
                    className="rounded-md border border-white/15 bg-zinc-900/60 px-2.5 py-1.5 text-sm text-white disabled:opacity-70"
                  />
                  <input
                    type="number"
                    value={source.target}
                    onChange={(event) =>
                      isEditing ? setEditingGoal((prev) => ({ ...prev, target: event.target.value })) : null
                    }
                    disabled={!isEditing}
                    className="rounded-md border border-white/15 bg-zinc-900/60 px-2.5 py-1.5 text-sm text-white disabled:opacity-70"
                  />
                  <input
                    type="number"
                    value={source.current}
                    onChange={(event) =>
                      isEditing ? setEditingGoal((prev) => ({ ...prev, current: event.target.value })) : null
                    }
                    disabled={!isEditing}
                    className="rounded-md border border-white/15 bg-zinc-900/60 px-2.5 py-1.5 text-sm text-white disabled:opacity-70"
                  />
                  <input
                    type="date"
                    value={source.deadline || ''}
                    onChange={(event) =>
                      isEditing ? setEditingGoal((prev) => ({ ...prev, deadline: event.target.value })) : null
                    }
                    disabled={!isEditing}
                    className="rounded-md border border-white/15 bg-zinc-900/60 px-2.5 py-1.5 text-sm text-white disabled:opacity-70"
                  />
                </div>

                <div className="mt-3 h-2 rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-violet-300" style={{ width: `${Math.min(100, pct)}%` }} />
                </div>
                <p className="mt-1 text-xs text-zinc-400">{goal.current} / {goal.target} ({Math.min(100, pct)}%)</p>

                <div className="mt-2 flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={saveEditing}
                        className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-200"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null)
                          setEditingGoal(null)
                          setError('')
                        }}
                        className="rounded-md bg-zinc-700/40 px-2.5 py-1 text-xs text-zinc-200"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEditing(goal)}
                      className="rounded-md bg-blue-500/20 px-2.5 py-1 text-xs text-blue-200"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDeleteGoal(goal.id)}
                    className="rounded-md bg-rose-500/20 px-2.5 py-1 text-xs text-rose-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
