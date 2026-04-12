'use client'

import { useEffect, useMemo, useState } from 'react'
import GoalTracker from '@/components/vault/content/GoalTracker'
import NotesPanel from '@/components/vault/content/NotesPanel'
import ProgressBarItem from '@/components/vault/content/ProgressBarItem'

const STORAGE_KEY = 'portfolio-vault-folders-v1'

const defaultFolders = [
  { id: 'folder-1', name: 'Personal', content: { notes: [], progressItems: [], goals: [] } },
  { id: 'folder-2', name: 'Work', content: { notes: [], progressItems: [], goals: [] } },
  { id: 'folder-3', name: 'Learning', content: { notes: [], progressItems: [], goals: [] } },
]

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function normalizeFolders(rawFolders) {
  if (!Array.isArray(rawFolders)) return defaultFolders

  return rawFolders.map((folder) => ({
    ...folder,
    content: {
      notes: folder?.content?.notes ?? [],
      progressItems: folder?.content?.progressItems ?? [],
      goals: folder?.content?.goals ?? [],
    },
  }))
}

export default function FolderVault() {
  const [folders, setFolders] = useState(defaultFolders)
  const [selectedFolderId, setSelectedFolderId] = useState(defaultFolders[0].id)
  const [progressDraft, setProgressDraft] = useState({ label: '', progress: '' })
  const [progressError, setProgressError] = useState('')

  useEffect(() => {
    const persisted = window.localStorage.getItem(STORAGE_KEY)

    if (!persisted) return

    try {
      const parsed = JSON.parse(persisted)
      const normalized = normalizeFolders(parsed)
      if (normalized.length > 0) {
        setFolders(normalized)
        setSelectedFolderId(normalized[0].id)
      }
    } catch {
      setFolders(defaultFolders)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(folders))
  }, [folders])

  const selectedFolder = useMemo(
    () => folders.find((folder) => folder.id === selectedFolderId) ?? folders[0],
    [folders, selectedFolderId]
  )

  const updateFolder = (folderId, updater) => {
    setFolders((prev) =>
      prev.map((folder) => {
        if (folder.id !== folderId) return folder

        return {
          ...folder,
          content: updater(folder.content),
        }
      })
    )
  }

  const addProgressItem = (event) => {
    event.preventDefault()
    const safeLabel = progressDraft.label.trim()
    const safeProgress = Number(progressDraft.progress)

    if (!safeLabel) {
      setProgressError('Progress label is required.')
      return
    }

    if (Number.isNaN(safeProgress) || safeProgress < 0 || safeProgress > 100) {
      setProgressError('Progress must be between 0 and 100.')
      return
    }

    updateFolder(selectedFolder.id, (content) => ({
      ...content,
      progressItems: [...content.progressItems, { id: createId(), label: safeLabel, progress: safeProgress }],
    }))

    setProgressDraft({ label: '', progress: '' })
    setProgressError('')
  }

  return (
    <section className="glass rounded-3xl border border-white/10 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-white">Folder Vault</h2>
        <p className="text-xs text-zinc-400">Entries are saved locally in this browser.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-zinc-900/40 p-3">
          <p className="mb-2 text-xs uppercase tracking-wide text-zinc-400">Folders</p>
          <ul className="space-y-2">
            {folders.map((folder) => {
              const isActive = folder.id === selectedFolder.id

              return (
                <li key={folder.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedFolderId(folder.id)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                      isActive ? 'bg-cyan-500/20 text-cyan-100' : 'bg-zinc-800/40 text-zinc-200 hover:bg-zinc-800/70'
                    }`}
                  >
                    <span>{folder.name}</span>
                    <span className="mt-1 block text-xs text-zinc-400">
                      {folder.content.notes.length} notes · {folder.content.progressItems.length} progress ·{' '}
                      {folder.content.goals.length} goals
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <div className="space-y-4">
          <NotesPanel
            notes={selectedFolder.content.notes}
            onAddNote={(text) =>
              updateFolder(selectedFolder.id, (content) => ({
                ...content,
                notes: [...content.notes, { id: createId(), text }],
              }))
            }
            onUpdateNote={(noteId, text) =>
              updateFolder(selectedFolder.id, (content) => ({
                ...content,
                notes: content.notes.map((note) => (note.id === noteId ? { ...note, text } : note)),
              }))
            }
            onDeleteNote={(noteId) =>
              updateFolder(selectedFolder.id, (content) => ({
                ...content,
                notes: content.notes.filter((note) => note.id !== noteId),
              }))
            }
          />

          <section className="glass rounded-2xl border border-white/10 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Progress bars</h3>
              <span className="text-xs text-zinc-400">{selectedFolder.content.progressItems.length} items</span>
            </div>

            <form onSubmit={addProgressItem} className="mb-4 grid gap-2 sm:grid-cols-[1fr_110px_auto]">
              <input
                type="text"
                value={progressDraft.label}
                onChange={(event) => setProgressDraft((prev) => ({ ...prev, label: event.target.value }))}
                placeholder="Progress label"
                className="rounded-md border border-white/15 bg-zinc-900/60 px-3 py-2 text-sm text-white"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={progressDraft.progress}
                onChange={(event) => setProgressDraft((prev) => ({ ...prev, progress: event.target.value }))}
                placeholder="0 - 100"
                className="rounded-md border border-white/15 bg-zinc-900/60 px-3 py-2 text-sm text-white"
              />
              <button
                type="submit"
                className="rounded-md bg-cyan-500/20 px-3 py-2 text-sm font-medium text-cyan-100"
              >
                Add
              </button>
            </form>

            {progressError ? <p className="mb-3 text-xs text-rose-300">{progressError}</p> : null}

            {selectedFolder.content.progressItems.length === 0 ? (
              <p className="rounded-md border border-dashed border-white/15 px-3 py-4 text-sm text-zinc-400">
                No progress bars yet. Add one to measure completion.
              </p>
            ) : (
              <div className="space-y-2">
                {selectedFolder.content.progressItems.map((item) => (
                  <ProgressBarItem
                    key={item.id}
                    item={item}
                    onUpdate={(itemId, changes) =>
                      updateFolder(selectedFolder.id, (content) => ({
                        ...content,
                        progressItems: content.progressItems.map((entry) =>
                          entry.id === itemId ? { ...entry, ...changes } : entry
                        ),
                      }))
                    }
                    onDelete={(itemId) =>
                      updateFolder(selectedFolder.id, (content) => ({
                        ...content,
                        progressItems: content.progressItems.filter((entry) => entry.id !== itemId),
                      }))
                    }
                  />
                ))}
              </div>
            )}
          </section>

          <GoalTracker
            goals={selectedFolder.content.goals}
            onAddGoal={(goal) =>
              updateFolder(selectedFolder.id, (content) => ({
                ...content,
                goals: [...content.goals, { ...goal, id: createId() }],
              }))
            }
            onUpdateGoal={(goalId, updates) =>
              updateFolder(selectedFolder.id, (content) => ({
                ...content,
                goals: content.goals.map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal)),
              }))
            }
            onDeleteGoal={(goalId) =>
              updateFolder(selectedFolder.id, (content) => ({
                ...content,
                goals: content.goals.filter((goal) => goal.id !== goalId),
              }))
            }
          />
        </div>
      </div>
    </section>
  )
}
