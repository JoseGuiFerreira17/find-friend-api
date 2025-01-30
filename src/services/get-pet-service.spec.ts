import { describe, beforeEach, it, expect } from 'vitest';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { GetPetService } from './get-pet-service';
import { makePet } from '@tests/factories/make-pet-factory';
import { PetNotFoundError } from './errors/pet-not-found';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { makeOrg } from '@tests/factories/make-organization-factory';

describe('Get Pet Use Case', () => {
  let orgsRepository: InMemoryOrganizationRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: GetPetService;

  beforeEach(() => {
    orgsRepository = new InMemoryOrganizationRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetService(petsRepository);
  });

  it('should be able to get a new pet', async () => {
    const org = await orgsRepository.create(makeOrg());
    const pet = await petsRepository.create(
      makePet({ organization_id: org.id }),
    );
    const result = await sut.execute({ id: pet.id });

    expect(result.pet).toEqual(pet);
  });

  it('should not be able to get a non-existing pet', async () => {
    await expect(sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    );
  });
});
