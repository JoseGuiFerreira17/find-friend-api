import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';
import { CreateOrganizationService } from '../create-organization-service';

export function makeCreateOrganizationService() {
  return new CreateOrganizationService(new PrismaOrganizationsRepository());
}
