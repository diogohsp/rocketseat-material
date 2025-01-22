/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-use-before-define */
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

// Unit test

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase
describe('CheckIn Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    // Date mocking
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Reset Date Mocking
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    // Setting a mocking date for system
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Gold',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: 49.6401091,
    })

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: 49.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // TDD - Test Driven Development
  // TDD states - RED, GREEN, REFACTOR
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymsRepository.recordsInDataBase.push({
      id: 'gym-01',
      title: 'Gold',
      description: '',
      phone: '',
      latitude: new Decimal(-27.2092052),
      longitude: new Decimal(49.6401091),
    })

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: 49.6401091,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: 49.6401091,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in the different day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymsRepository.recordsInDataBase.push({
      id: 'gym-01',
      title: 'Gold',
      description: '',
      phone: '',
      latitude: new Decimal(-27.2092052),
      longitude: new Decimal(49.6401091),
    })

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: 49.6401091,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: 49.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant', async () => {
    // Setting a mocking date for system
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    gymsRepository.recordsInDataBase.push({
      id: 'gym-02',
      title: 'Gold',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
