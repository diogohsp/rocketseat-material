/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-use-before-define */
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from '@/services/register/register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

// Unit test

let usersRepository: InMemoryGymsRepository
let sut: CreateGymUseCase
describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(usersRepository)
  })
  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      description: 'Gym description',
      latitude: -23.5505199,
      longitude: -46.6333093,
      phone: '123456789',
      title: 'Gym title',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
