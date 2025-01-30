import { OrganizationNotFoundError } from '@/services/errors/organization-not-found';
import { makeCreatePetService } from '@/services/factories/make-create-pet-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const body = z
    .object({
      name: z.string(),
      about: z.string(),
      age: z.string(),
      size: z.string(),
      breed: z.string(),
      energy_level: z.string(),
      environment: z.string(),
      avaliable: z.boolean(),
    })
    .parse(request.body);

  const createPetService = makeCreatePetService();

  const organization_id = request.user.sub;

  try {
    const { pet } = await createPetService.execute({
      ...body,
      organization_id,
    });

    return reply.status(201).send(pet);
  } catch (error) {
    if (error instanceof OrganizationNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    console.error(error);

    return reply.status(500).send({ message: 'Internal server error' });
  }
}
