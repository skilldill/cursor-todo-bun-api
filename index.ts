import { Elysia } from 'elysia'
import { connectDB } from './config/database'
import { Todo } from './models/todo'

// Connect to MongoDB
connectDB()

const app = new Elysia()

// Healthcheck endpoint
app.get('/health', () => ({
  status: 'ok',
  timestamp: new Date().toISOString()
}))

// Get all todos
app.get('/todos', async () => {
  const todos = await Todo.find().sort({ createdAt: -1 })
  return todos
})

// Create new todo
app.post('/todos', async ({ body }) => {
  const { text } = body as { text: string }
  if (!text) {
    throw new Error('Text is required')
  }

  const todo = new Todo({ text })
  await todo.save()
  return todo
})

// Update todo
app.put('/todos/:id', async ({ params, body }) => {
  const { id } = params
  const updates = body as { text?: string; completed?: boolean }
  
  const todo = await Todo.findByIdAndUpdate(
    id,
    updates,
    { new: true }
  )
  
  if (!todo) {
    throw new Error('Todo not found')
  }
  
  return todo
})

// Delete todo
app.delete('/todos/:id', async ({ params }) => {
  const { id } = params
  const todo = await Todo.findByIdAndDelete(id)
  
  if (!todo) {
    throw new Error('Todo not found')
  }
  
  return { message: 'Todo deleted successfully' }
})

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
app.listen(port)

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`)