import { Organization } from '@prisma/client';
import { OrganizationsRepository } from '@/repositories/organizations-repository';

interface FetchNearbyOrganizationsServiceRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyOrganizationsServiceResponse {
  organizations: Organization[];
}

export class FetchNearbyOrganizationsService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyOrganizationsServiceRequest): Promise<FetchNearbyOrganizationsServiceResponse> {
    const organizations = await this.organizationsRepository.findManyNearby(
      userLatitude,
      userLongitude,
    );

    return { organizations };
  }
}
