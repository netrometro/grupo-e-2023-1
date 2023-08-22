import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Loja {
  nome: string;
  endereco: string;
  contato: string;
  fornecedorId: number;
}

export const listarLojas = async (_request: FastifyRequest, reply: FastifyReply) => {
  try {
    const lojas = await prisma.loja.findMany();
    reply.send(lojas);
  } catch (error) {
    console.error(error);
    reply.status(500).send('Erro ao listar lojas.');
  }
};

export const criarLoja = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { nome, endereco, contato, fornecedorId } = request.body as Loja;
    const loja = await prisma.loja.create({
      data: {
        nome,
        endereco,
        contato,
        fornecedor: {
          connect: { id: fornecedorId }
        },
      },
    });
    reply.send(loja);
  } catch (error) {
    console.error(error);
    reply.status(500).send('Erro ao criar loja.');
  }
};
