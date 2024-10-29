import { PrismaClient } from '@prisma/client'
import { env } from '../env'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

// prisma.user.create({
//   data: {
//     name: 'Diogo Prado',
//     email: 'diogo@gmail.com',
//   },
// })
