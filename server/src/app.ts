import fastify from 'fastify'

import { linksRoutes } from './routes/links'
import { exportRoutes } from './routes/export'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyCors, {
  origin: true,
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
