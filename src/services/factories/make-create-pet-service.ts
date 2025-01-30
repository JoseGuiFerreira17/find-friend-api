import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { CreatePetService } from '../create-pet-service';
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository';

export function makeCreatePetService() {
  return new CreatePetService(
    new PrismaPetsRepository(),
    new PrismaOrganizationsRepository(),
  );
}
