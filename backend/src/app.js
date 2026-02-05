const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notesRoutes = require("./routes/notes.routes");
const bookmarksRoutes = require("./routes/bookmarks.routes");

const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running 🚀" });
});



app.use("/api/notes", notesRoutes);
app.use("/api/bookmarks", bookmarksRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
