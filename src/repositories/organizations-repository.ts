import { Prisma, Organization } from '@prisma/client';

export interface OrganizationsRepository {
  findByEmail(email: string): Promise<Organization | null>;
  findManyNearby(latitude: number, longitude: number): Promise<Organization[]>;
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
}
