// ========================================================
// Kids Learning Zone API Routes
// MySQL `children_profiles` Table Management
// ========================================================

const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// In-memory cache fallback if MySQL is offline
const inMemoryKids = {};

// GET all registered children profiles
router.get('/profiles', async (req, res) => {
  try {
    try {
      const [rows] = await pool.query('SELECT * FROM children_profiles ORDER BY id DESC');
      return res.json({ profiles: rows });
    } catch (dbErr) {
      console.warn('MySQL fallback for children profiles:', dbErr.message);
      return res.json({ profiles: Object.values(inMemoryKids) });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST register or update child profile (Name, Age, Standard, Avatar)
router.post('/register', async (req, res) => {
  try {
    const { name, age, standard, avatar } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Child name is required' });
    }

    const childAge = parseInt(age) || 8;
    const childStd = standard || '3rd Standard';
    const childAvatar = avatar || '🤖';

    try {
      const [existing] = await pool.query('SELECT id FROM children_profiles WHERE name = ?', [name]);
      if (existing.length > 0) {
        await pool.query(
          'UPDATE children_profiles SET age = ?, standard = ?, avatar = ? WHERE name = ?',
          [childAge, childStd, childAvatar, name]
        );
      } else {
        await pool.query(
          'INSERT INTO children_profiles (name, age, standard, avatar, total_stars, total_score, current_level, streak_days, last_active_date) VALUES (?, ?, ?, ?, 0, 0, 1, 1, CURDATE())',
          [name, childAge, childStd, childAvatar]
        );
      }

      const [updated] = await pool.query('SELECT * FROM children_profiles WHERE name = ?', [name]);
      return res.status(200).json({ message: 'Child profile saved', profile: updated[0] });
    } catch (dbErr) {
      console.warn('MySQL fallback for save child:', dbErr.message);
      inMemoryKids[name] = {
        name,
        age: childAge,
        standard: childStd,
        avatar: childAvatar,
        total_stars: 0,
        total_score: 0,
        completed_games: []
      };
      return res.status(200).json({ message: 'Child profile saved (in-memory)', profile: inMemoryKids[name] });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST save game completion progress (Stars, Points)
router.post('/progress', async (req, res) => {
  try {
    const { name, gameId, stars, score } = req.body;
    if (!name || !gameId) {
      return res.status(400).json({ error: 'Child name and game ID required' });
    }

    try {
      await pool.query(
        'UPDATE children_profiles SET total_stars = total_stars + ?, total_score = total_score + ?, last_active_date = CURDATE() WHERE name = ?',
        [parseInt(stars) || 0, parseInt(score) || 0, name]
      );
      return res.json({ message: 'Progress saved successfully' });
    } catch (dbErr) {
      console.warn('MySQL fallback for progress:', dbErr.message);
      if (inMemoryKids[name]) {
        inMemoryKids[name].total_stars = (inMemoryKids[name].total_stars || 0) + (parseInt(stars) || 0);
        inMemoryKids[name].total_score = (inMemoryKids[name].total_score || 0) + (parseInt(score) || 0);
      }
      return res.json({ message: 'Progress recorded in fallback' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST reset child progress back to 0
router.post('/reset', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Child name required' });

    try {
      await pool.query(
        'UPDATE children_profiles SET total_stars = 0, total_score = 0, current_level = 1 WHERE name = ?',
        [name]
      );
      return res.json({ message: `Progress reset to 0 for ${name}` });
    } catch (dbErr) {
      if (inMemoryKids[name]) {
        inMemoryKids[name].total_stars = 0;
        inMemoryKids[name].total_score = 0;
      }
      return res.json({ message: `Progress reset (fallback) for ${name}` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
