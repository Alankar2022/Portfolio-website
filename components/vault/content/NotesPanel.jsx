'use client'

import { useState } from 'react'

const MAX_NOTE_LENGTH = 300

export default function NotesPanel({ notes, onAddNote, onUpdateNote, onDeleteNote }) {
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const resetEditor = () => {
    setEditingId(null)
    setEditingText('')
    setError('')
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const nextValue = draft.trim()

    if (!nextValue) {
      setError('Write something before saving a note.')
      return
    }

    if (nextValue.length > MAX_NOTE_LENGTH) {
      setError(`Keep notes under ${MAX_NOTE_LENGTH} characters.`)
      return
    }

    onAddNote(nextValue)
    setDraft('')
    setError('')
  }

  const handleSave = (noteId) => {
    const nextValue = editingText.trim()

    if (!nextValue) {
      setError('A note cannot be empty.')
      return
    }

    if (nextValue.length > MAX_NOTE_LENGTH) {
      setError(`Keep notes under ${MAX_NOTE_LENGTH} characters.`)
      return
    }

    onUpdateNote(noteId, nextValue)
    resetEditor()
  }

  return (
    <section className="glass rounded-2xl border border-white/10 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Notes</h3>
        <span className="text-xs text-zinc-400">{notes.length} total</span>
      </div>

      <form onSubmit={handleAdd} className="mb-4 space-y-2">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a note for this folder"
          className="min-h-[90px] w-full rounded-lg border border-white/15 bg-zinc-900/60 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400/50"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-zinc-400">{draft.length}/{MAX_NOTE_LENGTH}</p>
          <button
            type="submit"
            className="rounded-md bg-cyan-400/20 px-3 py-1 text-xs font-medium text-cyan-200 transition hover:bg-cyan-400/30"
          >
            Save note
          </button>
        </div>
      </form>

      {error ? <p className="mb-3 text-xs text-rose-300">{error}</p> : null}

      {notes.length === 0 ? (
        <p className="rounded-md border border-dashed border-white/15 px-3 py-4 text-sm text-zinc-400">
          No notes yet. Add your first note to capture ideas.
        </p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id} className="rounded-lg border border-white/10 bg-zinc-900/50 p-3 text-sm">
              {editingId === note.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    className="min-h-[80px] w-full rounded-lg border border-white/15 bg-zinc-900/60 px-3 py-2 text-sm text-white outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleSave(note.id)}
                      className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-200"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={resetEditor}
                      className="rounded-md bg-zinc-700/40 px-2.5 py-1 text-xs text-zinc-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="whitespace-pre-wrap text-zinc-100">{note.text}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(note.id)
                        setEditingText(note.text)
                        setError('')
                      }}
                      className="rounded-md bg-blue-500/20 px-2.5 py-1 text-xs text-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (editingId === note.id) {
                          resetEditor()
                        }
                        onDeleteNote(note.id)
                      }}
                      className="rounded-md bg-rose-500/20 px-2.5 py-1 text-xs text-rose-200"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
