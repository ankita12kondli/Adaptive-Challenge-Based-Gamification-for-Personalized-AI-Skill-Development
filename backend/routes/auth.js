// ========================================================
// Authentication Routes (Students, Adults 35+, Admin)
// Express.js & MySQL Integration
// ========================================================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'skillspring_jwt_secret_key_2026';

// Register User (Student / Adult / Kid)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const assignedRole = ['student', 'adult', 'kid', 'child', 'admin'].includes(role)
      ? (role === 'child' ? 'kid' : role)
      : 'student';

    try {
      // Check if user already exists in MySQL
      const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Email is already registered' });
      }

      // Hash password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, role, current_level, total_points, streak_days) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, assignedRole, 'medium', 0, 1]
      );

      const token = jwt.sign({ id: result.insertId, email, role: assignedRole }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        message: 'Registration successful',
        token,
        user: { id: result.insertId, name, email, role: assignedRole, current_level: 'medium', total_points: 0 }
      });
    } catch (dbErr) {
      // Graceful fallback for mock mode if MySQL is not running
      console.warn('MySQL fallback for register:', dbErr.message);
      return res.status(201).json({
        message: 'Registered in demo mode',
        user: { id: Date.now(), name, email, role: assignedRole, current_level: 'medium', total_points: 0 }
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});

// Login User with strict Role-Based Access Control (RBAC)
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Default hardcoded admin check for quick college demo
    if (email === 'admin@skillspring.edu' && password === 'admin123') {
      const token = jwt.sign({ id: 1, email, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        message: 'Admin login successful',
        token,
        user: { id: 1, name: 'System Administrator', email, role: 'admin' }
      });
    }

    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password).catch(() => user.password === password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Strict Role Validation: verify requested role matches user's registered role
      if (role && user.role !== 'admin' && user.role !== role) {
        const roleLabels = {
          student: 'Student (College AI Hub)',
          adult: 'Adult 35+ Learning Zone',
          kid: 'Kids Learning Zone'
        };
        const actual = roleLabels[user.role] || user.role;
        const requested = roleLabels[role] || role;
        return res.status(403).json({
          error: `Access Denied: This account (${user.email}) is registered under the ${actual}. You cannot log into the ${requested} with this account. Please select "${actual}" in the dropdown.`
        });
      }

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, current_level: user.current_level, total_points: user.total_points }
      });
    } catch (dbErr) {
      console.warn('MySQL fallback for login:', dbErr.message);
      // Demo fallback
      const fallbackRole = role || 'student';
      return res.json({
        message: 'Login successful (demo mode)',
        user: { id: 101, name: email.split('@')[0], email, role: fallbackRole, current_level: 'medium', total_points: 50 }
      });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
});

module.exports = router;
