import { FastifyInstance } from 'fastify';
import { criarFaxineiro, loginFaxineiro } from '../controllers/faxineiro-controller/faxineiroController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/faxineiros', {}, criarFaxineiro);
  fastify.post('/faxineirosLogin', {}, loginFaxineiro);
  
  done();
}