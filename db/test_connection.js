// ========================================================
// Test Script: Verify MySQL Workbench Connection
// Run with: node db/test_connection.js
// ========================================================

const pool = require('./db');

async function testDatabaseConnection() {
  console.log('----------------------------------------------------');
  console.log('🔄 Testing MySQL Connection with MySQL Workbench...');
  console.log('----------------------------------------------------');

  try {
    const connection = await pool.getConnection();
    console.log('✅ SUCCESS: Connected to MySQL server!');

    // Check database name
    const [dbResult] = await connection.query('SELECT DATABASE() AS current_db');
    console.log(`📂 Current Database: ${dbResult[0].current_db}`);

    // Check tables in the database
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`📊 Total Tables Found: ${tables.length}`);
    tables.forEach((t, i) => {
      const tableName = Object.values(t)[0];
      console.log(`   ${i + 1}. ${tableName}`);
    });

    // Check challenge count
    const [challengeCount] = await connection.query('SELECT COUNT(*) AS total FROM challenges');
    console.log(`🎯 Active Challenges in DB: ${challengeCount[0].total}`);

    // Check users count
    const [userCount] = await connection.query('SELECT COUNT(*) AS total FROM users');
    console.log(`👥 Registered Users in DB: ${userCount[0].total}`);

    console.log('----------------------------------------------------');
    console.log('🎉 Your MySQL database is configured and ready!');
    console.log('----------------------------------------------------');

    connection.release();
    process.exit(0);
  } catch (err) {
    console.error('❌ MySQL Connection Failed:');
    console.error(`   Error Code: ${err.code}`);
    console.error(`   Message: ${err.message}`);
    console.log('\n💡 Troubleshooting Steps:');
    console.log('1. Open MySQL Workbench and make sure MySQL Server is running.');
    console.log('2. Check your password in C:\\Main-Project\\.env (set DB_PASSWORD to your MySQL root password).');
    console.log('3. Open schema.sql in MySQL Workbench and run it to create tables.');
    process.exit(1);
  }
}

testDatabaseConnection();
