import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { GetPetService } from '../get-pet-service';

export function makeGetPetService() {
  return new GetPetService(new PrismaPetsRepository());
}
