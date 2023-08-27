import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { FilterMaxMin } from '../../types';

const prisma = new PrismaClient();

export const listarPostagensPorPreco = async (req: FastifyRequest, res: FastifyReply) => {
    try {

        const { maxPrice, minPrice } = req.query as FilterMaxMin;

        if (!maxPrice && !minPrice) {
            const todasAsPostagens = await prisma.postagem.findMany({
                include: {
                    faxineiro: true,
                    tipoServicoRelacionamento: true
                }
            });
            res.send(todasAsPostagens);
        } else if (!minPrice && maxPrice) {
            const postagensFiltradas = await prisma.postagem.findMany({
                where: {
                    preco: {
                        lte: parseFloat(maxPrice.toString()) 
                    }
                },
                include: {
                    faxineiro: true,
                    tipoServicoRelacionamento: true
                }
            });
            res.send(postagensFiltradas);
        } else if (minPrice && !maxPrice) {
            const postagensFiltradas = await prisma.postagem.findMany({
                where: {
                    preco: {
                        gte: parseFloat(minPrice.toString())
                    }
                },
                include: {
                    faxineiro: true,
                    tipoServicoRelacionamento: true
                }
            });
            res.send(postagensFiltradas);
        } else if (minPrice && maxPrice) {
            const postagensFiltradas = await prisma.postagem.findMany({
                where: {
                    preco: {
                        gte: parseFloat(minPrice.toString()), 
                        lte: parseFloat(maxPrice.toString()) 
                    }
                },
                include: {
                    faxineiro: true,
                    tipoServicoRelacionamento: true
                }
            });
            res.send(postagensFiltradas);
        }

    } catch (error) {
        res.status(500).send({ error: 'Erro ao listar postagens por preço' });
    }
};
