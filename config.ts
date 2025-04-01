import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';

// Initialize SQLite database
const sqlite = new Database('todos.db');

// Create drizzle database instance
export const db = drizzle(sqlite, { schema });

// Create todos table if it doesn't exist
sqlite.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`); 