import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials';
import { makeAuthenticateOrgService } from '@/services/factories/make-authenticate-organization-service';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .parse(request.body);

  try {
    const authenticateService = makeAuthenticateOrgService();
    const { organization } = await authenticateService.execute({
      email,
      password,
    });

    const token = await reply.jwtSign({}, { sign: { sub: organization.id } });
    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: organization.id, expiresIn: '7d' } },
    );

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}
