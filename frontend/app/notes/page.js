"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import NoteForm from "../../components/NoteForm";
import NoteCard from "../../components/NoteCard";
import SearchBar from "../../components/SearchBar";
import TagFilter from "../../components/TagFilter";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const [editing, setEditing] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    const res = await api.getNotes(search, tags);
    setNotes(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (data) => {
    const res = await api.createNote(data);

    if (!res.success) {
      alert(res.message || "Failed to create note");
      return;
    }

    fetchNotes();
  };

  const handleUpdate = async (data) => {
    const res = await api.updateNote(editing._id, data);

    if (!res.success) {
      alert(res.message || "Failed to update note");
      return;
    }

    setEditing(null);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this note?");
    if (!ok) return;

    await api.deleteNote(id);
    fetchNotes();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">📝 Notes</h1>
        <p className="text-gray-600">
          Create notes, search them instantly, and filter by tags.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search notes (title/content)..."
          />
          <TagFilter value={tags} onChange={setTags} />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={fetchNotes}
            className="px-5 py-2 rounded-xl bg-black text-white hover:opacity-90 transition"
          >
            Apply Filters
          </button>

          <button
            onClick={() => {
              setSearch("");
              setTags("");
              setTimeout(fetchNotes, 0);
            }}
            className="px-5 py-2 rounded-xl border hover:bg-gray-100 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Form */}
      <NoteForm
        onSubmit={editing ? handleUpdate : handleCreate}
        initialData={editing}
        onCancel={() => setEditing(null)}
      />

      {/* Notes list */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Notes</h2>
        <span className="text-sm text-gray-500">
          {loading ? "Loading..." : `${notes.length} notes`}
        </span>
      </div>

      {loading ? (
        <div className="text-gray-600">Fetching notes...</div>
      ) : notes.length === 0 ? (
        <div className="bg-white border rounded-2xl p-6 text-gray-600">
          No notes found. Create your first note above ✨
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
