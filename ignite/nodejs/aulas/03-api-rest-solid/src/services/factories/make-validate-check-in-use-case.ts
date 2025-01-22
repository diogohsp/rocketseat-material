import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-is-repository'
import { ValidateCheckInUseCase } from '../validate-check-in/validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInRepository)

  return useCase
}
