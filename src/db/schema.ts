import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
  index,
} from 'drizzle-orm/pg-core'

export const linksTable = pgTable(
  'links',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    originalUrl: text('original_url').notNull(),
    shortCode: varchar('short_code', { length: 50 }).notNull().unique(),
    accessCount: integer('access_count').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    shortCodeIdx: index('short_code_idx').on(table.shortCode),
    createdAtIdx: index('created_at_idx').on(table.createdAt),
  }),
)

export const csvExportsTable = pgTable(
  'csv_exports',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    fileName: varchar('file_name', { length: 255 }).notNull().unique(),
    cdnUrl: text('cdn_url').notNull(),
    status: varchar('status', { length: 20 }).notNull().default('processing'), // 'processing', 'completed', 'failed'
    recordCount: integer('record_count').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    completedAt: timestamp('completed_at'),
  },
  (table) => ({
    statusIdx: index('status_idx').on(table.status),
    createdAtIdx: index('csv_created_at_idx').on(table.createdAt),
  }),
)

export type Link = typeof linksTable.$inferSelect
export type NewLink = typeof linksTable.$inferInsert
export type CsvExport = typeof csvExportsTable.$inferSelect
export type NewCsvExport = typeof csvExportsTable.$inferInsert
