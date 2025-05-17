import bcrypt from "bcrypt";
import pool from "../db.js";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.JWT_SECRET;

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
            [name, email, hashedPassword]
        );

        const token = createToken(result.rows[0].id);
        res.status(201).json({ message: "User registered", token});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        const token = createToken(user.id);
        res.status(200).json({
            token,
            user: {
                id:user.id,
                name:user.name,
                email:user.email,
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};