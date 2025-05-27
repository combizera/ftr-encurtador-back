import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { drizzle } from 'drizzle-orm/node-postgres'

dotenvExpand.expand(dotenv.config())

const db = drizzle(process.env.DATABASE_URL!)
