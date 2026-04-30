const express = require('express');
const router = express.Router();
const { getDB } = require('../db/init');

// GET /api/favorites
router.get('/', (req, res) => {
  const db = getDB();
  try {
    const favs = db.prepare(`
      SELECT c.* FROM cocktails c
      INNER JOIN favorites f ON c.id = f.cocktail_id
      ORDER BY f.created_at DESC
    `).all();
    
    const result = favs.map(c => {
      c.ingredients = db.prepare('SELECT name, amount, unit FROM ingredients WHERE cocktail_id = ? ORDER BY sort_order').all(c.id);
      c.steps = db.prepare('SELECT content FROM steps WHERE cocktail_id = ? ORDER BY step_order').all(c.id).map(s => s.content);
      c.tags = db.prepare('SELECT tag FROM tags WHERE cocktail_id = ?').all(c.id).map(t => t.tag);
      c.isFavorite = true;
      return c;
    });
    
    res.json(result);
  } finally {
    db.close();
  }
});

// POST /api/favorites/:id - Toggle favorite
router.post('/:id', (req, res) => {
  const db = getDB();
  try {
    const existing = db.prepare('SELECT 1 FROM favorites WHERE cocktail_id = ?').get(req.params.id);
    if (existing) {
      db.prepare('DELETE FROM favorites WHERE cocktail_id = ?').run(req.params.id);
      res.json({ favorited: false });
    } else {
      db.prepare('INSERT INTO favorites (cocktail_id) VALUES (?)').run(req.params.id);
      res.json({ favorited: true });
    }
  } finally {
    db.close();
  }
});

module.exports = router;
