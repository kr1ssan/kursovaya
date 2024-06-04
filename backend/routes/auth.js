const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/db.js');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const isValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isValid) {
            return res.status(403).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.rows[0].id }, 'your-secret-key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
