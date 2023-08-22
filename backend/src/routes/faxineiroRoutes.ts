import { FastifyInstance } from 'fastify';
import { criarFaxineiro } from '../controllers/faxineiro-controller/faxineiroController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/faxineiros', {}, criarFaxineiro);
  
  done();
}