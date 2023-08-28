import { FastifyInstance } from 'fastify';
import { criarServico,obterTiposDeServico,obterPostagensPorTipoServico } from '../controllers/servico-controller/servicoController';

export default function (fastify: FastifyInstance, opts: any, done: () => void) {
  fastify.post('/addService', {}, criarServico);
  fastify.get('/allService', {}, obterTiposDeServico);
  fastify.get('/typeService/:tipoServicoId', obterPostagensPorTipoServico);



  done();
}