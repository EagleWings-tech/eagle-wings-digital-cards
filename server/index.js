require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const identityRoutes = require('./routes/identity');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI in environment. Copy server/.env.example to server/.env and set your MongoDB connection string.');
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb' }));

// API
app.use('/api', identityRoutes);

// Static: frontend (index, form, card, css, js, images)
app.use(express.static(path.join(__dirname, '..')));

// SPA-style fallback so /card and /card/ work
app.get('/card', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'card', 'index.html'));
});
app.get('/card/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'card', 'index.html'));
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log('Server running at http://localhost:' + PORT);
      console.log('  Form: http://localhost:' + PORT + '/form.html');
      console.log('  Card: http://localhost:' + PORT + '/card/');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
