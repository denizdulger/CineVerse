import express from "express";
import { getFavorites } from "../controllers/favoritesController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("", auth, getFavorites);

export default router;
