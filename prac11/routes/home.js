// routes/home.js
const express = require('express');
const router = express.Router();

// /home route (dashboard placeholder)
router.get('/', (req, res) => {
  res.send('<h1>👋 Hello Team! Welcome to the Dashboard (future page)</h1>');
});

module.exports = router;
