import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { create } from './create';
import { search } from './search';
import { getPet } from './get-pet';

export async function petsRoutes(app: FastifyInstance) {
  app.post('/organizations/pets', { onRequest: [verifyJwt] }, create);
  app.get('/organizations/pets', search);
  app.get('/organizations/pets/:id', getPet);
}
