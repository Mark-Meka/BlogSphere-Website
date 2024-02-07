const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_modified_at DATETIME,
      publication_date DATETIME,
      reads INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      article_id INTEGER,
      commenter_name TEXT,
      comment TEXT,
      date DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      blog_title TEXT,
      author_name TEXT
    )
  `);
});

db.close();

