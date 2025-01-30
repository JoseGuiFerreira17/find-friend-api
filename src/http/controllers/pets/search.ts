import { makeSearchPetsService } from '@/services/factories/serach-pets-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { city, age, size, breed, energy_level, environment } = z
    .object({
      city: z.string().min(1),
      age: z.string().optional(),
      size: z.string().optional(),
      breed: z.string().optional(),
      energy_level: z.string().optional(),
      environment: z.string().optional(),
    })
    .parse(request.query);

  const searchPetsService = makeSearchPetsService();

  try {
    const { pets } = await searchPetsService.execute({
      city,
      age,
      size,
      breed,
      energy_level,
      environment,
    });

    return reply.status(200).send({ pets });
  } catch (err) {
    console.error(err);

    return reply.status(500).send({ message: 'Internal server error' });
  }
}
