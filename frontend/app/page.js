export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Notes & Bookmark Manager</h1>
        <p className="text-gray-600">Choose a page:</p>

        <div className="flex gap-4 justify-center">
          <a href="/notes" className="px-6 py-3 rounded-xl bg-black text-white">
            Notes
          </a>

          <a href="/bookmarks" className="px-6 py-3 rounded-xl border">
            Bookmarks
          </a>
        </div>
      </div>
    </div>
  );
}
