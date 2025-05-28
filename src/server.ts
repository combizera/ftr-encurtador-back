import fastify from 'fastify'
import { eq } from 'drizzle-orm'

import { db } from './db'
import { linksTable } from './db/schema'

const app = fastify()

app.get('/hello', () => {
  return 'Hello, Node!'
})

app.get('/test-db', async () => {
  try {
    const links = await db.select().from(linksTable).limit(5)
    return {
      success: true,
      data: links,
    }
  } catch (error) {
    console.error('Erro ao consultar o banco:', error)
    return {
      success: false,
      error: 'Erro ao conectar ou consultar o banco de dados',
    }
  }
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on http://localhost:3333')
  })
