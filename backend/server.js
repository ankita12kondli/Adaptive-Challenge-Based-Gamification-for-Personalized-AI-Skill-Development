// ========================================================
// SkillSpring AI - Express.js REST API & Web Server
// Adaptive Challenge-Based Gamification Platform
// SkillSpring AI Educational Platform
// ========================================================

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment configuration
dotenv.config({ path: path.join(__dirname, '../.env') });

const { testConnection } = require('./config/db');

// Route Handlers
const authRoutes = require('./routes/auth');
const kidsRoutes = require('./routes/kids');
const challengesRoutes = require('./routes/challenges');
const adaptiveRoutes = require('./routes/adaptive');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/kids', kidsRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/adaptive', adaptiveRoutes);
app.use('/api/admin', adminRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    project: 'SkillSpring AI - Adaptive Gamified Learning',
    team: 'SkillSpring AI Platform Team',
    stack: {
      frontend: 'HTML5, CSS3, JavaScript (ES6+)',
      backend: 'Node.js & Express.js',
      database: 'MySQL (Database: adaptive_learning)'
    },
    timestamp: new Date().toISOString()
  });
});

// HTML Page Routes
app.get('/kids', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/kids.html'));
});

app.get('/adult', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/adult.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start Server
app.listen(PORT, async () => {
  console.log(`========================================================`);
  console.log(`🚀 SkillSpring AI Express Server running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
  console.log(`🧒 Kids Learning Zone: http://localhost:${PORT}/kids`);
  console.log(`========================================================`);
  await testConnection();
});

module.exports = app;
