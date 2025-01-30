import { FastifyInstance } from 'fastify';
import { authenticate } from './authenticate';
import { create } from './create';
import { nearby } from './nearby';

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations/authenticate', authenticate);
  app.post('/organizations', create);
  app.get('/organizations/nearby', nearby);
}
