import { z } from 'zod'
import fastify from 'fastify'
import { eq } from 'drizzle-orm'

import { db } from './db'
import { linksTable } from './db/schema'
import { linksRoutes } from './routes/links'

const app = fastify()

app.get('/hello', () => {
  return 'Hello, Node!'
})

app.register(linksRoutes, {
  prefix: '/links',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on http://localhost:3333')
  })
