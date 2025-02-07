import { FastifyInstance } from 'fastify'
import { register } from './register/register-controller'
import { authenticate } from './authenticate/authenticate-controller'
import { profile } from './profile/profile-controller'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated **/
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
