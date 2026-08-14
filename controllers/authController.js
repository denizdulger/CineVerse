import bcrypt from "bcrypt";
import pool from "../db/db.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    console.log("register tetiklendi");

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Username, email ve password zorunludur.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Geçerli bir email adresi giriniz.",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: "Bu email zaten kayıtlı.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      `,
      [username, email, hashedPassword]
    );

    return res.status(201).json({
      message: "Kayıt başarılı.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Sunucu hatası.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email ve şifre zorunludur.",
      });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Email veya şifre hatalı.",
      });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Email veya şifre hatalı.",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        profile_image: user.profile_image,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).json({
      message: "Giriş başarılı.",
      token,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Sunucu hatası.",
    });
  }
};

export { register, login };
