import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Postagem } from '../../types';

const prisma = new PrismaClient();

export const criarPostagem = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as Postagem;
  const { titulo, descricao, preco, horarios, faxineiroId, tipoServicoId } = body;
  console.log(body)

  if (!tipoServicoId) {
    res.status(400).send({ error: 'ID do tipo de serviço não fornecido' });
    return;
  }

  try {
    const faxineiro = await prisma.faxineiro.findUnique({
      where: { id: faxineiroId },
    });

    if (!faxineiro) {
      res.status(400).send({ error: 'Faxineiro não encontrado' });
      return;
    }

    const tipoServico = await prisma.tipoDeServico.findUnique({
      where: { id: tipoServicoId },
    });

    if (!tipoServico) {
      res.status(400).send({ error: 'Tipo de serviço não encontrado' });
      return;
    }

    const postagem = await prisma.postagem.create({
      data: {
        titulo,
        descricao,
        preco,
        horarios,
        faxineiro: {
          connect: {
            id: faxineiroId,
          },
        },
        tipoServicoRelacionamento: {
          connect: {
            id: tipoServicoId,
          },
        },
      },
    });

    res.send(postagem);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao criar postagem' });
  }
};



export const editarPostagem = async (req: FastifyRequest, res: FastifyReply) => {
  const postagemId = parseInt((req as any).params['postagemId'], 10);
  const body = req.body as Postagem;
  const { titulo, descricao, preco, horarios, tipoServicoId } = body;

  try {
    const existingPostagem = await prisma.postagem.findUnique({
      where: { id: postagemId },
    });

    if (!existingPostagem) {
      res.status(404).send({ error: 'Postagem não encontrada' });
      return;
    }

    const tipoServico = await prisma.tipoDeServico.findUnique({
      where: { id: tipoServicoId },
    });

    if (!tipoServico) {
      res.status(400).send({ error: 'Tipo de serviço não encontrado' });
      return;
    }

    const postagem = await prisma.postagem.update({
      where: { id: postagemId },
      data: {
        titulo,
        descricao,
        preco,
        horarios,
        tipoServicoRelacionamento: {
          connect: {
            id: tipoServicoId,
          },
        },
      },
    });

    res.send(postagem);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao atualizar postagem' });
  }
};

export const deletarPostagem = async (req: FastifyRequest, res: FastifyReply) => {
  const postagemId = parseInt((req as any).params['postagemId'], 10);

  try {
    const existingPostagem = await prisma.postagem.findUnique({
      where: { id: postagemId },
    });

    if (!existingPostagem) {
      res.status(404).send({ error: 'Postagem não encontrada' });
      return;
    }

    const postagem = await prisma.postagem.delete({
      where: { id: postagemId },
    });


    res.send({ message: 'Postagem deletada com sucesso' });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao deletar postagem' });
  }
};

export const listarPostagensDoFaxineiro = async (req: FastifyRequest, res: FastifyReply) => {
  const faxineiroId = parseInt((req as any).params['faxineiroId'], 10);
  console.log('Faxineiro ID:', faxineiroId); 


  try {
    const postagens = await prisma.postagem.findMany({
      where: {
        faxineiroId: {
          equals: faxineiroId
        }
      }
    });

    res.send(postagens);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao listar postagens do faxineiro' });
  }
};

export const listarTodasAsPostagens = async (_req: FastifyRequest, res: FastifyReply) => {
  try {
    const todasAsPostagens = await prisma.postagem.findMany();

    res.send(todasAsPostagens);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao listar todas as postagens' });
  }
};

export const obterDetalhesPostagem = async (req: FastifyRequest, res: FastifyReply) => {
  const postagemId = parseInt((req as any).params['postagemId'], 10);

  try {
    const postagem = await prisma.postagem.findUnique({
      where: { id: postagemId },
    });

    if (!postagem) {
      res.status(404).send({ error: 'Postagem não encontrada' });
      return;
    }

    res.send(postagem);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao obter detalhes da postagem' });
  }
};

export const listarPostagensSemContrato = async (_req: FastifyRequest, res: FastifyReply) => {
  try {
    const postagensSemContrato = await prisma.postagem.findMany({
      where: {
        contratos: {
          none: {},
        },
      },
    });

    res.send(postagensSemContrato);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao listar postagens sem contrato' });
  }
};

export const listarPostagensComContrato = async (_req: FastifyRequest, res: FastifyReply) => {
  try {
    const postagensComContrato = await prisma.postagem.findMany({
      where: {
        contratos: {
          some: {},
        },
      },
    });

    res.send(postagensComContrato);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao listar postagens com contrato' });
  }
};