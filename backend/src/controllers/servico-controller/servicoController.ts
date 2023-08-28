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
  

    export const obterPostagensPorTipoServico = async (req: FastifyRequest, res: FastifyReply) => {
      const tipoServicoId = parseInt((req as any).params['tipoServicoId'], 10);
    
      console.log("Tipo de serviço ID:", tipoServicoId);
    
      try {
        const tipoServicoExistente = await prisma.tipoDeServico.findUnique({
          where: {
            id: tipoServicoId,
          },
        });
    
        if (!tipoServicoExistente) {
          console.log("Tipo de serviço não encontrado.");
          return res.status(404).send({ error: 'Tipo de serviço não encontrado.' });
        }
    
        console.log("Tipo de serviço existente:", tipoServicoExistente);
    
        const postagens = await prisma.postagem.findMany({
          where: {
            tipoServicoId,
          },
          include: {
            faxineiro: true,
          },
        });
    
        console.log("Postagens:", postagens);
    
        res.send(postagens);
      } catch (error) {
        console.error("Erro:", error);
        res.status(500).send({ error: 'Erro ao obter postagens por tipo de serviço.' });
      }
    };
    