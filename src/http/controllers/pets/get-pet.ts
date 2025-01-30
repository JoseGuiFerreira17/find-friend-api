import { PetNotFoundError } from '@/services/errors/pet-not-found';
import { makeGetPetService } from '@/services/factories/make-get-pet-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const { id } = z
    .object({
      id: z.string(),
    })
    .parse(request.params);

  const getPetUseCase = makeGetPetService();

  try {
    const { pet } = await getPetUseCase.execute({ id });

    return reply.status(200).send(pet);
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    console.error(error);

    return reply.status(500).send({ message: 'Internal server error' });
  }
}
