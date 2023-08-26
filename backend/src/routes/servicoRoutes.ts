import { FastifyInstance } from 'fastify';
import { criarServico } from '../controllers/servico-controller/servicoController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/addService', {}, criarServico);

  done();
}