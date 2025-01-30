import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { FetchNearbyOrganizationsService } from './fetch-nearby-organizations-service';

let organizationsRepository: InMemoryOrganizationRepository;
let sut: FetchNearbyOrganizationsService;

describe('fetch nearby organizations service', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository();
    sut = new FetchNearbyOrganizationsService(organizationsRepository);
  });

  it('should be able fetch nearby organizations', async () => {
    await organizationsRepository.create({
      name: 'PetShop perto',
      email: 'jhondoe@example.com',
      author_name: 'Jhon Doe',
      cep: '12345678',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Vila Mariana',
      street: 'Rua Domingos de Morais',
      password_hash: await hash('123456', 6),
      latitude: -10.4303851,
      longitude: -45.1919726,
    });

    await organizationsRepository.create({
      name: 'PetShop longe',
      email: 'jhondoe@example.com',
      author_name: 'Jhon Doe',
      cep: '12345678',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Vila Mariana',
      street: 'Rua Domingos de Morais',
      password_hash: await hash('123456', 6),
      latitude: -10.1719941,
      longitude: -45.477869,
    });

    const { organizations } = await sut.execute({
      userLatitude: -10.4385677,
      userLongitude: -45.1815891,
    });

    expect(organizations).toHaveLength(1);
    expect(organizations).toEqual([
      expect.objectContaining({
        name: 'PetShop perto',
      }),
    ]);
  });
});
