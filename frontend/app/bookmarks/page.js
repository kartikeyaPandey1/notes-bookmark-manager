"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import BookmarkForm from "../../components/BookmarkForm";
import BookmarkCard from "../../components/BookmarkCard";
import SearchBar from "../../components/SearchBar";
import TagFilter from "../../components/TagFilter";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const [editing, setEditing] = useState(null);

  const fetchBookmarks = async () => {
    const res = await api.getBookmarks(search, tags);
    setBookmarks(res.data || []);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleCreate = async (data) => {
    await api.createBookmark(data);
    fetchBookmarks();
  };

  const handleUpdate = async (data) => {
    await api.updateBookmark(editing._id, data);
    setEditing(null);
    fetchBookmarks();
  };

  const handleDelete = async (id) => {
    await api.deleteBookmark(id);
    fetchBookmarks();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">🔖 Bookmarks</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search bookmarks..."
        />
        <TagFilter value={tags} onChange={setTags} />
      </div>

      <button
        onClick={fetchBookmarks}
        className="px-4 py-2 rounded-xl bg-black text-white"
      >
        Apply Filters
      </button>

      <BookmarkForm
        onSubmit={editing ? handleUpdate : handleCreate}
        initialData={editing}
        onCancel={() => setEditing(null)}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {bookmarks.map((b) => (
          <BookmarkCard
            key={b._id}
            bookmark={b}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
