const Note = require("../models/Note");

// POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    const { title, content, tags, favorite } = req.body;

    if (!title || !content) {
      res.status(400);
      throw new Error("Title and content are required");
    }

    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      favorite: favorite || false,
    });

    res.status(201).json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

// GET /api/notes?q=term&tags=a,b
exports.getNotes = async (req, res, next) => {
  try {
    const { q, tags } = req.query;

    let filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ];
    }

    if (tags) {
      const tagList = tags.split(",").map((t) => t.trim());
      filter.tags = { $in: tagList };
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (err) {
    next(err);
  }
};

// GET /api/notes/:id
exports.getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    res.status(200).json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

// PUT /api/notes/:id
exports.updateNote = async (req, res, next) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404);
      throw new Error("Note not found");
    }

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404);
      throw new Error("Note not found");
    }

    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (err) {
    next(err);
  }
};
