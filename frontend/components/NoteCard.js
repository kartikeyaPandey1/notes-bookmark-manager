export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="p-5 rounded-2xl shadow-sm border bg-white hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-tight">{note.title}</h3>
        {note.favorite && (
          <span className="text-yellow-500 text-lg" title="Favorite">
            ⭐
          </span>
        )}
      </div>

      <p className="text-gray-700 mt-2 whitespace-pre-line line-clamp-5">
        {note.content}
      </p>

      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-gray-100 border"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-5">
        <button
          onClick={() => onEdit(note)}
          className="flex-1 px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white hover:opacity-90 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
