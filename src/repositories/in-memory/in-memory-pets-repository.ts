import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { FindAllParams, PetsRepository } from '@/repositories/pets-repository';
import { Pet, Prisma } from '@prisma/client';
import crypto from 'node:crypto';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrganizationRepository) {}

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const organizationsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    );

    const pets = this.items
      .filter((item) =>
        organizationsByCity.some((org) => org.id === item.organization_id),
      )
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      );

    return pets;
  }

  async findById(id: string): Promise<Pet | null> {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
      updated_at: data.updated_at ? new Date(data.updated_at) : new Date(),
    };

    this.items.push(pet);

    return pet;
  }
}
