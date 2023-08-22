import { FastifyInstance } from 'fastify';
import { criarLoja, listarLojas } from '../controllers/loja-controller/lojaController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/criar-loja', criarLoja);
  fastify.get('/listar-lojas', {}, listarLojas);

  done();
}
