import { FastifyInstance } from 'fastify';
import { solicitarContrato } from '../controllers/contrato-controller/contratoController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/soliciteContract', {}, solicitarContrato);
  
  done();
}