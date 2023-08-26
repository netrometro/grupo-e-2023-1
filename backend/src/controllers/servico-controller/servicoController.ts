import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { NovoTipoDeServico } from '../../types';

const prisma = new PrismaClient();

export const criarServico = async (req: FastifyRequest, res: FastifyReply) => {
    const { nomeServico } = req.body as NovoTipoDeServico;
  
    try {
      const servicoExistente = await prisma.tipoDeServico.findFirst({
        where: {
          nomeServico: {
            equals: nomeServico.toLowerCase()
          }
        }
      });
  
      if (servicoExistente) {
        return res.status(409).send({ error: 'Já existe um serviço com esse nome.' });
      }
  
      const novoTipoDeServico = await prisma.tipoDeServico.create({
        data: {
          nomeServico: nomeServico
        }
      });
  
      res.send(novoTipoDeServico);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro ao criar tipo de serviço' });
    }
  };

  export const obterTiposDeServico = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const tiposDeServico = await prisma.tipoDeServico.findMany();
      res.send(tiposDeServico);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Erro ao obter tipos de serviço' });
    }};