import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';
import { FetchNearbyOrganizationsService } from '../fetch-nearby-organizations-service';

export function makeFetchNearbyOrganizationsService() {
  return new FetchNearbyOrganizationsService(
    new PrismaOrganizationsRepository(),
  );
}
