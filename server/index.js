const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB } = require('./db/init');
const cocktailsRouter = require('./routes/cocktails');
const favoritesRouter = require('./routes/favorites');
const customRouter = require('./routes/custom');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/cocktails', cocktailsRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/custom', customRouter);

// Serve static frontend in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// Init DB and start
initDB();
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🍸 Cocktail API running on http://localhost:${PORT}`);
});
