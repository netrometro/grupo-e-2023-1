import { FastifyInstance } from 'fastify';
import { solicitarContrato, aceitarContrato,cancelarContrato, cancelarSolicitacaoDoContrato } from '../controllers/contrato-controller/contratoController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/soliciteContract', {}, solicitarContrato);
  fastify.post('/acceptContract/:contratoId', {}, aceitarContrato);
  fastify.delete('/deleteContract/:contratoId', {}, cancelarContrato);
  fastify.delete('/deleteSolicitContract/:solicitacaoId', {}, cancelarSolicitacaoDoContrato);



  done();
}