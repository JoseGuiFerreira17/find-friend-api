import { OrganizationsRepository } from '@/repositories/organizations-repository';
import { compare } from 'bcryptjs';
import { Organization } from '@prisma/client';
import { InvalidCredentialsError } from './errors/invalid-credentials';

interface AuthenticateOrganizationServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateOrganizationServiceResponse {
  organization: Organization;
}

export class AuthenticateOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrganizationServiceRequest): Promise<AuthenticateOrganizationServiceResponse> {
    const organization = await this.organizationsRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(
      password,
      organization.password_hash,
    );

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { organization };
  }
}
