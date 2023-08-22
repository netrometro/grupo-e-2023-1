// postagemController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Postagem } from '../../types';

const prisma = new PrismaClient();

export const criarPostagem = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as Postagem;
  const { titulo, descricao, preco, horarios, faxineiroId } = body;

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

export const editarPostagem = async (req: FastifyRequest, res: FastifyReply) => {
  const postagemId = parseInt((req as any).params['postagemId'], 10);
  const body = req.body as Postagem;
  const { titulo, descricao, preco, horarios } = body;

  console.log('ID da Postagem:', postagemId);
  console.log('Dados do Corpo:', body);

  try {
    const postagem = await prisma.postagem.update({
      where: { id: postagemId }, 
      data: {
        titulo,
        descricao,
        preco,
        horarios,
      },
    });

    console.log('Postagem Atualizada:', postagem);
    
    res.send(postagem);
  } catch (error) {
    console.error('Erro ao atualizar postagem:', error);
    res.status(500).send({ error: 'Erro ao atualizar postagem' });
  }
};

export const deletarPostagem = async (req: FastifyRequest, res: FastifyReply) => {
  const postagemId = parseInt((req as any).params['postagemId'], 10);

  try {
    const postagem = await prisma.postagem.delete({
      where: { id: postagemId },
    });

    console.log('Postagem Deletada:', postagem);

    res.send({ message: 'Postagem deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar postagem:', error);
    res.status(500).send({ error: 'Erro ao deletar postagem' });
  }
};
