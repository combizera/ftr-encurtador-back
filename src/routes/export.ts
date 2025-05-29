import { unparse } from 'papaparse'
import { FastifyInstance } from 'fastify'

import { db } from '../db'
import { linksTable } from '../db/schema'

export async function exportRoutes(app: FastifyInstance) {
  app.get('/', async (_, reply) => {
    const links = await db.select().from(linksTable)

    const csv = unparse(links)

    reply
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', 'attachment; filename=links.csv')
      .send(csv)
  })
}
