export default function BookmarkCard({ bookmark, onEdit, onDelete }) {
  return (
    <div className="p-4 rounded-2xl shadow border bg-white">
      <h3 className="text-lg font-semibold">{bookmark.title}</h3>

      <a
        href={bookmark.url}
        target="_blank"
        className="text-blue-600 underline break-all"
      >
        {bookmark.url}
      </a>

      {bookmark.description && (
        <p className="text-gray-700 mt-2">{bookmark.description}</p>
      )}

      {bookmark.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {bookmark.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 border"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(bookmark)}
          className="px-4 py-2 rounded-xl border"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(bookmark._id)}
          className="px-4 py-2 rounded-xl bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
