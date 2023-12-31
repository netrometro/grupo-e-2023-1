import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Contrato } from '../../types';

const prisma = new PrismaClient();

export const solicitarContrato = async (req: FastifyRequest, res: FastifyReply) => {
  const body = req.body as Contrato;
  const { contratanteId, responsavelId, postagemId, status } = body;

  try {
    const contratante = await prisma.faxineiro.findUnique({
      where: { id: contratanteId },
    });

    if (!contratante) {
      res.status(400).send({ error: 'Contratante não encontrado' });
      return;
    }

    const responsavel = await prisma.faxineiro.findUnique({
      where: { id: responsavelId },
    });

    if (!responsavel) {
      res.status(400).send({ error: 'Responsável não encontrado' });
      return;
    }

    const postagem = await prisma.postagem.findUnique({
      where: { id: postagemId },
      include: {
        faxineiro: true,
        SolicitacaoContrato: true, 
      },
    });

    if (!postagem) {
      res.status(400).send({ error: 'Postagem não encontrada' });
      return;
    }

    if (postagem.faxineiroId === responsavelId) {
      res.status(400).send({ error: 'O proprietário não pode ser o responsável' });
      return;
    }

    // Verificar se o contratante já tem uma solicitação existente
    const solicitacaoExistente = await prisma.solicitacaoContrato.findFirst({
      where: {
        contratanteId: contratanteId,
        postagemId: postagemId,
      },
    });

    if (solicitacaoExistente) {
      res.status(400).send({ error: 'Você já enviou uma solicitação de contrato para esta postagem' });
      return;
    }

    const solicitacao = await prisma.solicitacaoContrato.create({
      data: {
        contratante: {
          connect: {
            id: contratanteId,
          },
        },
        responsavel: {
          connect: {
            id: responsavelId,
          },
        },
        postagem: {
          connect: {
            id: postagemId,
          },
        },
        status: 'pendente',
      },
    });

    res.send(solicitacao);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao solicitar contrato' });
  }
};


export const aceitarContrato = async (req: FastifyRequest, res: FastifyReply) => {
  const contratoId = parseInt((req as any).params['contratoId'], 10);

  try {
    const solicitacao = await prisma.solicitacaoContrato.findUnique({
      where: { id: contratoId },
    });

    if (!solicitacao) {
      res.status(404).send({ error: 'Solicitação de contrato não encontrada' });
      return;
    }

    if (solicitacao.status === 'aceito') {
      res.status(400).send({ error: 'Esta solicitação já foi aceita anteriormente' });
      return;
    }

    const updatedSolicitacao = await prisma.solicitacaoContrato.update({
      where: { id: contratoId },
      data: { status: 'aceito' },
    });

    const novoContrato = await prisma.contrato.create({
      data: {
        contratante: { connect: { id: solicitacao.contratanteId } },
        responsavel: { connect: { id: solicitacao.responsavelId } },
        postagem: { connect: { id: solicitacao.postagemId } },
        status: 'aceito',
      },
    });

    await prisma.solicitacaoContrato.delete({
      where: { id: contratoId },
    });

    res.send(novoContrato);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao aceitar contrato' });
  }
};

export const cancelarContrato = async (req: FastifyRequest, res: FastifyReply) => {
  const contratoId = parseInt((req as any).params['contratoId'], 10);

  try {
    console.log(`Excluindo contrato de ID: ${contratoId}`);

    await prisma.contrato.delete({
      where: { id: contratoId },
    });

    res.send({ message: 'Contrato cancelado e excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao cancelar contrato' });
  }
};

export const cancelarSolicitacaoDoContrato = async (req: FastifyRequest, res: FastifyReply) => {
  const solicitacaoId = parseInt((req as any).params['solicitacaoId'], 10);

  try {
    console.log(`Excluindo solicitação de contrato de ID: ${solicitacaoId}`);

    await prisma.solicitacaoContrato.delete({
      where: { id: solicitacaoId },
    });

    res.send({ message: 'Solicitação de contrato cancelada e excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro ao cancelar solicitação de contrato' });
  }
};
