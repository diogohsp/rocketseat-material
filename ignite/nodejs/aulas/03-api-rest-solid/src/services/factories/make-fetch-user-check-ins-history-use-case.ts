import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-is-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history/fetch-user-check-ins-history'

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInRepository)

  return useCase
}
