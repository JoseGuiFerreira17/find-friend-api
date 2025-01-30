import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { ZodError } from 'zod';
import { env } from '@/env';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
});

app.register(fastifyCookie);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
