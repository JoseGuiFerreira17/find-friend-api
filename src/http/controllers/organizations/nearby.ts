import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchNearbyOrganizationsService } from '@/services/factories/make-fetch-nearby-organizations-service';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const { latitude, longitude } = z
    .object({
      latitude: z.number().refine((v) => {
        return v >= -90 && v <= 90;
      }),
      longitude: z.number().refine((v) => {
        return v >= -180 && v <= 180;
      }),
    })
    .parse(request.query);

  const fetchNearbyOrganizationsService = makeFetchNearbyOrganizationsService();
  const { organizations } = await fetchNearbyOrganizationsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send(organizations);
}
