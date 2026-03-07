require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
// Ensure db connects on startup
require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to communicate
app.use(express.json()); // Parse JSON payloads

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'CookEase Backend is Running!' });
});

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 [Backend] Server running on http://localhost:${PORT}`);
});
