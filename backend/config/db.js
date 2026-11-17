// ========================================================
// Database Connection Pool - MySQL Configuration
// SkillSpring AI - Adaptive Gamified Learning Platform
// SkillSpring AI Educational Platform
// ========================================================

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from root .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Ankita@123',
  database: process.env.DB_NAME || 'adaptive_learning',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create MySQL Connection Pool
const pool = mysql.createPool(dbConfig);

// Helper function to test DB connection safely
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(`✅ [MySQL Connected] Database "${dbConfig.database}" is active on ${dbConfig.host}:${dbConfig.port}`);
    connection.release();
    return true;
  } catch (err) {
    console.warn(`⚠️ [MySQL Offline/Standby] Error: ${err.message}`);
    console.warn(`ℹ️ The platform will run in graceful fallback mode for offline testing.`);
    return false;
  }
}

testConnection();

module.exports = { pool, testConnection };
