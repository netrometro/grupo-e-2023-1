import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Faxineiro } from '../../types';

const prisma = new PrismaClient();

export const criarFaxineiro = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, nome } = req.body as Faxineiro;

  try {
    const faxineiro = await prisma.faxineiro.create({
      data: {
        email,
        nome,
        senha:'teste'
      },
    });
    res.send(faxineiro);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao criar faxineiro' });
  }
};
