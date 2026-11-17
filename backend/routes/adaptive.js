// ========================================================
// Adaptive Learning Engine (Deterministic Rule-Based Algorithm)
// Evaluates student performance and scales difficulty
// Academic requirement: Pure deterministic logic (No external ML libs)
// ========================================================

const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

/**
 * Adaptive Decision Rules:
 * - Accuracy >= 80%: PROMOTE (easy -> medium, medium -> hard)
 * - Accuracy <= 50%: DEMOTE / PRACTICE (hard -> medium, medium -> easy)
 * - Accuracy between 50% & 80%: MAINTAIN_CURRENT
 */
router.post('/evaluate', async (req, res) => {
  try {
    const { userId, recentAttempts } = req.body;
    // recentAttempts: array of { is_correct: true/false }

    if (!Array.isArray(recentAttempts) || recentAttempts.length === 0) {
      return res.status(400).json({ error: 'recentAttempts array is required' });
    }

    const total = recentAttempts.length;
    const correct = recentAttempts.filter(a => a.is_correct).length;
    const accuracy = Math.round((correct / total) * 100);

    let nextDifficulty = 'medium';
    let recommendation = '';
    let action = 'MAINTAIN';

    if (accuracy >= 80) {
      action = 'PROMOTE';
      nextDifficulty = 'hard';
      recommendation = `🔥 High Mastery (${accuracy}%)! Promoted to advanced problem solving!`;
    } else if (accuracy <= 50) {
      action = 'PRACTICE';
      nextDifficulty = 'easy';
      recommendation = `💡 Review Needed (${accuracy}%). Switching to foundation challenges for practice.`;
    } else {
      action = 'MAINTAIN';
      nextDifficulty = 'medium';
      recommendation = `👍 Steady Progress (${accuracy}%). Continuing at standard difficulty level.`;
    }

    // Optionally update user's current level in MySQL if userId provided
    if (userId) {
      try {
        await pool.query('UPDATE users SET current_level = ? WHERE id = ?', [nextDifficulty, userId]);
      } catch (dbErr) {
        console.warn('MySQL update current_level fallback:', dbErr.message);
      }
    }

    return res.json({
      evaluation: {
        total_questions: total,
        correct_answers: correct,
        accuracy_percent: accuracy,
        action,
        recommended_difficulty: nextDifficulty,
        feedback: recommendation
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
