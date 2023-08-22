import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Faxineiro } from '../../types'; // Importe o tipo Faxineiro

const prisma = new PrismaClient();

export const criarFaxineiro = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, nome, telefone } = req.body as Faxineiro; // Use o tipo Faxineiro

  try {
    const faxineiro = await prisma.faxineiro.create({
      data: {
        email,
        nome,
        telefone,
        senha:'teste'
      },
    });
    res.send(faxineiro);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao criar faxineiro' });
  }
};
