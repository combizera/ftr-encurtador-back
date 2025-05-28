import { z } from 'zod'
import { config } from 'dotenv'
import dotenvExpand from 'dotenv-expand'

dotenvExpand.expand(config())

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format())
  process.exit(1)
}

export const env = _env.data
