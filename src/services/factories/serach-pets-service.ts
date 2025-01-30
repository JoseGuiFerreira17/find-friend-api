import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository';
import { SearchPetsService } from '../serach-pets-service';

export function makeSearchPetsService() {
  return new SearchPetsService(new PrismaPetsRepository());
}
