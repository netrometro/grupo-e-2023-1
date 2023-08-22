import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const listarProdutos = async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const produtos = await prisma.produto.findMany();
      reply.send(produtos);
    } catch (error) {
      console.error(error);
      reply.status(500).send('Erro ao listar produtos.');
    }
  };

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

    const produtoId = parseInt((request as any).params['id'], 10);
    try {
      const { nome, descricao, preco } = request.body as EditarProdutoRequest;

      console.log('ID do produto:', produtoId);

      const produto = await prisma.produto.update({
        where: { id: produtoId },
        data: {
          nome,
          descricao,
          preco,
        },
      });

      console.log('Produto Editado:', produto); // Verifique se o produto editado é exibido corretamente no console

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

  
  