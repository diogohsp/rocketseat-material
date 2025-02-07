import { FastifyInstance } from 'fastify'
import { create } from './create/create'
import { history } from './history/history'
import { metrics } from './metrics/metrics'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { validate } from './validate/validate'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
