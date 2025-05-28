import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { FastifyInstance } from 'fastify'

import { db } from './../db'
import { linksTable } from './../db/schema'

const createLinkBodySchema = z.object({
  originalUrl: z.string().url(),
  shortCode: z.string().min(3).max(50).regex(/^[a-zA-Z0-9-_]+$/),
})
type CreateLinkBody = z.infer<typeof createLinkBodySchema>

export async function linksRoutes(app: FastifyInstance) {
  // CREATE
  app.post('/', async (request, reply) => {
    const result = createLinkBodySchema.safeParse(request.body)

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        error: 'Invalid request body',
        details: result.error.format(),
      })
    }

    const { originalUrl, shortCode } = result.data

    const existing = await db
      .select()
      .from(linksTable)
      .where(eq(linksTable.shortCode, shortCode))
      .limit(1)

    if (existing.length > 0) {
      return reply.status(409).send({
        success: false,
        error: 'Short code already exists',
      })
    }

    const [newLink] = await db
      .insert(linksTable)
      .values({ originalUrl, shortCode })
      .returning()

    return reply.status(201).send({
      success: true,
      data: newLink,
    })
  })

  // READ
  app.get('/', async (_, reply) => {
    const links = await db.select().from(linksTable)

    return reply.send({
      success: true,
      data: links,
    })
  })
}
