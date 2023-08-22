import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CadastrarProdutoRequest {
    nome: string,
    descricao: string,
    preco: number,
    lojaId: number
}

export const cadastrarProduto = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { nome, descricao, preco, lojaId } = request.body as CadastrarProdutoRequest;

    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco,
        loja: { connect: { id: lojaId } },
      },
    });

    reply.send(produto);
  } catch (error) {
    console.error(error);
    reply.status(500).send('Erro ao cadastrar produto.');
  }
};

