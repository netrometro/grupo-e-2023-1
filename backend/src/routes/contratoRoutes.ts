import { FastifyInstance } from 'fastify';
import { solicitarContrato, aceitarContrato } from '../controllers/contrato-controller/contratoController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/soliciteContract', {}, solicitarContrato);
  fastify.post('/acceptContract/:contratoId', {}, aceitarContrato);

  
  done();
}