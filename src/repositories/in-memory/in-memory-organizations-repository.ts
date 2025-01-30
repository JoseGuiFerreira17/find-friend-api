import {
  FindManyNearbyParams,
  OrganizationsRepository,
} from '@/repositories/organizations-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coodinates';
import { Organization, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = [];

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id);

    if (!organization) {
      return null;
    }

    return organization;
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email);

    if (!organization) {
      return null;
    }

    return organization;
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
      );
      return distance < 10;
    });
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      author_name: data.author_name,
      email: data.email,
      password_hash: data.password_hash,
      cep: data.cep,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood,
      street: data.street,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push(organization);

    return organization;
  }
}
