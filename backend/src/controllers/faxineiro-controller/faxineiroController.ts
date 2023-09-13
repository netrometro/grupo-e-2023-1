import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Faxineiro } from '../../types';
import bcrypt from 'bcryptjs'; 

const prisma = new PrismaClient();

export const criarFaxineiro = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, nome, senha } = req.body as Faxineiro;

  try {
    const faxineiro = await prisma.faxineiro.create({
      data: {
        email,
        nome,
        senha
      },
    });
    res.send(faxineiro);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao criar faxineiro' });
  }
};

export const loginFaxineiro = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, senha } = req.body as Faxineiro;

  try {
    const faxineiro = await prisma.faxineiro.findUnique({ where: { email } });

    if (!faxineiro) {
      console.log('Faxineiro não encontrado para o email:', email);
      return res.status(401).send({ error: 'Credenciais inválidas' });
    }

    if (senha !== faxineiro.senha) {
      console.log('Senha incorreta para o email:', email);
      return res.status(401).send({ error: 'Credenciais inválidas' });
    }

    console.log('Login bem-sucedido para o email:', email);
    res.send({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao efetuar login:', error);
    res.status(500).send({ error: 'Erro ao efetuar login' });
  }
};
