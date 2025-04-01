import { Elysia } from 'elysia'
import { db } from './config'
import { todos } from './schema'


const app = new Elysia()

// Healthcheck endpoint
app.get('/health', () => ({
  status: 'ok',
  timestamp: new Date().toISOString()
}))

// Get all todos
app.get('/todos', async () => {
  const allTodos = await db.select().from(todos).orderBy(todos.created_at)
  return allTodos
})

// Create new todo
app.post('/todos', async ({ body }) => {
  const { text } = body as { text: string }
  if (!text) {
    throw new Error('Text is required')
  }
  
  const [newTodo] = await db.insert(todos).values({ text }).returning()
  return newTodo
})

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000
app.listen(port)

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`)