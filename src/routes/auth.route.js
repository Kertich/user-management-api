const express = require('express');
const supabase = require('../config/supabase');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Insert user
    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password: hashedPassword }])
        .select();

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: "User created", user: data[0]});
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // 1. Find user
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email);

    if (error || users.length === 0) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = users[0];

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, 
        user.password);

    if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    // 3. Create token
    const token = jwt.sign({ user: user.id }, 
        process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: "Login successful", token,
        });
});

router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: "Protected route accessed",
         user: req.user, });
});

module.exports = router; 