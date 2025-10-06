// server.js
const express = require('express');
const homeRoute = require('./routes/home');

const app = express();
const PORT = 3000;

// Middleware (can add bodyParser, cors, etc. later)
app.use(express.json());

// Routes
app.use('/home', homeRoute);

// Default route
app.get('/', (req, res) => {
  res.send('<h2>Welcome! Go to <a href="/home">/home</a> for dashboard greeting.</h2>');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
