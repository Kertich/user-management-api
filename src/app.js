require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.route');
const adminRoutes = require('./routes/admin.routes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: 'User Management API is running' });
});

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});