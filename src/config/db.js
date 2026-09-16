const mysql = require('mysql2/promise');

let pool = null;
let isConnected = false;
let dbStatusInfo = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: Number(process.env.MYSQL_PORT) || 3306,
  database: process.env.MYSQL_DATABASE || 'marathi_learning',
  user: process.env.MYSQL_USER || 'root',
  connected: false,
  lastError: null,
  fallbackActive: false,
};

const connectDB = async () => {
  const host = process.env.MYSQL_HOST || '127.0.0.1';
  const port = Number(process.env.MYSQL_PORT) || 3306;
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || '';
  const database = process.env.MYSQL_DATABASE || 'marathi_learning';

  dbStatusInfo.host = host;
  dbStatusInfo.port = port;
  dbStatusInfo.user = user;
  dbStatusInfo.database = database;

  try {
    // Attempt connecting to MySQL
    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 2000,
    });

    // Test connection
    const connection = await pool.getConnection();
    
    // Ensure table exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mobile_number VARCHAR(20) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL DEFAULT 'Learner',
        email VARCHAR(150) NOT NULL DEFAULT '',
        age INT DEFAULT NULL,
        gender ENUM('Male', 'Female', 'Other', 'Not Specified') NOT NULL DEFAULT 'Not Specified',
        preferred_language VARCHAR(50) NOT NULL DEFAULT 'Marathi',
        profile_image VARCHAR(255) NOT NULL DEFAULT '',
        is_profile_complete TINYINT(1) NOT NULL DEFAULT 0,
        is_deleted TINYINT(1) NOT NULL DEFAULT 0,
        deleted_at DATETIME DEFAULT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_mobile_number (mobile_number)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Ensure columns exist if table already existed (migration)
    try {
      await connection.query(`ALTER TABLE users ADD COLUMN is_deleted TINYINT(1) NOT NULL DEFAULT 0, ADD COLUMN deleted_at DATETIME DEFAULT NULL;`);
    } catch (e) {
      // Ignore error if columns already exist
    }

    connection.release();
    isConnected = true;
    dbStatusInfo.connected = true;
    dbStatusInfo.fallbackActive = false;
    dbStatusInfo.lastError = null;
    console.log(`[Database] MySQL Connected to ${host}:${port}/${database}`);
    return true;
  } catch (error) {
    isConnected = false;
    dbStatusInfo.connected = false;
    dbStatusInfo.fallbackActive = true;
    dbStatusInfo.lastError = error.message;
    pool = null;
    console.warn(`[Database Warning] Unable to connect to MySQL at ${host}:${port}/${database}. Error: ${error.message}`);
    console.warn(`[Database Info] Operating with in-memory fallback for seamless execution.`);
    return false;
  }
};

const getPool = () => pool;
const getIsConnected = () => isConnected;
const getDbStatusInfo = () => ({ ...dbStatusInfo });

module.exports = { connectDB, getPool, getIsConnected, getDbStatusInfo };
