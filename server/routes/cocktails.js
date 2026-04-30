const express = require('express');
const router = express.Router();
const { getDB } = require('../db/init');

// Helper: enrich cocktail with ingredients, steps, tags
function enrichCocktail(db, cocktail) {
  if (!cocktail) return null;
  cocktail.ingredients = db.prepare('SELECT name, amount, unit FROM ingredients WHERE cocktail_id = ? ORDER BY sort_order').all(cocktail.id);
  cocktail.steps = db.prepare('SELECT content FROM steps WHERE cocktail_id = ? ORDER BY step_order').all(cocktail.id).map(s => s.content);
  cocktail.tags = db.prepare('SELECT tag FROM tags WHERE cocktail_id = ?').all(cocktail.id).map(t => t.tag);
  cocktail.isFavorite = !!db.prepare('SELECT 1 FROM favorites WHERE cocktail_id = ?').get(cocktail.id);
  cocktail.notes = db.prepare('SELECT id, content, rating, created_at FROM notes WHERE cocktail_id = ? ORDER BY created_at DESC').all(cocktail.id);
  return cocktail;
}

// GET /api/cocktails - List all (with optional filters)
router.get('/', (req, res) => {
  const db = getDB();
  try {
    const { search, base_spirit, category, difficulty, flavor, tag, method } = req.query;
    let sql = 'SELECT * FROM cocktails WHERE 1=1';
    const params = [];

    if (search) {
      sql += ' AND (name LIKE ? OR name_en LIKE ? OR story LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (base_spirit) { sql += ' AND base_spirit = ?'; params.push(base_spirit); }
    if (category) { sql += ' AND category = ?'; params.push(category); }
    if (difficulty) { sql += ' AND difficulty = ?'; params.push(difficulty); }
    if (flavor) { sql += ' AND flavor LIKE ?'; params.push(`%${flavor}%`); }
    if (method) { sql += ' AND method = ?'; params.push(method); }
    if (tag) {
      sql += ' AND id IN (SELECT cocktail_id FROM tags WHERE tag = ?)';
      params.push(tag);
    }

    sql += ' ORDER BY name';
    const cocktails = db.prepare(sql).all(...params);
    const result = cocktails.map(c => enrichCocktail(db, c));
    res.json(result);
  } finally {
    db.close();
  }
});

// GET /api/cocktails/filters - Get available filter options
router.get('/filters', (req, res) => {
  const db = getDB();
  try {
    const spirits = db.prepare('SELECT DISTINCT base_spirit FROM cocktails ORDER BY base_spirit').all().map(r => r.base_spirit);
    const categories = db.prepare('SELECT DISTINCT category FROM cocktails ORDER BY category').all().map(r => r.category);
    const difficulties = db.prepare('SELECT DISTINCT difficulty FROM cocktails ORDER BY difficulty').all().map(r => r.difficulty);
    const flavors = db.prepare('SELECT DISTINCT flavor FROM cocktails ORDER BY flavor').all().map(r => r.flavor);
    const methods = db.prepare('SELECT DISTINCT method FROM cocktails ORDER BY method').all().map(r => r.method);
    const tags = db.prepare('SELECT DISTINCT tag FROM tags ORDER BY tag').all().map(r => r.tag);
    res.json({ spirits, categories, difficulties, flavors, methods, tags });
  } finally {
    db.close();
  }
});

// GET /api/cocktails/random - Random cocktail
router.get('/random', (req, res) => {
  const db = getDB();
  try {
    const { base_spirit, difficulty } = req.query;
    let sql = 'SELECT * FROM cocktails';
    const params = [];
    const conditions = [];
    if (base_spirit) { conditions.push('base_spirit = ?'); params.push(base_spirit); }
    if (difficulty) { conditions.push('difficulty = ?'); params.push(difficulty); }
    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
    sql += ' ORDER BY RANDOM() LIMIT 1';
    const cocktail = db.prepare(sql).get(...params);
    res.json(enrichCocktail(db, cocktail));
  } finally {
    db.close();
  }
});

// GET /api/cocktails/recommend - Smart recommendation based on available ingredients
router.get('/recommend', (req, res) => {
  const db = getDB();
  try {
    const { ingredients } = req.query; // comma-separated ingredient names
    if (!ingredients) return res.json([]);
    
    const userIngredients = ingredients.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    if (!userIngredients.length) return res.json([]);

    // Get all cocktails with their ingredients
    const allCocktails = db.prepare('SELECT * FROM cocktails').all();
    const results = [];

    for (const cocktail of allCocktails) {
      const cIngredients = db.prepare('SELECT name FROM ingredients WHERE cocktail_id = ?').all(cocktail.id);
      const total = cIngredients.length;
      if (total === 0) continue;
      
      const matched = cIngredients.filter(ing => 
        userIngredients.some(ui => ing.name.toLowerCase().includes(ui))
      ).length;
      
      const ratio = matched / total;
      if (ratio >= 0.5) {
        results.push({
          ...enrichCocktail(db, cocktail),
          matchRatio: ratio,
          matchedCount: matched,
          totalCount: total
        });
      }
    }

    results.sort((a, b) => b.matchRatio - a.matchRatio);
    res.json(results.slice(0, 20));
  } finally {
    db.close();
  }
});

// GET /api/cocktails/:id - Single cocktail
router.get('/:id', (req, res) => {
  const db = getDB();
  try {
    const cocktail = db.prepare('SELECT * FROM cocktails WHERE id = ?').get(req.params.id);
    if (!cocktail) return res.status(404).json({ error: '找不到该鸡尾酒' });
    res.json(enrichCocktail(db, cocktail));
  } finally {
    db.close();
  }
});

module.exports = router;
