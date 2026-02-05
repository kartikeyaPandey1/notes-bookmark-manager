import "./globals.css";

export const metadata = {
  title: "Notes & Bookmark Manager",
  description: "Personal Notes and Bookmark Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="font-bold text-xl">
              🚀 Notes Manager
            </a>

            <nav className="flex gap-2">
              <a
                href="/notes"
                className="px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
              >
                Notes
              </a>
              <a
                href="/bookmarks"
                className="px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
              >
                Bookmarks
              </a>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        <footer className="border-t mt-10">
          <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
            Built for Internship Assessment • Notes & Bookmark Manager
          </div>
        </footer>
      </body>
    </html>
  );
}
