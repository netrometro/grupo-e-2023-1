import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { hashSenha } from '../../utils/hashSenha';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();


interface Fornecedor {
    nome: string;
    email: string;
    senha: string;
  }

  export const listarFornecedores = async (_request: FastifyRequest, reply: FastifyReply) => {
    try {
      const fornecedores = await prisma.fornecedor.findMany();
      reply.send(fornecedores);
    } catch (error) {
      console.error(error);
      reply.status(500).send('Erro ao listar fornecedores.');
    }
  };
  
  export const cadastrarFornecedor = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { nome, email, senha } = request.body as Fornecedor;
  
      const senhaCriptografada = await hashSenha(senha);
  
      const fornecedorData = await prisma.fornecedor.create({
        data: {
          email,
          nome,
          senha: senhaCriptografada,
        },
      });
  
      reply.send(fornecedorData);
    } catch (error) {
      console.error(error);
      reply.status(500).send('Erro ao cadastrar fornecedor.');
    }
  };

  interface LoginRequestBody {
    email: string;
    senha: string;
  }

  export const fazerLogin = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { email, senha } = request.body as LoginRequestBody;
  
      const fornecedor = await prisma.fornecedor.findUnique({
        where: { email },
      });
  
      if (!fornecedor) {
        return reply.status(401).send('Credenciais inválidas');
      }

      const verificarSenha = async (senhaDigitada: string, senhaCriptografada: string): Promise<boolean> => {
        const senhaCorreta = await bcrypt.compare(senhaDigitada, senhaCriptografada);
        return senhaCorreta;
      };
  
      const senhaCorreta = await verificarSenha(senha, fornecedor.senha);
      if (!senhaCorreta) {
        return reply.status(401).send('Credenciais inválidas');
      }
  
      const token = jwt.sign({ fornecedorId: fornecedor.id }, 'chave-secreta');
  
      reply.send({ token });
    } catch (error) {
      console.error(error);
      reply.status(500).send('Erro ao fazer login.');
    }

    
};