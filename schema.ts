import { Database } from 'bun:sqlite';

export interface Todo {
  id: number;
  text: string;
  created_at: string;
}

export const db = new Database('todos.db');

// Create todos table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`); 