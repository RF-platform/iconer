const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// API Proxy
app.use('/api', async (req, res) => {
  try {
    const targetUrl = `https://db.arcanum.rf-platform.online${req.url}`;
    console.log('Proxying request to:', targetUrl);
    
    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: {
        ...req.headers,
        host: 'db.arcanum.rf-platform.online',
        origin: 'https://iconer.rf-platform.online'
      },
      withCredentials: true
    });
    
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });
    res.status(error.response?.status || 500).json({
      message: error.message,
      error: error.response?.data
    });
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
}); 