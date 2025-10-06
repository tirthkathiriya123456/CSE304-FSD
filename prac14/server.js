// server.js
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// Storage configuration (save to uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

// File filter: allow only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"));
  }
};

// Multer setup
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter: fileFilter,
});

// Upload route
app.post("/upload", upload.single("resume"), (req, res) => {
  res.send("✅ Resume uploaded successfully!");
});

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("❌ File too large! Max size is 2MB.");
    }
  }
  if (err) {
    return res.status(400).send(`❌ Upload error: ${err.message}`);
  }
  next();
});

// Default route
app.get("/", (req, res) => {
  res.send(`
    <h2>Upload Resume</h2>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="resume" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
