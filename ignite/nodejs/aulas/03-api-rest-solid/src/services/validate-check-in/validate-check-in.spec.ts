/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-use-before-define */
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { LateCheckInValidationError } from '../errors/late-check-in-validation-error'

// Unit test

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase
describe('Validate CheckIn Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    // Date mocking
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Reset Date Mocking
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    // Setting a mocking date for system
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: '01',
      user_id: '01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.recordsInDataBase[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to validate an inexistent check-in', async () => {
    // Setting a mocking date for system
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-chekc-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    // Setting a mocking date for system
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: '01',
      user_id: '01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
