const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'cocktails.db');

function getDB() {
  return new Database(DB_PATH);
}

function initDB() {
  const db = getDB();

  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS cocktails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      name_en TEXT,
      category TEXT NOT NULL,
      base_spirit TEXT NOT NULL,
      flavor TEXT,
      difficulty TEXT DEFAULT '入门',
      glass TEXT,
      method TEXT,
      garnish TEXT,
      story TEXT,
      is_custom INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cocktail_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      amount TEXT,
      unit TEXT,
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (cocktail_id) REFERENCES cocktails(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS steps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cocktail_id INTEGER NOT NULL,
      step_order INTEGER NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY (cocktail_id) REFERENCES cocktails(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cocktail_id INTEGER NOT NULL,
      tag TEXT NOT NULL,
      FOREIGN KEY (cocktail_id) REFERENCES cocktails(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cocktail_id INTEGER NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bar_shelf (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      category TEXT
    );

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cocktail_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      rating INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cocktail_id) REFERENCES cocktails(id) ON DELETE CASCADE
    );
  `);

  db.close();
  console.log('✅ Database initialized');
}

module.exports = { getDB, initDB, DB_PATH };
