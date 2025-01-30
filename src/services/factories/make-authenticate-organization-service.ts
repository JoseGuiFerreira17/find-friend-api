import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';
import { AuthenticateOrganizationService } from '../authenticate-organization-service';

export function makeAuthenticateOrgService() {
  return new AuthenticateOrganizationService(
    new PrismaOrganizationsRepository(),
  );
}
