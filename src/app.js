require('dotenv').config();

const express = require('express');
const path = require('path');

function createApp() {
  const app = express();

  const environment = process.env.NODE_ENV || 'development';
  const appVersion = process.env.APP_VERSION || '1.0.0';

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      environment,
      version: appVersion
    });
  });

  app.get('/api/info', (req, res) => {
    res.status(200).json({
      application: 'IBM Q2D DevOps Demo',
      version: appVersion,
      environment
    });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
}

module.exports = { createApp };
