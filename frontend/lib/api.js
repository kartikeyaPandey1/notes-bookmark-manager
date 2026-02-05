const BASE_URL =  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export const api = {
  getNotes: async (q = "", tags = "") => {
    const res = await fetch(
      `${BASE_URL}/notes?q=${encodeURIComponent(q)}&tags=${encodeURIComponent(
        tags
      )}`
    );
    return res.json();
  },

  createNote: async (data) => {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateNote: async (id, data) => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteNote: async (id) => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  getBookmarks: async (q = "", tags = "") => {
    const res = await fetch(
      `${BASE_URL}/bookmarks?q=${encodeURIComponent(q)}&tags=${encodeURIComponent(
        tags
      )}`
    );
    return res.json();
  },

  createBookmark: async (data) => {
    const res = await fetch(`${BASE_URL}/bookmarks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateBookmark: async (id, data) => {
    const res = await fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteBookmark: async (id) => {
    const res = await fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};
