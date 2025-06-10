import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { DATABASE_URL } from '$env/static/private';

let db: any = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: DATABASE_URL || 'donation-platform.db',
      driver: sqlite3.Database
    });
    
    await initDb();
  }
  
  return db;
}

async function initDb() {
  const db = await getDb();
  
  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT,
      target_amount REAL NOT NULL,
      created_at TEXT NOT NULL,
      is_active INTEGER NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS donations (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      amount REAL NOT NULL,
      mpesa_receipt_number TEXT,
      phone_number_hash TEXT,
      donation_date TEXT NOT NULL,
      is_anonymous INTEGER NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects (id)
    );
    
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES admin_users (id)
    );
  `);
}
