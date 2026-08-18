import express from "express";
import cors from "cors";
import path from "path";
import pool from "./db/db.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

import authRoutes from "./routes/auth.js";
import favoritesRoutes from "./routes/favorites.js";
import moviesRoutes from "./routes/movies.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public klasörü
app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html", "htm"],
  })
);

// Uploads klasörü
app.use("/uploads", express.static(path.join(__dirname, "routes", "uploads")));

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/movies", moviesRoutes);

// Ana sayfa
app.get("/", (req, res) => {
  console.log("GET / çalıştı");
  res.send("Access successfully");
});

// Database test
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database bağlantısı başarısız.",
    });
  }
});

// 404 - HER ZAMAN EN SONDA
app.use((req, res) => {
  if (req.originalUrl.startsWith("/api/")) {
    return res.status(404).json({
      error: "API endpoint not found",
    });
  }

  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Server
const PORT = 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
