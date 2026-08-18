import pool from "../db/db.js";

// Ana sayfadaki filmleri getir
export const getMovies = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    console.log(data, "getMovies");
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err,
    });
  }
};

// Tek filmi getir
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Film alınamadı.",
    });
  }
};

// İzlenen filmlere ekle
export const addWatchMovies = async (req, res) => {
  try {
    const { movieId, userId } = req.body;

    if (!movieId || !userId) {
      return res.status(400).json({
        error: "Movie ID ve User ID zorunludur.",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO watched_movies (user_id, movie_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [userId, movieId]
    );

    return res.status(201).json({
      message: "Film izlediklerim listesine eklendi.",
      watchedMovie: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(409).json({
        error: "Bu film zaten izlediklerim listesinde.",
      });
    }

    return res.status(500).json({
      error: "Sunucu hatası.",
    });
  }
};

// Film arama
export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        error: "Arama sorgusu zorunludur.",
      });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&language=en-US`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Film araması yapılamadı.",
    });
  }
};

// İzlenen filmleri getir
export const getWatchedMovies = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT movie_id, created_at
      FROM watched_movies
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Sunucu hatası.",
    });
  }
};
