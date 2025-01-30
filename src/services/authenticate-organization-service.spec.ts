import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organizations-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials';
import { AuthenticateOrganizationService } from './authenticate-organization-service';

let oganizationsRepository: InMemoryOrganizationRepository;
let sut: AuthenticateOrganizationService;

describe('authenticate organization service', () => {
  beforeEach(() => {
    oganizationsRepository = new InMemoryOrganizationRepository();
    sut = new AuthenticateOrganizationService(oganizationsRepository);
  });

  it('should authenticate a organization', async () => {
    await oganizationsRepository.create({
      name: 'PetShop',
      email: 'jhondoe@example.com',
      author_name: 'Jhon Doe',
      cep: '12345678',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Vila Mariana',
      street: 'Rua Domingos de Morais',
      password_hash: await hash('123456', 6),
      latitude: 0,
      longitude: 0,
    });

    const { organization } = await sut.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(organization.id).toEqual(expect.any(String));
  });

  it('should not authenticate a organization with invalid email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not authenticate a organization with invalid password', async () => {
    await oganizationsRepository.create({
      name: 'PetShop',
      email: 'jhondoe@example.com',
      author_name: 'Jhon Doe',
      cep: '12345678',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Vila Mariana',
      street: 'Rua Domingos de Morais',
      password_hash: await hash('123456', 6),
      latitude: 0,
      longitude: 0,
    });

    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
