/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-use-before-define */
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

// Unit test

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase
describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'javascript gym',
      latitude: -23.5505199,
      longitude: -46.6333093,
      phone: '123456789',
    })

    await gymsRepository.create({
      title: 'typescript gym',
      latitude: -23.5505199,
      longitude: -46.6333093,
      phone: '123456789',
    })

    const { gyms } = await sut.execute({
      query: 'javascript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'javascript gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `javascript gym ${i}`,
        latitude: -23.5505199,
        longitude: -46.6333093,
        phone: '123456789',
      })
    }

    const { gyms } = await sut.execute({
      query: 'javascript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'javascript gym 21' }),
      expect.objectContaining({ title: 'javascript gym 22' }),
    ])
  })
})
