import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { beforeAll, afterAll } from 'vitest'
import { execSync } from 'node:child_process'

const prisma = new PrismaClient()

const generateDatabaseURL = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

let schema: string

beforeAll(() => {
  schema = randomUUID()

  console.log('schema criado: ', schema)

  const dataBaseURL = generateDatabaseURL(schema)

  process.env.DATABASE_URL = dataBaseURL

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  console.log('schema apagado: ', schema)

  await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE `)
  await prisma.$disconnect()
})

//TODO: BD is using schema "public" instead of the scheam created by "generateDatabaseURL" fn
