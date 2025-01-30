import { Organization } from '@prisma/client';
import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/users-already-exists';

interface CreateOrganizationServiceRquest {
  name: string;
  author_name: string;
  email: string;
  password: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
}

interface CreateOrganizationServiceResponse {
  organization: Organization;
}

export class CreateOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    author_name,
    email,
    password,
    cep,
    city,
    state,
    street,
    neighborhood,
    latitude,
    longitude,
  }: CreateOrganizationServiceRquest): Promise<CreateOrganizationServiceResponse> {
    const password_hash = await hash(password, 6);

    const organizationExists =
      await this.organizationsRepository.findByEmail(email);

    if (organizationExists) {
      throw new UserAlreadyExistsError();
    }

    const organization = await this.organizationsRepository.create({
      name,
      author_name,
      email,
      password_hash,
      cep,
      city,
      state,
      street,
      neighborhood,
      latitude,
      longitude,
    });

    return { organization };
  }
}
