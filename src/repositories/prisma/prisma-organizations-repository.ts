import { Organization, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  FindManyNearbyParams,
  OrganizationsRepository,
} from '../organizations-repository';

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    return organization;
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: { email },
    });

    return organization;
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const organizations = await prisma.$queryRaw<Organization[]>`
    SELECT * from organizations 
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return organizations;
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({ data });

    return organization;
  }
}
