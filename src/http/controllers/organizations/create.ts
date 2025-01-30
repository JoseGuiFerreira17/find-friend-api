import { makeCreateOrganizationService } from '@/services/factories/make-create-organization-service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const {
    name,
    author_name,
    email,
    password,
    cep,
    city,
    state,
    neighborhood,
    street,
    latitude,
    longitude,
  } = z
    .object({
      name: z.string(),
      author_name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      cep: z.string().length(8),
      city: z.string(),
      state: z.string().length(2),
      neighborhood: z.string(),
      street: z.string(),
      latitude: z.number().refine((v) => {
        return v >= -90 && v <= 90;
      }),
      longitude: z.number().refine((v) => {
        return v >= -180 && v <= 180;
      }),
    })
    .parse(request.body);

  const createOrganizationService = makeCreateOrganizationService();
  await createOrganizationService.execute({
    name,
    author_name,
    email,
    password,
    cep,
    city,
    state,
    neighborhood,
    street,
    latitude,
    longitude,
  });

  return reply.status(201).send();
}
