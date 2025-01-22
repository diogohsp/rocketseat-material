import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public recordsInDataBase: Gym[] = []

  async findById(id: string) {
    const gym = this.recordsInDataBase.find((record) => record.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.recordsInDataBase.push(gym)
    return gym
  }

  async searchMany(query: string, page: number) {
    return this.recordsInDataBase
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }
}
