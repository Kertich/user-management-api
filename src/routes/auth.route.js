const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase
        .from('users')
        .insert([{ email, password }]);

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: "User created", data });
});

module.exports = router; 