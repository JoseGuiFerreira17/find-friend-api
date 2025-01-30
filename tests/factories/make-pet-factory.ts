import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';

type Overwrite = {
  organization_id?: string;
  age?: string;
  size?: string;
  breed?: string;
  energy_level?: string;
  environment?: string;
};

export function makePet(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    organization_id: overwrite?.organization_id ?? randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int().toString(),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large']),
    breed:
      overwrite?.breed ??
      faker.helpers.arrayElement(['pitbull', 'buldogue', 'pooldle']),
    energy_level:
      overwrite?.energy_level ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment: faker.helpers.arrayElement(['indoor', 'outdoor']),
    avaliable: true,
  };
}
