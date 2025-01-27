import { FastifyInstance } from 'fastify'
import { register } from './controllers/register/register-controller'
import { authenticate } from './controllers/authenticate/authenticate-controller'
import { profile } from './controllers/profile/profile-controller'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated **/
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
