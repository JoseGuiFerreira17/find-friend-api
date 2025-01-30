import { expect, describe, it, beforeEach } from 'vitest';
import { compare } from 'bcryptjs';
import { CreateOrganizationService } from './create-organization-service';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { UserAlreadyExistsError } from './errors/users-already-exists';

let oganizationsRepository: InMemoryOrganizationRepository;
let sut: CreateOrganizationService;

describe('create organization service', () => {
  beforeEach(() => {
    oganizationsRepository = new InMemoryOrganizationRepository();
    sut = new CreateOrganizationService(oganizationsRepository);
  });

  it('should create a new organization', async () => {
    const { organization } = await sut.execute({
      name: 'PetShop',
      email: 'jhondoe@example.com',
      author_name: 'Jhon Doe',
      cep: '12345678',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Vila Mariana',
      street: 'Rua Domingos de Morais',
      password: '123456',
      latitude: 0,
      longitude: 0,
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it('should not create a new organization with the same email', async () => {
    const email = 'jhondoe@example.com';

    await sut.execute({
      name: 'PetShop',
      email,
      author_name: 'Jhon Doe',
      cep: '12345678',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Vila Mariana',
      street: 'Rua Domingos de Morais',
      password: '123456',
      latitude: 0,
      longitude: 0,
    });

    await expect(() =>
      sut.execute({
        name: 'PetShop 2',
        email,
        author_name: 'Jhon Doe',
        cep: '12345678',
        city: 'São Paulo',
        state: 'SP',
        neighborhood: 'Vila Mariana',
        street: 'Rua Domingos de Morais',
        password: '123456',
        latitude: 0,
        longitude: 0,
      }),
    ).rejects.toThrowError(UserAlreadyExistsError);
  });

  it('should create a new organization with a hashed password', async () => {
    const { organization } = await sut.execute({
      name: 'PetShop',
      email: 'jhondoe@example.com',
      author_name: 'Jhon Doe',
      cep: '12345678',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Vila Mariana',
      street: 'Rua Domingos de Morais',
      password: '123456',
      latitude: 0,
      longitude: 0,
    });

    const isPasswordHashed = await compare(
      '123456',
      organization.password_hash,
    );

    expect(isPasswordHashed).toBe(true);
  });
});
