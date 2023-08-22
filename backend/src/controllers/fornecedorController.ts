import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { hashSenha } from '../utils/hashSenha';

const prisma = new PrismaClient();


interface Fornecedor {
    nome: string;
    email: string;
    senha: string;
  }
  
  export const cadastrarFornecedor = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { nome, email, senha } = request.body as Fornecedor;
  
      const senhaCriptografada = await hashSenha(senha);
  
      const fornecedorData = await prisma.fornecedor.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
        },
      });
  
      reply.send(fornecedorData);
    } catch (error) {
      console.error(error);
      reply.status(500).send('Erro ao cadastrar fornecedor.');
    }
  };