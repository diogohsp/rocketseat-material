import { PrismaClient } from '@prisma/client'
import { beforeAll, afterAll, afterEach } from 'vitest'
import { randomUUID } from 'node:crypto'

const testSchema = `test_${randomUUID().replace(/-/g, '')}`

const testPrisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?schema=${testSchema}`,
    },
  },
})

console.log(
  '[TEST ENV] Database URL:',
  `${process.env.DATABASE_URL}?schema=${testSchema}`,
)

beforeAll(async () => {
  await testPrisma.$connect()

  // Verifica se o schema já existe
  const schemaExists = await testPrisma.$queryRawUnsafe<{ exists: boolean }[]>(
    `SELECT EXISTS (
      SELECT 1
      FROM information_schema.schemata
      WHERE schema_name = $1
    )`,
    testSchema,
  )

  if (schemaExists[0].exists) {
    console.log(`Schema "${testSchema}" já existe.`)
  } else {
    // Cria o schema dinâmico
    await testPrisma.$executeRawUnsafe(
      `CREATE SCHEMA IF NOT EXISTS "${testSchema}"`,
    )
    console.log(`Schema "${testSchema}" criado com sucesso.`)
  }

  // Define o search_path para o schema de teste
  await testPrisma.$executeRawUnsafe(`SET search_path TO "${testSchema}"`)
})

afterEach(async () => {
  await testPrisma.$executeRawUnsafe(
    `TRUNCATE TABLE "${testSchema}"."users", "${testSchema}"."gyms", "${testSchema}"."check_ins" CASCADE`,
  )
  console.log(`Tabelas do schema "${testSchema}" truncadas com sucesso.`)
})

afterAll(async () => {
  await testPrisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${testSchema}" CASCADE`,
  )
  await testPrisma.$disconnect()
  console.log(`Schema "${testSchema}" excluído com sucesso.`)
})
