const express = require('express');
const router = express.Router();
const { getDB } = require('../db/init');

// GET /api/custom - List custom cocktails
router.get('/', (req, res) => {
  const db = getDB();
  try {
    const customs = db.prepare('SELECT * FROM cocktails WHERE is_custom = 1 ORDER BY created_at DESC').all();
    const result = customs.map(c => {
      c.ingredients = db.prepare('SELECT name, amount, unit FROM ingredients WHERE cocktail_id = ? ORDER BY sort_order').all(c.id);
      c.steps = db.prepare('SELECT content FROM steps WHERE cocktail_id = ? ORDER BY step_order').all(c.id).map(s => s.content);
      c.tags = db.prepare('SELECT tag FROM tags WHERE cocktail_id = ?').all(c.id).map(t => t.tag);
      c.isFavorite = !!db.prepare('SELECT 1 FROM favorites WHERE cocktail_id = ?').get(c.id);
      return c;
    });
    res.json(result);
  } finally {
    db.close();
  }
});

// POST /api/custom - Create custom cocktail
router.post('/', (req, res) => {
  const db = getDB();
  try {
    const { name, name_en, category, base_spirit, flavor, difficulty, glass, method, garnish, story, ingredients, steps, tags } = req.body;
    
    if (!name) return res.status(400).json({ error: '酒名不能为空' });
    
    const info = db.prepare(`
      INSERT INTO cocktails (name, name_en, category, base_spirit, flavor, difficulty, glass, method, garnish, story, is_custom)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).run(name, name_en || '', category || '自创', base_spirit || '', flavor || '', difficulty || '入门', glass || '', method || '', garnish || '', story || '');
    
    const id = info.lastInsertRowid;
    
    const insertIng = db.prepare('INSERT INTO ingredients (cocktail_id, name, amount, unit, sort_order) VALUES (?, ?, ?, ?, ?)');
    const insertStep = db.prepare('INSERT INTO steps (cocktail_id, step_order, content) VALUES (?, ?, ?)');
    const insertTag = db.prepare('INSERT INTO tags (cocktail_id, tag) VALUES (?, ?)');
    
    if (ingredients && ingredients.length) {
      ingredients.forEach((ing, i) => insertIng.run(id, ing.name, ing.amount || '', ing.unit || '', i));
    }
    if (steps && steps.length) {
      steps.forEach((step, i) => insertStep.run(id, i + 1, step));
    }
    if (tags && tags.length) {
      tags.forEach(tag => insertTag.run(id, tag));
    }
    
    const cocktail = db.prepare('SELECT * FROM cocktails WHERE id = ?').get(id);
    cocktail.ingredients = db.prepare('SELECT name, amount, unit FROM ingredients WHERE cocktail_id = ? ORDER BY sort_order').all(id);
    cocktail.steps = db.prepare('SELECT content FROM steps WHERE cocktail_id = ? ORDER BY step_order').all(id).map(s => s.content);
    cocktail.tags = db.prepare('SELECT tag FROM tags WHERE cocktail_id = ?').all(id).map(t => t.tag);
    
    res.status(201).json(cocktail);
  } finally {
    db.close();
  }
});

// PUT /api/custom/:id - Update custom cocktail
router.put('/:id', (req, res) => {
  const db = getDB();
  try {
    const existing = db.prepare('SELECT * FROM cocktails WHERE id = ? AND is_custom = 1').get(req.params.id);
    if (!existing) return res.status(404).json({ error: '找不到该自创配方' });
    
    const { name, name_en, category, base_spirit, flavor, difficulty, glass, method, garnish, story, ingredients, steps, tags } = req.body;
    
    db.prepare(`
      UPDATE cocktails SET name=?, name_en=?, category=?, base_spirit=?, flavor=?, difficulty=?, glass=?, method=?, garnish=?, story=?
      WHERE id=? AND is_custom=1
    `).run(
      name || existing.name, name_en ?? existing.name_en, category || existing.category,
      base_spirit || existing.base_spirit, flavor ?? existing.flavor, difficulty || existing.difficulty,
      glass ?? existing.glass, method || existing.method, garnish ?? existing.garnish,
      story ?? existing.story, req.params.id
    );
    
    // Replace ingredients, steps, tags
    db.prepare('DELETE FROM ingredients WHERE cocktail_id = ?').run(req.params.id);
    db.prepare('DELETE FROM steps WHERE cocktail_id = ?').run(req.params.id);
    db.prepare('DELETE FROM tags WHERE cocktail_id = ?').run(req.params.id);
    
    const insertIng = db.prepare('INSERT INTO ingredients (cocktail_id, name, amount, unit, sort_order) VALUES (?, ?, ?, ?, ?)');
    const insertStep = db.prepare('INSERT INTO steps (cocktail_id, step_order, content) VALUES (?, ?, ?)');
    const insertTag = db.prepare('INSERT INTO tags (cocktail_id, tag) VALUES (?, ?)');
    
    if (ingredients && ingredients.length) {
      ingredients.forEach((ing, i) => insertIng.run(req.params.id, ing.name, ing.amount || '', ing.unit || '', i));
    }
    if (steps && steps.length) {
      steps.forEach((step, i) => insertStep.run(req.params.id, i + 1, step));
    }
    if (tags && tags.length) {
      tags.forEach(tag => insertTag.run(req.params.id, tag));
    }
    
    res.json({ success: true });
  } finally {
    db.close();
  }
});

// DELETE /api/custom/:id
router.delete('/:id', (req, res) => {
  const db = getDB();
  try {
    const existing = db.prepare('SELECT 1 FROM cocktails WHERE id = ? AND is_custom = 1').get(req.params.id);
    if (!existing) return res.status(404).json({ error: '找不到该自创配方' });
    db.prepare('DELETE FROM cocktails WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } finally {
    db.close();
  }
});

// Notes
router.post('/:id/notes', (req, res) => {
  const db = getDB();
  try {
    const { content, rating } = req.body;
    if (!content) return res.status(400).json({ error: '笔记内容不能为空' });
    db.prepare('INSERT INTO notes (cocktail_id, content, rating) VALUES (?, ?, ?)').run(req.params.id, content, rating || null);
    res.status(201).json({ success: true });
  } finally {
    db.close();
  }
});

// Bar shelf
router.get('/bar-shelf/list', (req, res) => {
  const db = getDB();
  try {
    const items = db.prepare('SELECT * FROM bar_shelf ORDER BY category, name').all();
    res.json(items);
  } finally {
    db.close();
  }
});

router.post('/bar-shelf', (req, res) => {
  const db = getDB();
  try {
    const { name, category } = req.body;
    if (!name) return res.status(400).json({ error: '名称不能为空' });
    db.prepare('INSERT OR IGNORE INTO bar_shelf (name, category) VALUES (?, ?)').run(name, category || '');
    res.status(201).json({ success: true });
  } finally {
    db.close();
  }
});

router.delete('/bar-shelf/:id', (req, res) => {
  const db = getDB();
  try {
    db.prepare('DELETE FROM bar_shelf WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } finally {
    db.close();
  }
});

module.exports = router;
