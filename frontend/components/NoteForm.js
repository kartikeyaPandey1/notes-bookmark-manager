import { useEffect, useState } from "react";

export default function NoteForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setTags(initialData.tags ? initialData.tags.join(",") : "");
    } else {
      setTitle("");
      setContent("");
      setTags("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    if (!initialData) {
      setTitle("");
      setContent("");
      setTags("");
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {initialData ? "Edit Note" : "Create Note"}
        </h2>

        {initialData && (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 rounded-xl border min-h-[140px] focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Tags (comma separated) e.g. study, college"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button
          type="submit"
          className="w-full px-4 py-3 rounded-xl bg-black text-white hover:opacity-90 transition font-medium"
        >
          {initialData ? "Update Note" : "Create Note"}
        </button>
      </form>
    </div>
  );
}
