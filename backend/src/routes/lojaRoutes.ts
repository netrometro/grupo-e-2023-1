import { FastifyInstance } from 'fastify';
import { criarLoja } from '../controllers/lojaController';
import { criarLojaSchema } from '../controllers/validations/zodSchemas';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/criar-loja', { schema: criarLojaSchema }, criarLoja);
  done();
}