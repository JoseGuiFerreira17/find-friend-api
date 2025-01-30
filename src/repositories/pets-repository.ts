import { Prisma, Pet } from '@prisma/client';

export interface FindAllParams {
  city: string;
  age?: string;
  size?: string;
  breed?: string;
  energy_level?: string;
  environment?: string;
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  findAll(params: FindAllParams): Promise<Pet[]>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
