import { usersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // private usersRepository: any

  // constructor(usersRepository: any) {
  //   this.usersRepository = usersRepository
  // }

  constructor(private usersRepository: usersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const useWithSameEmail = await this.usersRepository.findByEmail(email)

    if (useWithSameEmail) {
      throw new Error('E-mail already exists!')
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
