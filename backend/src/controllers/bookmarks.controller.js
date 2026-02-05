const Bookmark = require("../models/Bookmark");
const fetchTitleFromUrl = require("../utils/fetchTitle");

// Simple URL validation
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

// POST /api/bookmarks
exports.createBookmark = async (req, res, next) => {
  try {
    let { title, url, description, tags, favorite } = req.body;

    if (!url) {
      res.status(400);
      throw new Error("URL is required");
    }

    if (!isValidUrl(url)) {
      res.status(400);
      throw new Error("Invalid URL format");
    }

    // Bonus: auto-fetch title if missing
    if (!title || title.trim() === "") {
      const fetchedTitle = await fetchTitleFromUrl(url);
      title = fetchedTitle || "Untitled Bookmark";
    }

    const bookmark = await Bookmark.create({
      title,
      url,
      description: description || "",
      tags: tags || [],
      favorite: favorite || false,
    });

    res.status(201).json({ success: true, data: bookmark });
  } catch (err) {
    next(err);
  }
};

// GET /api/bookmarks?q=term&tags=a,b
exports.getBookmarks = async (req, res, next) => {
  try {
    const { q, tags } = req.query;

    let filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { url: { $regex: q, $options: "i" } },
      ];
    }

    if (tags) {
      const tagList = tags.split(",").map((t) => t.trim());
      filter.tags = { $in: tagList };
    }

    const bookmarks = await Bookmark.find(filter).sort({ createdAt: -1 });

    res
      .status(200)
      .json({ success: true, count: bookmarks.length, data: bookmarks });
  } catch (err) {
    next(err);
  }
};

// GET /api/bookmarks/:id
exports.getBookmarkById = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      res.status(404);
      throw new Error("Bookmark not found");
    }

    res.status(200).json({ success: true, data: bookmark });
  } catch (err) {
    next(err);
  }
};

// PUT /api/bookmarks/:id
exports.updateBookmark = async (req, res, next) => {
  try {
    const updated = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404);
      throw new Error("Bookmark not found");
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/bookmarks/:id
exports.deleteBookmark = async (req, res, next) => {
  try {
    const deleted = await Bookmark.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404);
      throw new Error("Bookmark not found");
    }

    res.status(200).json({ success: true, message: "Bookmark deleted" });
  } catch (err) {
    next(err);
  }
};
