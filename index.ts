import { Elysia } from 'elysia'
import { db } from './schema'


const app = new Elysia()

// Healthcheck endpoint
app.get('/health', () => ({
  status: 'ok',
  timestamp: new Date().toISOString()
}))

// Get all todos
app.get('/todos', () => {
  const todos = db.query('SELECT * FROM todos ORDER BY created_at DESC').all()
  return todos
})

// Create new todo
app.post('/todos', ({ body }) => {
  const { text } = body as { text: string }
  if (!text) {
    throw new Error('Text is required')
  }
  
  const stmt = db.prepare('INSERT INTO todos (text) VALUES (?)')
  const result = stmt.run(text)
  
  const newTodo = {
    id: result.lastInsertRowid,
    text,
    created_at: new Date().toISOString()
  }
  
  return newTodo
})

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
app.listen(port)

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`)