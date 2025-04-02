import { Elysia } from 'elysia'

const app = new Elysia()

// Healthcheck endpoint
app.get('/health', () => ({
  status: 'ok',
  timestamp: new Date().toISOString()
}))

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000
app.listen(port)

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`)