import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository';
import { CreatePetService } from './create-pet-service';
import { OrganizationNotFoundError } from './errors/organization-not-found';
import { makeOrg } from '@tests/factories/make-organization-factory';
import { makePet } from '@tests/factories/make-pet-factory';

describe('Create Pet Use Case', () => {
  let orgsRepository: InMemoryOrganizationRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: CreatePetService;

  beforeEach(() => {
    orgsRepository = new InMemoryOrganizationRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new CreatePetService(petsRepository, orgsRepository);
  });

  it('should be able to create a new pet', async () => {
    const org = await orgsRepository.create(makeOrg());
    const { pet } = await sut.execute(makePet({ organization_id: org.id }));

    expect(petsRepository.items).toHaveLength(1);
    expect(pet.id).toEqual(expect.any(String));
  });

  it('should not be able to create a new pet with a non-existing org', async () => {
    const pet = makePet();

    await petsRepository.create(pet);

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(
      OrganizationNotFoundError,
    );
  });
});
