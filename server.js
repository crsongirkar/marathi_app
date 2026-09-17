require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, getDbStatusInfo, getIsConnected } = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const { notFoundHandler, globalErrorHandler, renderErrorHtml } = require('./src/middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5005;
const HOST = process.env.HOST || 'localhost';

const getBaseUrl = () => {
  if (process.env.BASE_URL) return process.env.BASE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://${HOST}:${PORT}`;
};

const BASE_URL = getBaseUrl();
const API_PREFIX = process.env.API_PREFIX || '/api/auth';

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Middleware to parse incoming JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serverless DB Auto-Connect Middleware
let dbInitPromise = null;
app.use(async (req, res, next) => {
  if (!getIsConnected() && !getDbStatusInfo().fallbackActive) {
    if (!dbInitPromise) {
      dbInitPromise = connectDB();
    }
    await dbInitPromise;
  }
  next();
});

// Serve static files from 'public' directory
app.use(express.static('public'));

// API Dashboard Route
app.get('/api-status', (req, res) => {
  const dbInfo = getDbStatusInfo();
  
  if (req.accepts('html')) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Marathi Learning Backend API</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Outfit', sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; }
    .card { background: #1e293b; border-radius: 16px; padding: 32px; max-width: 700px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.1); }
    h1 { color: #38bdf8; font-size: 28px; margin-bottom: 8px; }
    .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 13px; background: rgba(34, 197, 94, 0.2); color: #4ade80; margin-bottom: 20px; }
    .status.fallback { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
    .url-box { background: #0f172a; padding: 12px 16px; border-radius: 8px; font-family: monospace; color: #38bdf8; margin-bottom: 20px; word-break: break-all; }
    .endpoint { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 8px; margin-bottom: 8px; display: flex; justify-content: space-between; }
    .method { background: #0284c7; color: white; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 Marathi Learning API</h1>
    <div class="status ${dbInfo.connected ? '' : 'fallback'}">
      ${dbInfo.connected ? '● Database Connected (MySQL)' : '▲ Operating with Fallback Engine'}
    </div>
    
    <div class="url-box">Base URL: ${BASE_URL}</div>

    <h3>Available Endpoints:</h3>
    <div class="endpoint">
      <span><span class="method">POST</span> ${API_PREFIX}/mobile-auth</span>
      <span style="color:#94a3b8">Mobile Login / Auto-Signup</span>
    </div>
    <div class="endpoint">
      <span><span class="method">GET</span> ${API_PREFIX}/profile</span>
      <span style="color:#94a3b8">Get Profile (Bearer Token)</span>
    </div>
    <div class="endpoint">
      <span><span class="method">PUT</span> ${API_PREFIX}/profile</span>
      <span style="color:#94a3b8">Update Profile (Bearer Token)</span>
    </div>
    <div class="endpoint">
      <span><span class="method">GET</span> /health</span>
      <span style="color:#94a3b8">System Health & DB Status</span>
    </div>
    <div class="endpoint">
      <span><span class="method">GET</span> /db-status</span>
      <span style="color:#94a3b8">Database Connection Page</span>
    </div>
  </div>
</body>
</html>`);
  }

  res.json({
    success: true,
    name: 'Marathi Learning API Backend',
    version: '1.0.0',
    status: 'Running',
    baseUrl: BASE_URL,
    apiPrefix: API_PREFIX,
    database: {
      connected: dbInfo.connected,
      engine: dbInfo.connected ? 'MySQL' : 'In-Memory Fallback',
      host: dbInfo.host,
      port: dbInfo.port,
      name: dbInfo.database,
    },
    endpoints: {
      mobileAuth: `${BASE_URL}${API_PREFIX}/mobile-auth`,
      getProfile: `${BASE_URL}${API_PREFIX}/profile`,
      updateProfile: `${BASE_URL}${API_PREFIX}/profile`,
      healthCheck: `${BASE_URL}/health`,
      dbStatus: `${BASE_URL}/db-status`,
    },
  });
});

// Health Check Endpoint
app.get('/health', (req, res) => {
  const dbInfo = getDbStatusInfo();
  res.json({
    success: true,
    status: 'UP',
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    database: dbInfo,
  });
});

// Flashcards API Endpoint
app.get(['/api/cards', '/api/auth/cards'], (req, res) => {
  res.json({
    success: true,
    message: 'Flashcards fetched successfully',
    totalCards: 53,
  });
});

// App Version & In-App Update Check Endpoint
app.get('/api/app-version', (req, res) => {
  res.json({
    success: true,
    latestVersion: process.env.LATEST_APP_VERSION || '1.0.5',
    minVersion: process.env.MIN_APP_VERSION || '1.0.0',
    forceUpdate: process.env.FORCE_UPDATE === 'true',
    updateUrl: process.env.APP_UPDATE_URL || 'https://play.google.com/store/apps/details?id=com.example.rto_marathi_learning',
    releaseNotes: [
      'New RTO sign learning questions and quiz modules',
      'Smoother Marathi pronunciation audio playback',
      'UI refinements and performance optimizations',
    ],
  });
});


// Dedicated DB Connection Error Page / Status Endpoint
app.get('/db-status', (req, res) => {
  const dbInfo = getDbStatusInfo();
  
  if (dbInfo.connected) {
    if (req.accepts('html')) {
      return res.send(renderErrorHtml({
        title: 'Database Connected Successfully',
        code: 200,
        message: `MySQL Database connection is active on ${dbInfo.host}:${dbInfo.port}/${dbInfo.database}.`,
        details: `Host: ${dbInfo.host}\nPort: ${dbInfo.port}\nDatabase: ${dbInfo.database}\nUser: ${dbInfo.user}`,
      }));
    }
    return res.json({ success: true, message: 'Database connected', info: dbInfo });
  }

  // Database Connection Error Page
  if (req.accepts('html')) {
    return res.status(503).send(renderErrorHtml({
      title: 'Database Connection Warning',
      code: 503,
      message: `Could not connect to MySQL server at ${dbInfo.host}:${dbInfo.port}. The API is currently operating with in-memory fallback.`,
      details: `MySQL Host: ${dbInfo.host}:${dbInfo.port}\nDatabase: ${dbInfo.database}\nError: ${dbInfo.lastError || 'Access denied / Server offline'}\n\nTroubleshooting:\n1. Ensure MySQL server (XAMPP/MAMP/Brew/Service) is started.\n2. Verify credentials in .env file (MYSQL_USER, MYSQL_PASSWORD).`,
      isDbError: true,
    }));
  }

  return res.status(503).json({
    success: false,
    status: 503,
    error: 'Database Connection Error',
    message: `Could not connect to MySQL at ${dbInfo.host}:${dbInfo.port}.`,
    info: dbInfo,
  });
});

// Register API Routes
app.use(API_PREFIX, authRoutes);

// Handle 404 Undefined Routes
app.use(notFoundHandler);

// Global Error Handler
app.use(globalErrorHandler);

// Start Server Function
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Marathi Learning API Server running at:`);
    console.log(`📍 Local Base URL: ${BASE_URL}`);
    console.log(`📍 Mobile Auth:   ${BASE_URL}${API_PREFIX}/mobile-auth`);
    console.log(`📍 User Profile:  ${BASE_URL}${API_PREFIX}/profile`);
    console.log(`📍 System Health: ${BASE_URL}/health`);
    console.log(`=======================================================`);
  });
};

// Execute startup if run directly
if (require.main === module) {
  startServer();
}

module.exports = app;
