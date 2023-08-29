import { FastifyInstance } from 'fastify';
import { criarContrato } from '../controllers/contrato-controller/contratoController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/createContract', {}, criarContrato);
  
  done();
}