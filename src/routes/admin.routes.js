const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/auth.middleware');
 
const supabaseAdmin = require('../config/supabaseAdmin');

const supabase = require('../config/supabase');

// Admin-only: Get all users
router.get('/users', requireAuth, async (req, res) => {
   
      console.log("REQ USER ID: ", req.user.id);
    // check role from DB (trusted RLS applies)
    const { data: profile, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', req.user.id)
        .single();  
        
console.log("PROFILE:", profile);
console.log("ERROR:", error);

    if (error || profile.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }

  // Fetch all users using ADMIN client
    const { data: users, error: usersError } = await supabaseAdmin
        .from('users')
        .select('id, email, role, created_at');

    if (usersError) {
        return res.status(400).json({ error: usersError.message });
    }

    res.json( users );
  
});


module.exports = router;


