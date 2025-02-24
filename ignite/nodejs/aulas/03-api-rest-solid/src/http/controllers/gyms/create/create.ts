import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/services/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { description, latitude, longitude, phone, title } =
    createGymBodySchema.parse(request.body) // unlike safeparse, parse will give an automatic launch if validation fails

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  })

  return reply.status(201).send()
}
