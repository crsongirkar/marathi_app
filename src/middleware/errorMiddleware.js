const { getDbStatusInfo } = require('../config/db');

/**
 * Modern HTML Error Page Template Generator
 */
const renderErrorHtml = ({ title, code, message, details, endpoints, isDbError = false }) => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  
  const endpointRows = endpoints
    ? Object.entries(endpoints)
        .map(([name, route]) => `
          <div class="endpoint-card">
            <span class="method-tag">${route.split(' ')[0]}</span>
            <code class="route-path">${route.split(' ')[1] || ''}</code>
            <span class="route-name">${name}</span>
          </div>
        `).join('')
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${code} - ${title} | Marathi Learning API</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      --card-bg: rgba(30, 41, 59, 0.7);
      --card-border: rgba(255, 255, 255, 0.1);
      --accent-color: #38bdf8;
      --error-color: #f43f5e;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Outfit', sans-serif; }
    body {
      background: var(--bg-gradient);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .error-container {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      max-width: 650px;
      width: 100%;
      padding: 40px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .badge {
      display: inline-block;
      padding: 6px 16px;
      background: rgba(244, 63, 94, 0.15);
      color: var(--error-color);
      border-radius: 9999px;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .badge.warning {
      background: rgba(245, 158, 11, 0.15);
      color: #f59e0b;
    }
    h1 { font-size: 32px; font-weight: 700; margin-bottom: 12px; }
    p.message { color: var(--text-muted); font-size: 16px; line-height: 1.6; margin-bottom: 24px; }
    .details-box {
      background: rgba(15, 23, 42, 0.8);
      border-left: 4px solid var(--accent-color);
      padding: 16px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 14px;
      color: #cbd5e1;
      margin-bottom: 28px;
      word-break: break-all;
    }
    .endpoints-list { margin-top: 24px; }
    .endpoints-title { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 12px; }
    .endpoint-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 12px 16px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    .method-tag {
      background: #0284c7;
      color: white;
      font-weight: 700;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 4px;
    }
    .route-path { color: var(--accent-color); font-weight: 600; }
    .route-name { color: var(--text-muted); margin-left: auto; font-size: 13px; }
    .btn {
      display: inline-block;
      margin-top: 24px;
      padding: 12px 24px;
      background: #0284c7;
      color: white;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn:hover { background: #0369a1; }
  </style>
</head>
<body>
  <div class="error-container">
    <div class="badge ${isDbError ? 'warning' : ''}">${code} ${title}</div>
    <h1>${title}</h1>
    <p class="message">${message}</p>

    ${details ? `<div class="details-box">${details}</div>` : ''}

    ${endpointRows ? `
      <div class="endpoints-list">
        <div class="endpoints-title">Available API Routes</div>
        ${endpointRows}
      </div>
    ` : ''}

    <a href="${baseUrl}/" class="btn">Return to API Home</a>
  </div>
</body>
</html>`;
};

/**
 * 404 Route Not Found Handler
 */
const notFoundHandler = (req, res) => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  const endpoints = {
    mobileAuth: 'POST /api/auth/mobile-auth',
    getProfile: 'GET /api/auth/profile',
    updateProfile: 'PUT /api/auth/profile',
    healthCheck: 'GET /health',
    dbStatus: 'GET /db-status',
  };

  const message = `The requested endpoint ${req.method} ${req.originalUrl} does not exist on this server.`;

  if (req.accepts('html')) {
    return res.status(404).send(renderErrorHtml({
      title: 'Route Not Found',
      code: 404,
      message,
      endpoints,
    }));
  }

  return res.status(404).json({
    success: false,
    status: 404,
    message,
    availableEndpoints: {
      mobileAuth: `${baseUrl}/api/auth/mobile-auth`,
      getProfile: `${baseUrl}/api/auth/profile`,
      updateProfile: `${baseUrl}/api/auth/profile`,
      health: `${baseUrl}/health`,
      dbStatus: `${baseUrl}/db-status`,
    },
  });
};

/**
 * Global Error Handler (500 & DB Error Pages)
 */
const globalErrorHandler = (err, req, res, next) => {
  console.error('[Global Error Handler]:', err);

  const isDbError = err.name === 'MySqlError' || err.code === 'ECONNREFUSED' || err.message.includes('MySQL');
  const statusCode = err.status || 500;
  const title = isDbError ? 'Database Connection Error' : 'Internal Server Error';
  const message = isDbError
    ? 'Unable to connect to the MySQL database. Please verify that MySQL server is running on localhost:3306.'
    : (err.message || 'An unexpected error occurred on the server.');

  const dbInfo = getDbStatusInfo();
  const details = isDbError
    ? `MySQL Host: ${dbInfo.host}:${dbInfo.port}\nDatabase: ${dbInfo.database}\nError: ${err.message}`
    : err.stack;

  if (req.accepts('html')) {
    return res.status(statusCode).send(renderErrorHtml({
      title,
      code: statusCode,
      message,
      details,
      isDbError,
    }));
  }

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    error: title,
    message,
    ...(process.env.NODE_ENV === 'development' && { details }),
  });
};

module.exports = {
  notFoundHandler,
  globalErrorHandler,
  renderErrorHtml,
};
