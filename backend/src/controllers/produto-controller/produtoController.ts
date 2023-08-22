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

interface EditarProdutoRequest {
    id: number,
    nome: string,
    descricao: string,
    preco: number
}

export const editarProduto = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id, nome, descricao, preco } = request.body as EditarProdutoRequest;
  
      const produto = await prisma.produto.update({
        where: { id },
        data: {
          nome,
          descricao,
          preco,
        },
      });
  
      reply.send(produto);
    } catch (error) {
      console.error(error);
      reply.status(500).send('Erro ao editar produto.');
    }
  };

  export const deletarProduto = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const id = Number(request.params.id);
  
      await prisma.produto.delete({
        where: { id },
      });
  
      reply.send('Produto deletado com sucesso.');
    } catch (error) {
      console.error(error);
      reply.status(500).send('Erro ao deletar produto.');
    }
  };
  
  