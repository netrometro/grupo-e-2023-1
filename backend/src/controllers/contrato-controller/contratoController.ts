import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Contrato } from '../../types';

const prisma = new PrismaClient();

export const criarContrato = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as Contrato;
  const { contratanteId, responsavelId, postagemId } = body;

  try {
    const contratoExistente = await prisma.contrato.findFirst({
      where: {
        postagemId,
      },
    });

    if (contratoExistente) {
      res.status(400).send({ error: 'Já existe um responsável contratado para esta postagem' });
      return;
    }

    const contratante = await prisma.faxineiro.findUnique({
      where: { id: contratanteId },
    });

    if (!contratante) {
      res.status(400).send({ error: 'Contratante não encontrado' });
      return;
    }

    const responsavel = await prisma.faxineiro.findUnique({
      where: { id: responsavelId },
    });

    if (!responsavel) {
      res.status(400).send({ error: 'Responsável não encontrado' });
      return;
    }

    const postagem = await prisma.postagem.findUnique({
      where: { id: postagemId },
      include: {
        faxineiro: true,
      },
    });

    if (!postagem) {
      res.status(400).send({ error: 'Postagem não encontrada' });
      return;
    }

    if (postagem.faxineiroId !== contratanteId) {
      res.status(400).send({ error: 'Apenas o proprietário pode criar contratos para esta postagem' });
      return;
    }

    if (postagem.faxineiroId === responsavelId) {
      res.status(400).send({ error: 'O proprietário não pode ser o responsável' });
      return;
    }

    const contrato = await prisma.contrato.create({
      data: {
        contratante: {
          connect: {
            id: contratanteId,
          },
        },
        responsavel: {
          connect: {
            id: responsavelId,
          },
        },
        postagem: {
          connect: {
            id: postagemId,
          },
        },
      },
    });

    await prisma.postagem.update({
      where: { id: postagemId },
      data: {
        faxineiro: {
          connect: {
            id: contratanteId,
          },
        },
      },
    });

    res.send(contrato);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao criar contrato' });
  }
};
