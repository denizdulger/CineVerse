import express from "express";

import {
  getMovies,
  getMovieById,
  addWatchMovies,
  getWatchedMovies,
  searchMovies,
} from "../controllers/movieController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getMovies);

router.get("/search", searchMovies);

router.post("/watched", auth, addWatchMovies);

router.get("/watched", auth, getWatchedMovies);

router.get("/:id", getMovieById); //api/movies/id

export default router;
