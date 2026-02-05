const express = require('express');
const supabase = require('../config/supabase');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/auth.middleware');
const supabaseAdmin = require('../config/supabaseAdmin');

const router = express.Router();

router.post('/register', async (req, res) => {
    
    const { email, password } = req.body;

    // 1. Create auth user (anon key is fine)
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    //2. Now create profile in 'users' table using service role key(bypasses RLS)
    const { error: profileError } = await supabaseAdmin
        .from('users')
        .insert({ id: data.user.id, //THIS must match auth.users.id 
            email: data.user.email,
         });
         if (profileError) {
        return res.status(400).json({ error: profileError.message });
    }

    res.status(201).json({ 
        message: "User registered successfully", 
        userId: data.user.id,
    })
     });

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

       const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.json({ 
        message: "Login successful",
        access_token: data.session.refresh_token, // Return refresh token for client to use
        user: data.user,
    });
});

router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: "Protected route accessed",
         user: req.user, });
});

module.exports = router; 