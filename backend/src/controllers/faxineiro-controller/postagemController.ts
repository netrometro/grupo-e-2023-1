// postagemController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Postagem } from '../../types';

const prisma = new PrismaClient();

export const criarPostagem = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as Postagem;
  const { titulo, descricao, preco, horarios, faxineiroId } = body; // Certifique-se de ter o faxineiroId no corpo da requisição

  try {
    const postagem = await prisma.postagem.create({
      data: {
        titulo,
        descricao,
        preco,
        horarios,
        faxineiro: {
          connect: {
            id: faxineiroId,
          },
        },
      },
    });
    res.send(postagem);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao criar postagem' });
  }
};
