import { Pet } from '@prisma/client';
import { PetsRepository } from '@/repositories/pets-repository';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { OrganizationNotFoundError } from './errors/organization-not-found';

interface PetServiceRequest {
  name: string;
  about: string;
  age: string;
  size: string;
  breed: string;
  energy_level: string;
  environment: string;
  avaliable: boolean;
  organization_id: string;
}

interface PetServiceResponse {
  pet: Pet;
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    breed,
    energy_level,
    environment,
    avaliable,
    organization_id,
  }: PetServiceRequest): Promise<PetServiceResponse> {
    const organization =
      await this.organizationsRepository.findById(organization_id);

    if (!organization) {
      throw new OrganizationNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      breed,
      energy_level,
      environment,
      avaliable,
      organization_id,
    });

    return { pet };
  }
}
