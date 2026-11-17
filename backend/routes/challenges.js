// ========================================================
// Challenges & Curriculum Topics API Routes
// Express.js & MySQL Integration
// ========================================================

const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// GET all curriculum topics
router.get('/topics', async (req, res) => {
  try {
    try {
      const [rows] = await pool.query('SELECT * FROM topics ORDER BY id ASC');
      return res.json({ topics: rows });
    } catch (dbErr) {
      // Default initial fallback topics
      return res.json({
        topics: [
          { id: 1, name: 'Artificial Intelligence', description: 'Fundamentals of AI & smart systems', icon: '🧠' },
          { id: 2, name: 'Python Programming', description: 'Syntax, loops, conditionals, logic', icon: '🐍' },
          { id: 3, name: 'Machine Learning', description: 'Patterns, training sets, classification', icon: '🤖' },
          { id: 4, name: 'Generative AI', description: 'Large language models & creative content', icon: '✨' },
          { id: 5, name: 'Prompt Engineering', description: 'Techniques for instructing AI agents', icon: '💬' },
          { id: 6, name: 'Data Science', description: 'Data collection, statistics, visualization', icon: '📊' }
        ]
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET challenges by track and difficulty
router.get('/', async (req, res) => {
  try {
    const { track, difficulty, topicId } = req.query;
    let query = 'SELECT * FROM challenges WHERE 1=1';
    const params = [];

    if (track) {
      query += ' AND target_track = ?';
      params.push(track);
    }
    if (difficulty) {
      query += ' AND difficulty = ?';
      params.push(difficulty);
    }
    if (topicId) {
      query += ' AND topic_id = ?';
      params.push(topicId);
    }

    try {
      const [rows] = await pool.query(query, params);
      return res.json({ challenges: rows });
    } catch (dbErr) {
      return res.json({ challenges: [] });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
