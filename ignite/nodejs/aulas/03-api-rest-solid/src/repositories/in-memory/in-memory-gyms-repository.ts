import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public recordsInDataBase: Gym[] = []

  async findById(id: string) {
    const gym = this.recordsInDataBase.find((record) => record.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
