import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-is-repository'
import { CheckInUseCase } from '../checkin/check-in'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInRepository, gymsRepository)

  return useCase
}
