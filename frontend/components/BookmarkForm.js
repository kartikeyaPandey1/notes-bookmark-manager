import { useState } from "react";

export default function BookmarkForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [url, setUrl] = useState(initialData?.url || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [tags, setTags] = useState(
    initialData?.tags ? initialData.tags.join(",") : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      url,
      description,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    setTitle("");
    setUrl("");
    setDescription("");
    setTags("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow space-y-3 border"
    >
      <h2 className="text-lg font-semibold">
        {initialData ? "Edit Bookmark" : "Create Bookmark"}
      </h2>

      <input
        className="w-full p-3 rounded-xl border"
        placeholder="Title (optional - auto fetched)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full p-3 rounded-xl border"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <textarea
        className="w-full p-3 rounded-xl border min-h-[100px]"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="w-full p-3 rounded-xl border"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-black text-white"
        >
          {initialData ? "Update" : "Create"}
        </button>

        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
