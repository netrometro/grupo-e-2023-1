import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CriarLojaRequest extends FastifyRequest {
  Body: {
    nome: string;
    endereco: string;
    contato: string;
    fornecedorId: number; // Adicione isso ao seu tipo
  };
}

export const criarLoja = async (request: CriarLojaRequest, reply: FastifyReply) => {
  try {
    const { nome, endereco, contato, fornecedorId } = request.body;
    const loja = await prisma.loja.create({
      data: {
        nome,
        endereco,
        contato,
        fornecedor: {
          connect: { id: fornecedorId } // Conecte a loja ao fornecedor
        },
      },
    });
    reply.send(loja);
  } catch (error) {
    console.error(error);
    reply.status(500).send('Erro ao criar loja.');
  }
};