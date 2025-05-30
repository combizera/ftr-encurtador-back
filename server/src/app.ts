import fastify from 'fastify'
import fastifyCors from '@fastify/cors'

import { linksRoutes } from './routes/links'
import { exportRoutes } from './routes/export'

export const app = fastify()

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'], 
  exposedHeaders: ['Content-Disposition']
})

app.get('/hello', () => {
  return 'Hello, Node!'
})

app.register(linksRoutes, {
  prefix: '/links',
})

app.register(exportRoutes, {
  prefix: '/export',
})
