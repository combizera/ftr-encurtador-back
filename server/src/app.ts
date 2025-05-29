import fastify from 'fastify'

import { linksRoutes } from './routes/links'
import { exportRoutes } from './routes/export'

export const app = fastify()

app.get('/hello', () => {
  return 'Hello, Node!'
})

app.register(linksRoutes, {
  prefix: '/links',
})

app.register(exportRoutes, {
  prefix: '/export',
})
