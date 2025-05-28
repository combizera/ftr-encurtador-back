import fastify from 'fastify'

import { linksRoutes } from './routes/links'

export const app = fastify()

app.get('/hello', () => {
  return 'Hello, Node!'
})

app.register(linksRoutes, {
  prefix: '/links',
})
